import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />

      <main className="flex-1 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-white mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Datenschutz auf einen Blick</h2>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Allgemeine Hinweise</h3>
            <p className="text-gray-300 mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
              persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
              unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Datenerfassung auf dieser Website</h3>
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
              <br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können
              Sie dem Impressum dieser Website entnehmen.
            </p>

            <p className="text-gray-300 mb-4">
              <strong className="text-white">Wie erfassen wir Ihre Daten?</strong>
              <br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um
              Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>

            <p className="text-gray-300 mb-4">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
              IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder
              Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website
              betreten.
            </p>

            <p className="text-gray-300 mb-4">
              <strong className="text-white">Wofür nutzen wir Ihre Daten?</strong>
              <br />
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere
              Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <p className="text-gray-300 mb-4">
              <strong className="text-white">Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
              <br />
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
              Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können
              Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
              bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des
              Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>

            <p className="text-gray-300 mb-4">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum
              angegebenen Adresse an uns wenden.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Hosting und Content Delivery Networks (CDN)</h2>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Externes Hosting</h3>
            <p className="text-gray-300 mb-4">
              Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die
              auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich u.
              a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen,
              Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>

            <p className="text-gray-300 mb-4">
              Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und
              bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten
              Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>

            <p className="text-gray-300 mb-4">
              Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten
              erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Datenschutz</h3>
            <p className="text-gray-300 mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
              Datenschutzerklärung.
            </p>

            <p className="text-gray-300 mb-4">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene
              Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende
              Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie
              und zu welchem Zweck das geschieht.
            </p>

            <p className="text-gray-300 mb-4">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)
              Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
              möglich.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
            <p className="text-gray-300 mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>

            <p className="text-gray-300 mb-4">
              InkCircle GmbH
              <br />
              Kreuzbergstraße 123
              <br />
              10965 Berlin
              <br />
              Deutschland
            </p>

            <p className="text-gray-300 mb-4">
              Telefon: +49 30 1234567
              <br />
              E-Mail: info@inkcircle.com
            </p>

            <p className="text-gray-300 mb-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen
              über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o.
              Ä.) entscheidet.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Speicherdauer</h3>
            <p className="text-gray-300 mb-4">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
              Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
              berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden
              Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
              personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
              letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">
              Widerruf Ihrer Einwilligung zur Datenverarbeitung
            </h3>
            <p className="text-gray-300 mb-4">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
              bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
              Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">
              Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)
            </h3>
            <p className="text-gray-300 mb-4">
              WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE
              JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG
              IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN
              GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE
              DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN
              DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG
              NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER
              GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
            </p>

            <p className="text-gray-300 mb-4">
              WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT,
              JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
              DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN
              VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM
              ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">
              Beschwerderecht bei der zuständigen Aufsichtsbehörde
            </h3>
            <p className="text-gray-300 mb-4">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
              Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
              oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger
              verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
            <p className="text-gray-300 mb-4">
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
              automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format
              aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
              verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">SSL- bzw. TLS-Verschlüsselung</h3>
            <p className="text-gray-300 mb-4">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum
              Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
              von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>

            <p className="text-gray-300 mb-4">
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht
              von Dritten mitgelesen werden.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Auskunft, Löschung und Berichtigung</h3>
            <p className="text-gray-300 mb-4">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
              Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
              Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren
              Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Recht auf Einschränkung der Verarbeitung</h3>
            <p className="text-gray-300 mb-4">
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu
              können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden
              Fällen:
            </p>

            <ul className="list-disc pl-6 text-gray-300 mb-4">
              <li className="mb-2">
                Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir
                in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die
                Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
              <li className="mb-2">
                Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der
                Löschung die Einschränkung der Datenverarbeitung verlangen.
              </li>
              <li className="mb-2">
                Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung
                oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die
                Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
              <li className="mb-2">
                Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren
                und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen,
                haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
            </ul>

            <p className="text-gray-300 mb-4">
              Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von
              ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder
              Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen
              Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines
              Mitgliedstaats verarbeitet werden.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Datenerfassung auf dieser Website</h2>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Cookies</h3>
            <p className="text-gray-300 mb-4">
              Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf
              Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
              (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies
              werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät
              gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
            </p>

            <p className="text-gray-300 mb-4">
              Teilweise können auch Cookies von Drittunternehmen auf Ihrem Endgerät gespeichert werden, wenn Sie unsere
              Seite betreten (Third-Party-Cookies). Diese ermöglichen uns oder Ihnen die Nutzung bestimmter
              Dienstleistungen des Drittunternehmens (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
            </p>

            <p className="text-gray-300 mb-4">
              Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte
              Websitefunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von
              Videos). Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten oder Werbung anzuzeigen.
            </p>

            <p className="text-gray-300 mb-4">
              Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs (notwendige Cookies) oder zur
              Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (funktionale Cookies, z. B. für die
              Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums)
              erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere
              Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von
              Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung
              zur Speicherung von Cookies abgefragt wurde, erfolgt die Speicherung der betreffenden Cookies
              ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die Einwilligung ist
              jederzeit widerrufbar.
            </p>

            <p className="text-gray-300 mb-4">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies
              nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie
              das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von
              Cookies kann die Funktionalität dieser Website eingeschränkt sein.
            </p>

            <p className="text-gray-300 mb-4">
              Soweit Cookies von Drittunternehmen oder zu Analysezwecken eingesetzt werden, werden wir Sie hierüber im
              Rahmen dieser Datenschutzerklärung gesondert informieren und ggf. eine Einwilligung abfragen.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Kontaktformular</h3>
            <p className="text-gray-300 mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
              Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>

            <p className="text-gray-300 mb-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
              mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
              erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an
              der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
            </p>

            <p className="text-gray-300 mb-4">
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
              auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt
              (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere
              Aufbewahrungsfristen – bleiben unberührt.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Anfrage per E-Mail, Telefon oder Telefax</h3>
            <p className="text-gray-300 mb-4">
              Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus
              hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns
              gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>

            <p className="text-gray-300 mb-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
              mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
              erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an
              der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
            </p>

            <p className="text-gray-300 mb-4">
              Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung
              auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt
              (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen –
              insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
