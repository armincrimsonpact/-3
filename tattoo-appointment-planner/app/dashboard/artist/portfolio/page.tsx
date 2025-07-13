"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Eye, Heart, MessageSquare, Upload } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"

export default function ArtistPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showUploadModal, setShowUploadModal] = useState(false)

  const categories = ["All", "Traditional", "Realism", "Watercolor", "Japanese", "Geometric"]

  const portfolioItems = [
    {
      id: 1,
      title: "Dragon Back Piece",
      category: "Traditional",
      image: "/placeholder.svg?height=300&width=300",
      likes: 124,
      comments: 18,
      views: 1250,
      date: "2024-03-10",
      description: "Full back dragon piece in traditional Japanese style",
      tags: ["dragon", "traditional", "back piece"],
    },
    {
      id: 2,
      title: "Portrait Realism",
      category: "Realism",
      image: "/placeholder.svg?height=300&width=300",
      likes: 89,
      comments: 12,
      views: 890,
      date: "2024-03-05",
      description: "Realistic portrait tattoo on forearm",
      tags: ["portrait", "realism", "forearm"],
    },
    {
      id: 3,
      title: "Watercolor Phoenix",
      category: "Watercolor",
      image: "/placeholder.svg?height=300&width=300",
      likes: 156,
      comments: 24,
      views: 1680,
      date: "2024-02-28",
      description: "Vibrant watercolor phoenix on shoulder",
      tags: ["phoenix", "watercolor", "shoulder"],
    },
    {
      id: 4,
      title: "Geometric Mandala",
      category: "Geometric",
      image: "/placeholder.svg?height=300&width=300",
      likes: 78,
      comments: 9,
      views: 720,
      date: "2024-02-20",
      description: "Intricate geometric mandala design",
      tags: ["mandala", "geometric", "sacred"],
    },
  ]

  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects removed for pure black background */}

      <div className="relative z-10 p-8">
        <ScrollReveal>
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-2">
              My Portfolio
            </h1>
            <p className="text-gray-400">Showcase your artistic work and attract new clients</p>
          </div>
        </ScrollReveal>

        {/* Header Actions */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.toLowerCase()
                      ? "bg-teal-500 text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              <Plus size={20} />
              Add New Work
            </button>
          </div>
        </ScrollReveal>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={0.1 * (index + 2)}>
              <Card className="bg-gray-900/30 border border-teal-500/20 hover:bg-gray-900/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,176,0.1)] group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                          <Eye className="text-white" size={20} />
                        </button>
                        <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                          <Edit className="text-white" size={20} />
                        </button>
                        <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                          <Trash2 className="text-white" size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-teal-500/80 text-white text-xs rounded-full">{item.category}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Heart size={14} />
                          {item.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={14} />
                          {item.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {item.views}
                        </span>
                      </div>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-teal-500/20 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">Add New Work</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                    placeholder="Enter artwork title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50">
                    <option>Traditional</option>
                    <option>Realism</option>
                    <option>Watercolor</option>
                    <option>Japanese</option>
                    <option>Geometric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full p-3 bg-gray-800/50 border border-teal-500/20 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                    placeholder="Describe your artwork"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-teal-500/20 rounded-lg p-6 text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
