import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

          <div className="bg-black border border-teal-500/20 rounded-lg p-8 transition-colors duration-300 hover:border-teal-500">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">Last updated: May 1, 2025</p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
              <p className="text-gray-300 mb-4">
                InkCircle ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="text-gray-300 mb-4">
                We take the protection of your personal data seriously and handle it in accordance with the General Data
                Protection Regulation (GDPR) and other applicable data protection laws.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Information We Collect</h2>
              <p className="text-gray-300 mb-4">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li className="mb-2">
                  <strong className="text-white">Personal Information:</strong> Name, email address, phone number,
                  billing information, and other information you provide when creating an account or using our services.
                </li>
                <li className="mb-2">
                  <strong className="text-white">Profile Information:</strong> Photos, portfolio images, professional
                  information, and other content you upload to your profile.
                </li>
                <li className="mb-2">
                  <strong className="text-white">Usage Information:</strong> Information about how you use our website
                  and services, including log data, device information, and analytics data.
                </li>
                <li className="mb-2">
                  <strong className="text-white">Communications:</strong> Messages, emails, and other communications
                  between you and other users or our team.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li className="mb-2">To provide and maintain our services</li>
                <li className="mb-2">To process transactions and manage your account</li>
                <li className="mb-2">To connect tattoo artists with clients</li>
                <li className="mb-2">To improve our website and services</li>
                <li className="mb-2">To communicate with you about updates, promotions, and support</li>
                <li className="mb-2">To ensure the security of our platform</li>
                <li className="mb-2">To comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Data Storage and Security</h2>
              <p className="text-gray-300 mb-4">
                All personal data is stored on secure servers located in the European Union. We implement appropriate
                technical and organizational measures to protect your data against unauthorized access, alteration,
                disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Your Rights</h2>
              <p className="text-gray-300 mb-4">
                Under the GDPR and other applicable laws, you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li className="mb-2">Right to access your personal data</li>
                <li className="mb-2">Right to rectification of inaccurate data</li>
                <li className="mb-2">Right to erasure ("right to be forgotten")</li>
                <li className="mb-2">Right to restriction of processing</li>
                <li className="mb-2">Right to data portability</li>
                <li className="mb-2">Right to object to processing</li>
                <li className="mb-2">Right to withdraw consent</li>
              </ul>
              <p className="text-gray-300 mb-4">
                To exercise these rights, please contact us at privacy@inkcircle.com.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Third-Party Services</h2>
              <p className="text-gray-300 mb-4">
                We may use third-party services to help us operate our website, process payments, or analyze how our
                website is used. These third parties have access to your personal information only to perform these
                tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Changes to This Privacy Policy</h2>
              <p className="text-gray-300 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-300 mb-4">
                Email: privacy@inkcircle.com
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
