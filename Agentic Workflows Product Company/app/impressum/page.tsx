import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"

export default function ImpressumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-white mb-8">Impressum</h1>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-gray-300 mb-4">
              InkCircle GmbH
              <br />
              Kreuzbergstraße 123
              <br />
              10965 Berlin
            </p>

            <p className="text-gray-300 mb-4">
              Handelsregister: HRB 123456
              <br />
              Registergericht: Amtsgericht Berlin-Charlottenburg
            </p>

            <p className="text-gray-300 mb-4">
              Vertreten durch:
              <br />
              Sarah Müller, Geschäftsführerin
              <br />
              Markus Weber, Geschäftsführer
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Kontakt</h2>
            <p className="text-gray-300 mb-4">
              Telefon: +49 30 1234567
              <br />
              E-Mail: info@inkcircle.com
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Umsatzsteuer-ID</h2>
            <p className="text-gray-300 mb-4">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              DE123456789
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="text-gray-300 mb-4">
              Sarah Müller
              <br />
              Kreuzbergstraße 123
              <br />
              10965 Berlin
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Streitschlichtung</h2>
            <p className="text-gray-300 mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              <a href="https://ec.europa.eu/consumers/odr/" className="text-teal-500 hover:underline">
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <p className="text-gray-300 mb-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Haftung für Inhalte</h2>
            <p className="text-gray-300 mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
              eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <p className="text-gray-300 mb-4">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
              bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
              konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Haftung für Links</h2>
            <p className="text-gray-300 mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar.
            </p>

            <p className="text-gray-300 mb-4">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
              Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
              umgehend entfernen.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Urheberrecht</h2>
            <p className="text-gray-300 mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>

            <p className="text-gray-300 mb-4">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
              beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
              von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
