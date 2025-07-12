import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

          <div className="bg-black border border-teal-500/20 rounded-lg p-8 transition-colors duration-300 hover:border-teal-500">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">Last updated: May 1, 2025</p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 mb-4">
                By accessing or using InkCircle's website and services, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Description of Service</h2>
              <p className="text-gray-300 mb-4">
                InkCircle provides a platform that connects tattoo artists, studios, and clients. Our services include
                appointment scheduling, portfolio management, client management, and other related features.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Accounts</h2>
              <p className="text-gray-300 mb-4">
                To use certain features of our services, you must create an account. You are responsible for maintaining
                the confidentiality of your account information and for all activities that occur under your account.
              </p>
              <p className="text-gray-300 mb-4">
                You agree to provide accurate, current, and complete information during the registration process and to
                update such information to keep it accurate, current, and complete.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. User Conduct</h2>
              <p className="text-gray-300 mb-4">
                You agree not to use our services for any unlawful purpose or in any way that could damage, disable,
                overburden, or impair our services. This includes but is not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li className="mb-2">
                  Posting content that is illegal, harmful, threatening, abusive, or otherwise objectionable
                </li>
                <li className="mb-2">Impersonating any person or entity</li>
                <li className="mb-2">Interfering with the proper functioning of our services</li>
                <li className="mb-2">Attempting to gain unauthorized access to our systems or user accounts</li>
                <li className="mb-2">Using our services for any commercial purpose not expressly approved by us</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Content</h2>
              <p className="text-gray-300 mb-4">
                You retain all rights to the content you post on our platform. By posting content, you grant us a
                non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display the content in
                connection with our services.
              </p>
              <p className="text-gray-300 mb-4">
                You are solely responsible for the content you post and the consequences of posting it. We reserve the
                right to remove any content that violates these terms or that we find objectionable.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Payments and Subscriptions</h2>
              <p className="text-gray-300 mb-4">
                Some of our services require payment. By subscribing to a paid plan, you agree to pay all fees in
                accordance with the pricing and terms in effect at the time of your subscription.
              </p>
              <p className="text-gray-300 mb-4">
                Subscriptions automatically renew unless cancelled before the renewal date. You can cancel your
                subscription at any time through your account settings.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-300 mb-4">
                To the maximum extent permitted by law, InkCircle shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your use of or inability to use our services.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-gray-300 mb-4">
                Our services are provided "as is" and "as available" without any warranties of any kind, either express
                or implied, including but not limited to warranties of merchantability, fitness for a particular
                purpose, or non-infringement.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-300 mb-4">
                We reserve the right to modify these Terms of Service at any time. We will notify you of any changes by
                posting the new terms on our website and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Governing Law</h2>
              <p className="text-gray-300 mb-4">
                These Terms of Service shall be governed by the laws of Germany, without regard to its conflict of law
                provisions.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">11. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-300 mb-4">
                Email: legal@inkcircle.com
                <br />
                Address: Kreuzbergstraße 123, 10965 Berlin, Germany
                <br />
                Phone: +49 30 1234567
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
