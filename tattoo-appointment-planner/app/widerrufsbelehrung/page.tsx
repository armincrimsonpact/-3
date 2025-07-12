import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"

export default function WiderrufsbelehrungPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-white mb-8">Widerrufsbelehrung</h1>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Widerrufsrecht für Verbraucher</h2>

            <p className="text-gray-300 mb-4">
              Als Verbraucher haben Sie das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
              widerrufen.
            </p>

            <p className="text-gray-300 mb-4">
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
            </p>

            <p className="text-gray-300 mb-4">Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>

            <p className="text-gray-300 mb-4">
              InkCircle GmbH
              <br />
              Kreuzbergstraße 123
              <br />
              10965 Berlin
              <br />
              Deutschland
              <br />
              E-Mail: info@inkcircle.com
              <br />
              Telefon: +49 30 1234567
            </p>

            <p className="text-gray-300 mb-4">
              mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief, Telefax oder E-Mail) über
              Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte
              Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
            </p>

            <p className="text-gray-300 mb-4">
              Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
              Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Folgen des Widerrufs</h2>

            <p className="text-gray-300 mb-4">
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
              einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie
              eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben),
              unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
              Ihren Widerruf bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das
              Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas
              anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Haben Sie
              verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen
              angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung
              des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im
              Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
            </p>
            <p className="text-gray-300 mb-4">
              Das Widerrufsrecht erlischt vorzeitig, wenn wir mit der Ausführung der Dienstleistung mit Ihrer
              ausdrücklichen Zustimmung vor Ende der Widerrufsfrist begonnen haben oder Sie diese selbst veranlasst
              haben.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Muster-Widerrufsformular</h2>

            <p className="text-gray-300 mb-4">
              (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es
              zurück.)
            </p>

            <div className="border border-gray-600 p-4 rounded-md text-gray-300 mb-6">
              <p className="mb-2">
                An
                <br />
                InkCircle GmbH
                <br />
                Kreuzbergstraße 123
                <br />
                10965 Berlin
                <br />
                Deutschland
                <br />
                E-Mail: info@inkcircle.com
              </p>

              <p className="mb-2">
                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden
                Waren (*)/die Erbringung der folgenden Dienstleistung (*)
              </p>

              <p className="mb-2">Bestellt am (*)/erhalten am (*)</p>

              <p className="mb-2">Name des/der Verbraucher(s)</p>

              <p className="mb-2">Anschrift des/der Verbraucher(s)</p>

              <p className="mb-2">Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>

              <p className="mb-2">Datum</p>

              <p className="italic">(*) Unzutreffendes streichen.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
