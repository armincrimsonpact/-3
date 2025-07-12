"use client"

import { useState } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { Search, Send, MoreVertical, Phone, Video, Info } from "lucide-react"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(0)

  const contacts = [
    {
      id: 0,
      name: "Alex Morgan",
      role: "Tattoo Artist",
      avatar: "/placeholder.svg?key=3otfq",
      lastMessage: "Let me know if you have any questions about the design!",
      time: "10:30 AM",
      unread: 2,
      online: true,
    },
    {
      id: 1,
      name: "Emma Roberts",
      role: "Client",
      avatar: "/placeholder.svg?key=klxu1",
      lastMessage: "I'm looking forward to our appointment next week.",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 2,
      name: "Black Lotus Studio",
      role: "Studio",
      avatar: "/placeholder.svg?key=vvcjc",
      lastMessage: "We've updated our studio policies. Please review them.",
      time: "2 days ago",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "David Kim",
      role: "Tattoo Artist",
      avatar: "/placeholder.svg?key=eqk3p",
      lastMessage: "Thanks for the referral!",
      time: "3 days ago",
      unread: 0,
      online: false,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Alex Morgan",
      content: "Hi there! I've been working on your tattoo design.",
      time: "10:15 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "You",
      content: "That's great! I'm excited to see it.",
      time: "10:18 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Alex Morgan",
      content: "I've attached the preliminary sketch. Let me know what you think!",
      time: "10:20 AM",
      isMe: false,
      attachment: {
        type: "image",
        url: "/placeholder.svg?key=w7lk4",
      },
    },
    {
      id: 4,
      sender: "You",
      content: "Wow, this looks amazing! I love the details in the shading.",
      time: "10:25 AM",
      isMe: true,
    },
    {
      id: 5,
      sender: "Alex Morgan",
      content: "Thanks! I can make adjustments if needed. Let me know if you have any questions about the design!",
      time: "10:30 AM",
      isMe: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <MainNav />

      <div className="flex-1 flex">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r border-gray-800 overflow-y-auto">
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-gray-800 border border-gray-700 text-white p-2 pl-10 rounded"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          <div className="divide-y divide-gray-800">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 cursor-pointer hover:bg-gray-900 ${activeChat === contact.id ? "bg-gray-900" : ""}`}
                onClick={() => setActiveChat(contact.id)}
              >
                <div className="flex items-start">
                  <div className="relative mr-3">
                    <img
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-white font-medium truncate">{contact.name}</h3>
                      <span className="text-xs text-gray-400">{contact.time}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{contact.role}</p>
                    <p className="text-gray-400 text-sm truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="ml-2 bg-teal-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {contact.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={contacts[activeChat].avatar || "/placeholder.svg"}
                alt={contacts[activeChat].name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="text-white font-medium">{contacts[activeChat].name}</h3>
                <p className="text-gray-400 text-sm flex items-center">
                  {contacts[activeChat].online ? (
                    <>
                      <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                      Online
                    </>
                  ) : (
                    "Offline"
                  )}
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white">
                <Phone className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Video className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Info className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isMe ? "bg-teal-500 text-black rounded-br-none" : "bg-gray-800 text-white rounded-bl-none"
                    }`}
                  >
                    {!message.isMe && <p className="text-xs font-medium mb-1">{message.sender}</p>}
                    <p>{message.content}</p>
                    {message.attachment && (
                      <div className="mt-2">
                        <img
                          src={message.attachment.url || "/placeholder.svg"}
                          alt="Attachment"
                          className="rounded max-w-full"
                        />
                      </div>
                    )}
                    <p className={`text-xs mt-1 ${message.isMe ? "text-black/70" : "text-gray-400"}`}>{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 border border-gray-700 text-white p-3 rounded-l"
              />
              <button className="bg-teal-500 text-black p-3 rounded-r">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
