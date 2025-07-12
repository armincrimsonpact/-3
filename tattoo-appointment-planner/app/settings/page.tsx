"use client"

import { useState } from "react"
import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { User, Lock, Bell, CreditCard, HelpCircle, LogOut } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-white mb-12">Settings</h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-black border border-teal-500/20 rounded-lg p-4 transition-colors duration-300 hover:border-teal-500">
                <nav className="space-y-1">
                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-md ${
                      activeTab === "profile"
                        ? "bg-teal-500/10 text-teal-500 border-l-2 border-teal-500"
                        : "text-gray-400 hover:bg-black/50 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span>Profile</span>
                  </button>

                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-md ${
                      activeTab === "security"
                        ? "bg-teal-500/10 text-teal-500 border-l-2 border-teal-500"
                        : "text-gray-400 hover:bg-black/50 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("security")}
                  >
                    <Lock className="h-5 w-5 mr-3" />
                    <span>Security</span>
                  </button>

                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-md ${
                      activeTab === "notifications"
                        ? "bg-teal-500/10 text-teal-500 border-l-2 border-teal-500"
                        : "text-gray-400 hover:bg-black/50 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="h-5 w-5 mr-3" />
                    <span>Notifications</span>
                  </button>

                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-md ${
                      activeTab === "billing"
                        ? "bg-teal-500/10 text-teal-500 border-l-2 border-teal-500"
                        : "text-gray-400 hover:bg-black/50 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("billing")}
                  >
                    <CreditCard className="h-5 w-5 mr-3" />
                    <span>Billing</span>
                  </button>

                  <button
                    className={`flex items-center w-full px-4 py-3 rounded-md ${
                      activeTab === "help"
                        ? "bg-teal-500/10 text-teal-500 border-l-2 border-teal-500"
                        : "text-gray-400 hover:bg-black/50 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("help")}
                  >
                    <HelpCircle className="h-5 w-5 mr-3" />
                    <span>Help & Support</span>
                  </button>

                  <hr className="border-gray-800 my-4" />

                  <button className="flex items-center w-full px-4 py-3 rounded-md text-red-500 hover:bg-red-500/10">
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Log Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="md:w-3/4">
              {activeTab === "profile" && (
                <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white mb-2">First Name</label>
                        <input
                          type="text"
                          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                          defaultValue="Alex"
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Last Name</label>
                        <input
                          type="text"
                          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                          defaultValue="Morgan"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                        defaultValue="alex@inkcircle.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2">Username</label>
                      <input
                        type="text"
                        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                        defaultValue="alexmorgan"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2">Bio</label>
                      <textarea
                        className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none h-32"
                        defaultValue="Specializing in realistic portraits and nature scenes with over 10 years of experience. Based in Berlin, available for appointments and collaborations."
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white mb-2">Location</label>
                        <input
                          type="text"
                          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                          defaultValue="Berlin, Germany"
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Website</label>
                        <input
                          type="url"
                          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                          defaultValue="www.alexmorgantattoo.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white mb-2">Instagram</label>
                        <input
                          type="text"
                          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                          defaultValue="@alexmorgantattoo"
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Phone</label>
                        <input
                          type="tel"
                          className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                          defaultValue="+49 123 456789"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
                  <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

                  <form className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white mb-2">Current Password</label>
                          <input
                            type="password"
                            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                            placeholder="Enter your current password"
                          />
                        </div>
                        <div>
                          <label className="block text-white mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                            placeholder="Enter your new password"
                          />
                        </div>
                        <div>
                          <label className="block text-white mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                            placeholder="Confirm your new password"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-800 my-6" />

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between bg-gray-800 p-4 rounded">
                        <div>
                          <p className="text-white font-medium">Protect your account with 2FA</p>
                          <p className="text-gray-400 text-sm">
                            Add an extra layer of security to your account by requiring a verification code.
                          </p>
                        </div>
                        <button className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                          Enable
                        </button>
                      </div>
                    </div>

                    <hr className="border-gray-800 my-6" />

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Login Sessions</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-white font-medium">Chrome on Windows</p>
                              <p className="text-gray-400 text-sm">Berlin, Germany • Active now</p>
                            </div>
                            <button className="text-red-500 hover:text-red-400">Logout</button>
                          </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-white font-medium">Safari on iPhone</p>
                              <p className="text-gray-400 text-sm">Berlin, Germany • 2 days ago</p>
                            </div>
                            <button className="text-red-500 hover:text-red-400">Logout</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>

                  <form className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">New Appointment Requests</p>
                            <p className="text-gray-400 text-sm">
                              Receive an email when a client requests an appointment
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Appointment Reminders</p>
                            <p className="text-gray-400 text-sm">Receive reminders about upcoming appointments</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">New Messages</p>
                            <p className="text-gray-400 text-sm">Receive an email when you get a new message</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Marketing Emails</p>
                            <p className="text-gray-400 text-sm">Receive updates about new features and promotions</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-800 my-6" />

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">New Appointment Requests</p>
                            <p className="text-gray-400 text-sm">
                              Receive a notification when a client requests an appointment
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Appointment Reminders</p>
                            <p className="text-gray-400 text-sm">Receive reminders about upcoming appointments</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">New Messages</p>
                            <p className="text-gray-400 text-sm">Receive a notification when you get a new message</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
                  <h2 className="text-2xl font-bold text-white mb-6">Billing Settings</h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Current Plan</h3>
                      <div className="bg-gray-800 p-6 rounded">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-white font-bold text-lg">Artist Pro</p>
                            <p className="text-teal-500">€49/month</p>
                          </div>
                          <span className="bg-teal-500 text-black px-3 py-1 rounded text-sm font-bold">Active</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                          Your plan renews on June 15, 2025. You can cancel or change your plan at any time.
                        </p>
                        <div className="flex space-x-4">
                          <button className="bg-teal-500 text-black px-4 py-2 rounded hover:bg-teal-600 transition-colors">
                            Change Plan
                          </button>
                          <button className="border border-gray-700 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                            Cancel Subscription
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
                      <div className="bg-gray-800 p-6 rounded">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <div className="bg-gray-700 p-2 rounded mr-4">
                              <CreditCard className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">Visa ending in 4242</p>
                              <p className="text-gray-400 text-sm">Expires 12/25</p>
                            </div>
                          </div>
                          <button className="text-teal-500 hover:text-teal-400">Edit</button>
                        </div>
                        <button className="text-teal-500 hover:text-teal-400">+ Add new payment method</button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Billing History</h3>
                      <div className="bg-gray-800 rounded overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-900">
                              <th className="text-left p-4 text-white">Date</th>
                              <th className="text-left p-4 text-white">Description</th>
                              <th className="text-left p-4 text-white">Amount</th>
                              <th className="text-left p-4 text-white">Status</th>
                              <th className="text-left p-4 text-white">Invoice</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-gray-700">
                              <td className="p-4 text-white">May 15, 2025</td>
                              <td className="p-4 text-white">Artist Pro Plan</td>
                              <td className="p-4 text-white">€49.00</td>
                              <td className="p-4">
                                <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs">Paid</span>
                              </td>
                              <td className="p-4">
                                <button className="text-teal-500 hover:text-teal-400">Download</button>
                              </td>
                            </tr>
                            <tr className="border-t border-gray-700">
                              <td className="p-4 text-white">Apr 15, 2025</td>
                              <td className="p-4 text-white">Artist Pro Plan</td>
                              <td className="p-4 text-white">€49.00</td>
                              <td className="p-4">
                                <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs">Paid</span>
                              </td>
                              <td className="p-4">
                                <button className="text-teal-500 hover:text-teal-400">Download</button>
                              </td>
                            </tr>
                            <tr className="border-t border-gray-700">
                              <td className="p-4 text-white">Mar 15, 2025</td>
                              <td className="p-4 text-white">Artist Pro Plan</td>
                              <td className="p-4 text-white">€49.00</td>
                              <td className="p-4">
                                <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs">Paid</span>
                              </td>
                              <td className="p-4">
                                <button className="text-teal-500 hover:text-teal-400">Download</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "help" && (
                <div className="bg-black border border-teal-500/20 rounded-lg p-6 transition-colors duration-300 hover:border-teal-500">
                  <h2 className="text-2xl font-bold text-white mb-6">Help & Support</h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded">
                          <h4 className="text-white font-medium mb-2">How do I change my subscription plan?</h4>
                          <p className="text-gray-400">
                            You can change your subscription plan by going to Settings &gt; Billing &gt; Current Plan
                            and clicking on "Change Plan".
                          </p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded">
                          <h4 className="text-white font-medium mb-2">How do I update my portfolio?</h4>
                          <p className="text-gray-400">
                            You can update your portfolio by going to your profile page and clicking on the "Edit
                            Portfolio" button.
                          </p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded">
                          <h4 className="text-white font-medium mb-2">How do I manage my appointments?</h4>
                          <p className="text-gray-400">
                            You can manage your appointments by going to the "Appointments" tab in your dashboard.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Contact Support</h3>
                      <div className="bg-gray-800 p-6 rounded">
                        <p className="text-gray-400 mb-4">
                          Need help with something not covered in the FAQs? Our support team is here to help.
                        </p>
                        <form className="space-y-4">
                          <div>
                            <label className="block text-white mb-2">Subject</label>
                            <select className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded focus:border-teal-500 focus:outline-none">
                              <option value="">Select a subject</option>
                              <option value="account">Account Issues</option>
                              <option value="billing">Billing Questions</option>
                              <option value="technical">Technical Support</option>
                              <option value="feature">Feature Request</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-white mb-2">Message</label>
                            <textarea
                              className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded focus:border-teal-500 focus:outline-none h-32"
                              placeholder="Describe your issue or question"
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            className="bg-teal-500 text-black px-6 py-3 rounded hover:bg-teal-600 transition-colors"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
