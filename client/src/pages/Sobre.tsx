import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WA_SOBRE } from "@/lib/whatsapp";


const clients = [
  "Nestlé", "Volvo", "Bradesco", "Santander", "LATAM Airlines", "Burger King",
  "Nivea", "Banco Pan", "Unimed PR", "Unimed SP", "Unimed BH", "Itaipu Binacional",
  "Paramount", "FIEP", "Betnacional", "Algar Telecom", "GNT", "Caoa Chery",
  "O Boticário", "SEBRAE PR", "Beach Park", "Cielo", "Home Doctor", "Hidrabene", "Cuponomia",
  "Copacol", "Minhoto", "Sonho", "Bem-Te-Vi", "Moura Dubeux", "Sebrae",
];

export default function Sobre() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef}>
      <Helmet>
        <title>Sobre a South Media — AdTech Brasileira e Independente</title>
        <meta name="description" content="Conheça a South Media: uma AdTech independente de Curitiba que opera mídia programática com tecnologia própria para mais de 30 marcas líderes no Brasil." />
        <link rel="canonical" href="https://southmedia.com.br/sobre" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="South Media" />
        <meta property="og:title" content="Sobre a South Media — AdTech Brasileira e Independente" />
        <meta property="og:description" content="Conheça a South Media: uma AdTech independente de Curitiba que opera mídia programática com tecnologia própria." />
        <meta property="og:url" content="https://southmedia.com.br/sobre" />
        <meta property="og:image" content="https://southmedia.com.br/og-southmedia.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre a South Media — AdTech Brasileira e Independente" />
        <meta name="twitter:description" content="Conheça a South Media: uma AdTech independente de Curitiba que opera mídia programática com tecnologia própria." />
        <meta name="twitter:image" content="https://southmedia.com.br/og-southmedia.png" />
      </Helmet>

      <Navbar />

      <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/50 to-[#000000]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="pill-label mb-6 inline-block animate-on-scroll">Quem Somos</span>
            <h1 className="font-['Inter'] font-bold text-white text-4xl md:text-6xl lg:text-7xl mb-6 animate-on-scroll text-balance">
              AdTech Brasileira<br />e Independente.
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed animate-on-scroll">
              Nascemos da insatisfação com um mercado opaco e cheio de intermediários.
              Existimos para provar que é possível fazer mídia programática com transparência total,
              tecnologia própria e resultados comprováveis.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="section-light py-20">
        <div className="container relative z-10">
          <div className="glass-card max-w-3xl mx-auto text-center animate-on-scroll p-8 md:p-12">
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-6 text-balance">
              Nascemos da insatisfação com um mercado opaco.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              A South Media nasceu da frustração com um ecossistema programático
              cheio de intermediários, sem transparência e com orçamentos sendo consumidos
              por impressões que nunca chegam a humanos reais. Criamos nossa própria tecnologia
              para mudar essa realidade.
            </p>
          </div>
        </div>
      </section>

      {/* Missão / Visão / Valores */}
      <section className="section-dark py-20">
        <div className="container relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Missão",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F45504" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                ),
                text: "Conectar marcas a audiências reais com tecnologia proprietária, transparência total e performance comprovável.",
              },
              {
                title: "Visão",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7F31B8" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                ),
                text: "Ser a referência em mídia programática no Brasil e LATAM, provando que tecnologia independente gera resultados superiores.",
              },
              {
                title: "Valores",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F45504" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ),
                text: "Transparência, Inovação, Performance, Responsabilidade e Parceria Estratégica.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-8 text-center animate-on-scroll">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-['Inter'] font-bold text-white text-2xl mb-4">{item.title}</h3>
                <p className="text-white/80 text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que Independente */}
      <section className="section-light py-20">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="pill-label mb-4 inline-block">Por Que Independente?</span>
              <h2 className="font-['Inter'] font-bold text-white text-3xl mb-6">
                Sem dependência de ad networks ou intermediários
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Ser independente significa que não temos conflito de interesse. Nossa tecnologia
                é 100% proprietária — não dependemos de DSPs de terceiros, ad networks ou
                intermediários que consomem margem do seu investimento. Isso se traduz em
                mais controle, mais transparência e mais resultado para você.
              </p>
            </div>
            <div className="animate-on-scroll">
              <div className="space-y-8">
                <div className="glass-card p-6" style={{ borderColor: "#F45504" }}>
                  <p className="font-['Inter'] font-bold text-[#F45504] text-sm mb-4 uppercase tracking-wider">Cadeia Tradicional</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                    {["Anunciante", "Agência", "Trading Desk", "DSP", "SSP", "Publisher"].map((step, i) => (
                      <span key={step} className="flex items-center gap-2">
                        <span className="px-2.5 py-1.5 rounded-lg bg-[rgba(244,85,4,0.15)] border border-[#F45504] text-[#F45504] font-semibold text-xs md:text-sm whitespace-nowrap">{step}</span>
                        {i < 5 && <span className="text-[#F45504]">&rarr;</span>}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/60 text-xs mt-3">Múltiplos intermediários = menos controle, mais custo</p>
                </div>
                <div className="glass-card p-6" style={{ borderColor: "#7F31B8" }}>
                  <p className="font-['Inter'] font-bold text-[#7F31B8] text-sm mb-4 uppercase tracking-wider">South Media</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {["Anunciante", "South Media AdTech", "Publisher"].map((step, i) => (
                      <span key={step} className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#2A2A2A] text-[#7F31B8] font-semibold">{step}</span>
                        {i < 2 && <span className="text-[#7F31B8]">&rarr;</span>}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/60 text-xs mt-3">Menos camadas = mais controle, mais resultado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologia Proprietária */}
      <section className="section-dark py-20">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="pill-label mb-4 inline-block">Nossa Tecnologia Proprietária</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl text-balance">
              Criamos nossas próprias ferramentas
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "DOUBLE VERIFY", desc: "Verificação de viewability, brand safety e tráfego inválido." },
              { title: "ANTI-VPN TECH", desc: "Identifica e bloqueia impressões de VPNs e proxies." },
              { title: "DOUBLE CHECK", desc: "Auditoria prévia de inventário antes das campanhas." },
              { title: "OTIMIZAÇÃO REAL-TIME", desc: "Algoritmos que otimizam lances em tempo real." },
              { title: "AD TECH CORE", desc: "DSP 100% brasileira e independente." },
              { title: "GEO INTELLIGENCE", desc: "Inteligência geográfica para campanhas regionais." },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6 animate-on-scroll">
                <div className="w-12 h-12 rounded-xl bg-[#7F31B8] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="font-['Inter'] font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientes */}
      <section className="section-light py-20">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 text-balance">
              +30 Marcas Líderes Já Confiam na Nossa Tecnologia
            </h2>
            <p className="text-white/80 text-base max-w-2xl mx-auto">
              Presença nacional estratégica com expansão para toda a América Latina,
              atendendo marcas em São Paulo, Rio de Janeiro, Minas Gerais, Distrito Federal,
              Pernambuco, Paraná, Santa Catarina, além de Peru, Argentina e Chile.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 animate-on-scroll">
            {clients.map((client) => (
              <span key={client} className="client-pill">{client}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-orange py-20">
        <div className="container relative z-10 text-center">
          <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-5xl mb-6 animate-on-scroll text-balance">
            Conheça nossa tecnologia de perto.
          </h2>
          <a
           href={WA_SOBRE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta !text-lg !px-10 !py-5 animate-on-scroll inline-flex"
          >
            Quero um Diagnóstico Estratégico
          </a>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
