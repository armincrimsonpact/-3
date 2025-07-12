import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="bg-teal-500 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/home" className="text-2xl font-bold text-black hover:text-black/80 transition-colors">
            InkCircle
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#111] rounded-lg p-8">
          <Link href="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>

          <h1 className="text-3xl font-bold text-white text-center mb-6">Reset Your Password</h1>
          <p className="text-gray-400 text-center mb-10">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                className="w-full bg-[#0c0c0c] border border-gray-800 text-white p-3 rounded focus:border-teal-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-black py-3 rounded hover:bg-teal-600 transition-colors"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Remember your password?{" "}
              <Link href="/login" className="text-teal-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} InkCircle. All rights reserved.</p>
      </footer>
    </div>
  )
}
