import Link from "next/link"

export function BookingFooter() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-teal-500 mb-4">InkCircle</h3>
          <p className="text-gray-400 mb-4">
            Premium tattoo artistry in Berlin specializing in dark, realistic designs.
          </p>
          <p className="text-gray-400 text-sm">© 2025 InkCircle. All rights reserved.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/portfolio" className="text-gray-400 hover:text-white">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/community" className="text-gray-400 hover:text-white">
                Community
              </Link>
            </li>
            <li>
              <Link href="/booking" className="text-gray-400 hover:text-white">
                Book a Session
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-gray-400 hover:text-white">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <address className="not-italic">
            <p className="text-gray-400">Kreuzbergstraße 123</p>
            <p className="text-gray-400">10965 Berlin, Germany</p>
            <p className="text-gray-400 mt-2">contact@inkcircle.com</p>
            <p className="text-gray-400">+49 30 1234567</p>
          </address>
        </div>
      </div>
    </footer>
  )
}
