"use client"

import { useState, useEffect } from "react"
import { Send, ArrowLeft, Search, MoreVertical, Phone, Video, Circle } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Message = {
  id: string
  appointmentId: string
  senderId: string
  content: string
  isRead: boolean
  createdAt: string
}

type Conversation = {
  id: string
  appointmentId: string
  artist: {
    id: string
    user: {
      name: string | null
      image: string | null
    }
    studio?: {
      name: string
    }
  }
  lastMessage?: string
  lastMessageTime?: string
  unreadCount: number
  isOnline: boolean
}

export default function ClientMessages() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    loadConversations()
    getCurrentUser()
  }, [])

  const getCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data: userProfile } = await supabase
        .from('UserProfile')
        .select('id')
        .eq('authId', user.id)
        .single()

      if (userProfile) {
        setCurrentUserId(userProfile.id)
      }
    } catch (error) {
      console.error('Error getting current user:', error)
    }
  }

  const loadConversations = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('Please log in to view messages')
        return
      }

      const { data: userProfile } = await supabase
        .from('UserProfile')
        .select('id')
        .eq('authId', user.id)
        .single()

      if (!userProfile) return

      const { data: clientData } = await supabase
        .from('Client')
        .select('id')
        .eq('userId', userProfile.id)
        .single()

      if (!clientData) return

      // Get appointments with messages
      const { data: appointments, error } = await supabase
        .from('Appointment')
        .select(`
          id,
          artist:Artist!Appointment_artistId_fkey (
            id,
            user:UserProfile!Artist_userId_fkey (
              id,
              name,
              image
            ),
            studio:Studio!Artist_studioId_fkey (
              name
            )
          ),
          messages:Message!Message_appointmentId_fkey (
            id,
            senderId,
            content,
            isRead,
            createdAt
          )
        `)
        .eq('clientId', clientData.id)
        .order('updatedAt', { ascending: false })

      if (error) {
        console.error('Error loading conversations:', error)
        return
      }

      // Process conversations
      const processedConversations: Conversation[] = (appointments || [])
        .filter(appointment => appointment.messages && appointment.messages.length > 0)
        .map(appointment => {
          const sortedMessages = appointment.messages.sort((a: any, b: any) => 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          const lastMessage = sortedMessages[sortedMessages.length - 1]
          const unreadCount = appointment.messages.filter(
            (msg: any) => !msg.isRead && msg.senderId !== userProfile.id
          ).length

          // Handle the artist data structure
          const artistData = Array.isArray(appointment.artist) ? appointment.artist[0] : appointment.artist
          const userData = Array.isArray(artistData?.user) ? artistData.user[0] : artistData?.user
          const studioData = Array.isArray(artistData?.studio) ? artistData.studio[0] : artistData?.studio

          return {
            id: appointment.id,
            appointmentId: appointment.id,
            artist: {
              id: artistData?.id || '',
              user: {
                name: userData?.name || null,
                image: userData?.image || null
              },
              studio: studioData ? {
                name: studioData.name
              } : undefined
            },
            lastMessage: lastMessage?.content,
            lastMessageTime: lastMessage?.createdAt,
            unreadCount,
            isOnline: false
          }
        })

      setConversations(processedConversations)
    } catch (error) {
      console.error("Failed to load conversations:", error)
      alert('Failed to load conversations')
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (appointmentId: string) => {
    try {
      const { data, error } = await supabase
        .from('Message')
        .select('*')
        .eq('appointmentId', appointmentId)
        .order('createdAt', { ascending: true })

      if (error) {
        console.error('Error loading messages:', error)
        return
      }

      setMessages(data || [])
      setSelectedConversation(appointmentId)

      // Mark messages as read
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: userProfile } = await supabase
          .from('UserProfile')
          .select('id')
          .eq('authId', user.id)
          .single()

        if (userProfile) {
          await supabase
            .from('Message')
            .update({ isRead: true })
            .eq('appointmentId', appointmentId)
            .neq('senderId', userProfile.id)
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !currentUserId) return

    try {
      const { error } = await supabase
        .from('Message')
        .insert({
          appointmentId: selectedConversation,
          senderId: currentUserId,
          content: newMessage.trim(),
          isRead: false
        })

      if (error) throw error

      setNewMessage("")
      await loadMessages(selectedConversation)
      await loadConversations()
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredConversations = conversations.filter(conversation =>
    conversation.artist.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.artist.studio?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedConversationData = conversations.find(c => c.id === selectedConversation)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <p className="text-gray-400">Chat with your tattoo artists</p>
          </div>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-cardBg border-gray-800">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-200px)] flex bg-cardBg border border-gray-800 rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className={`${selectedConversation ? 'hidden md:block' : 'block'} w-full md:w-80 border-r border-gray-800 flex flex-col`}>
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              <p>No conversations found.</p>
              <p className="text-sm">Start by booking an appointment!</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => loadMessages(conversation.id)}
                className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900/50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-gray-900/50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                      {conversation.artist.user.image ? (
                        <img 
                          src={conversation.artist.user.image} 
                          alt={conversation.artist.user.name || 'Artist'} 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-lg font-bold text-white">
                          {conversation.artist.user.name?.charAt(0) || 'A'}
                        </span>
                      )}
                    </div>
                    {conversation.isOnline && (
                      <Circle className="absolute -bottom-1 -right-1 w-4 h-4 text-green-400 fill-green-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white truncate">
                        {conversation.artist.user.name}
                      </h3>
                      {conversation.lastMessageTime && (
                        <span className="text-xs text-gray-400">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {conversation.artist.studio?.name}
                    </p>
                    {conversation.lastMessage && (
                      <p className="text-sm text-gray-300 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    )}
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge className="bg-teal-500 text-white">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Messages View */}
      <div className={`${selectedConversation ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  {selectedConversationData?.artist.user.image ? (
                    <img 
                      src={selectedConversationData.artist.user.image} 
                      alt={selectedConversationData.artist.user.name || 'Artist'} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-lg font-bold text-white">
                      {selectedConversationData?.artist.user.name?.charAt(0) || 'A'}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    {selectedConversationData?.artist.user.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {selectedConversationData?.artist.studio?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === currentUserId
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 bg-gray-900 border-gray-700 text-white"
                />
                <Button onClick={sendMessage} className="bg-teal-500 hover:bg-teal-600">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
