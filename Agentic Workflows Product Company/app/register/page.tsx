import Link from "next/link"
import { ArrowLeft, User, Users, Building2 } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-ultra/5 blur-2xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-bg py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/home" className="text-2xl font-bold text-textPrimary hover:text-primary transition-colors">
            <span className="text-primary mr-1">●</span>
            InkCircle
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-cardBg rounded-lg p-8 border border-textTertiary/20">
          <Link href="/home" className="inline-flex items-center text-textTertiary hover:text-textSecondary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-textSecondary text-center mb-6">Create Your InkCircle Account</h1>
          <p className="text-textTertiary text-center mb-10">Choose your account type to continue</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Artist Registration Option */}
            <Link href="/register/artist" className="block">
              <div className="bg-cardBg border border-textTertiary/30 rounded-lg p-6 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-bg p-3 rounded-full border border-primary/30">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-textSecondary text-center mb-2">Artist</h3>
                <p className="text-textTertiary text-center text-sm">Create an artist profile and showcase your work</p>
              </div>
            </Link>

            {/* Client Registration Option */}
            <Link href="/register/client" className="block">
              <div className="bg-cardBg border border-textTertiary/30 rounded-lg p-6 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-bg p-3 rounded-full border border-primary/30">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-textSecondary text-center mb-2">Client</h3>
                <p className="text-textTertiary text-center text-sm">Book appointments and find your perfect artist</p>
              </div>
            </Link>

            {/* Studio Registration Option */}
            <Link href="/register/studio" className="block">
              <div className="bg-cardBg border border-textTertiary/30 rounded-lg p-6 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-bg p-3 rounded-full border border-primary/30">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-textSecondary text-center mb-2">Studio</h3>
                <p className="text-textTertiary text-center text-sm">Manage your studio and artist team</p>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-textTertiary">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-textTertiary">
        <p>© {new Date().getFullYear()} InkCircle. All rights reserved.</p>
      </footer>
    </div>
  )
}
