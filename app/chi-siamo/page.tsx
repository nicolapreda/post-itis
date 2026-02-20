import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 px-4 md:px-12 max-w-4xl mx-auto w-full pb-20">
        <h1 className="font-display text-6xl md:text-8xl text-[#ea1d24] mb-8 uppercase tracking-tighter leading-none">
          Chi Siamo
        </h1>

        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-stone-800">
          <p>
            <span className="font-bold text-black">Post-itis è il nuovo giornalino scolastico dell'Esperia.</span> Infatti all’interno della nostra scuola, sappiamo tutti che manca uno spazio dove ogni studente può condividere con tutti gli altri le proprie idee, i propri pensieri e le proprie riflessioni.
            E a partire da questo momento, con Post-itis, questo vuoto sarà colmato.
          </p>

          <div className="p-6 bg-white border-l-4 border-[#ea1d24] shadow-sm my-8">
            <h3 className="font-bold text-2xl mb-2 font-display uppercase">Perché "POST-ITIS"?</h3>
            <p>
              Domanda lecita! Il nome <strong>POST-ITIS</strong>, è composto dalle parole <strong>POST-IT</strong> ed <strong>ITIS</strong>. All’interno del nostro giornalino sono presenti vari POST-IT contenenti aneddoti divertenti vissuti all’interno della nostra scuola oppure battute simpatiche, per strapparti un sorriso durante la lettura. Inoltre, il nome del giornalino richiama il tempo dopo l’ITIS infatti, i redattori scrivono di ciò che succede nella scuola, ma anche di ciò che accade nel mondo esterno. Insomma un giornalino composto da POST-IT, scritto POST-ITIS.
            </p>
          </div>

          <p>
            Potrai pensare ai “soliti quattro gatti”. E invece non è così, perchè sono ben <span className="font-bold text-[#ea1d24]">30 i ragazzi</span> che hanno deciso di partecipare a questa prima fase del progetto. Questi nostri compagni si sono impegnati a scrivere storie, idee e riflessioni che hanno voluto condividere con tutti i 1500 studenti della nostra scuola e non solo. 
          </p>

          <p>
            Scrivere non è per niente facile, forse perchè non è una cosa che tutti amiamo fare, perché la scrittura necessita di impegno, dedizione e interesse e perciò ci viene più facile scrivere quando trattiamo di ciò che ci piace e di quello che ci appassiona. Questo è sicuramente un invito a chiunque voglia mettersi in gioco e partecipare alla stesura dei prossimi numeri.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 mb-12">
            {['Informare', 'Riflettere', 'Divertire', 'Mettersi in gioco'].map((goal, idx) => (
              <div key={idx} className="bg-black text-white p-6 flex items-center justify-center text-center font-display text-2xl uppercase hover:bg-[#ea1d24] transition-colors cursor-default">
                {goal}
              </div>
            ))}
          </div>

          <p className="font-bold text-xl md:text-2xl text-center italic mt-12">
            "Gli obiettivi di POST-ITIS, sono fondamentalmente quattro: informare, riflettere, divertire e mettersi in gioco. E se hai letto fino a questo punto, significa che forse ha già raggiunto i suoi obiettivi."
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
