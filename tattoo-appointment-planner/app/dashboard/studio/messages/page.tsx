"use client"

import { useState } from "react"
import { Search, Send, Paperclip, MoreVertical, ImageIcon, Smile } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function StudioMessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      artist: "Sarah Johnson",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Thank you! The tattoo looks amazing. Can't wait for the next session!",
      timestamp: "5 min ago",
      unread: 1,
      online: true,
    },
    {
      id: 2,
      artist: "Mike Chen",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "What time works best for the touch-up appointment?",
      timestamp: "2 hours ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      artist: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "I love the watercolor design you showed me! When can we start?",
      timestamp: "1 day ago",
      unread: 2,
      online: true,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "client",
      content: "Hi! I just wanted to say thank you for the amazing dragon tattoo. The healing process is going great!",
      timestamp: "2:30 PM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      sender: "artist",
      content: "I'm so glad you're happy with it! The dragon came out beautifully. How's the aftercare routine going?",
      timestamp: "2:32 PM",
    },
    {
      id: 3,
      sender: "client",
      content: "Following your instructions perfectly! Using the ointment 3 times a day and keeping it clean.",
      timestamp: "2:35 PM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      sender: "artist",
      content:
        "Perfect! That's exactly what I like to hear. Are you ready to schedule the next session for the phoenix piece?",
      timestamp: "2:37 PM",
    },
    {
      id: 5,
      sender: "client",
      content: "Yes! I'm so excited. When do you have availability? I'm flexible with timing.",
      timestamp: "2:40 PM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      sender: "artist",
      content:
        "Great! I have openings next Friday at 2 PM or Saturday at 11 AM. Both would give us a good 4-hour window.",
      timestamp: "2:42 PM",
    },
    {
      id: 7,
      sender: "client",
      content:
        "Saturday at 11 AM works perfectly! Thank you so much. The tattoo looks amazing and I can't wait for the next one!",
      timestamp: "2:45 PM",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div>
      <DashboardHeader title="Studio Messages" description="Communicate with your artists and clients" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="bg-gray-900/30 border border-teal-500/20 rounded-xl overflow-hidden">
          <CardContent>
            <div className="p-4 border-b border-teal-500/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500/50 transition-colors"
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-800/50 ${
                    selectedChat === conversation.id ? "bg-teal-500/10 border-r-2 border-teal-500" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={conversation.avatar || "/placeholder.svg"}
                        alt={conversation.artist}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-white truncate">{conversation.artist}</h3>
                        <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-300 truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{conversation.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 bg-gray-900/30 border border-teal-500/20 rounded-xl flex flex-col">
          <CardContent>
            {/* Chat Header */}
            <div className="p-4 border-b border-teal-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/placeholder.svg" alt="Client" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-white">Client Name</h3>
                  <p className="text-sm text-gray-400">Online</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <MoreVertical className="text-gray-400" size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "artist" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[70%] ${message.sender === "artist" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === "artist" ? "bg-teal-500 text-white" : "bg-gray-800 text-gray-100"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === "artist" ? "text-teal-100" : "text-gray-400"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-teal-500/20">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <Paperclip className="text-gray-400" size={20} />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <ImageIcon className="text-gray-400" size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500/50 transition-colors"
                />
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <Smile className="text-gray-400" size={20} />
                </button>
                <button className="p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
