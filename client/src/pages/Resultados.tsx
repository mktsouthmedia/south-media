import { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCountUp } from "@/hooks/useScrollAnimation";
import { WA_RESULTADOS } from "@/lib/whatsapp";


const cases = [
  {
    id: 1, sector: "Tecnologia", company: "EMPRESA DE TECNOLOGIA",
    metrics: ["+193%", "conversões", "+86%", "cliques", "+93%", "CTR"],
    mainMetric: "+193%", mainLabel: "conversões",
    strategy: "Investimento 58% maior diluído em CTV, Display e remarketing. Expansão para LATAM em andamento.",
    tags: ["CTV", "Display", "Remarketing"],
    category: "Tecnologia",
  },
  {
    id: 2, sector: "Mobilidade & App", company: "BLABLACAR",
    metrics: ["+4.700", "downloads", "107%", "conversão", "+600%", "CTR"],
    mainMetric: "+600%", mainLabel: "CTR",
    strategy: "App Marketing com vídeo, nativos e display. Tracking S2S com 5 eventos pós-download. 3.2K post click events, 40% redução CPC.",
    tags: ["App Marketing", "Vídeo", "Display"],
    category: "App",
  },
  {
    id: 3, sector: "Educação & Áudio", company: "ESCOLA DE IDIOMAS",
    metrics: ["93,7%", "conclusão", "R$0,15", "CPE", "154k", "escutas"],
    mainMetric: "93,7%", mainLabel: "taxa de conclusão",
    strategy: "Spotify programático com segmentação avançada por perfil. +23,3% sobre-entrega vs contratado.",
    tags: ["Spotify", "Áudio Programático"],
    category: "Educação",
  },
  {
    id: 4, sector: "Turismo", company: "COMPARADOR DE PASSAGENS",
    metrics: ["-43%", "CPA", "+93%", "CTR", "+86%", "cliques"],
    mainMetric: "-43%", mainLabel: "redução CPA",
    strategy: "Otimização contínua de lances, retargeting por time to conversion, deals premium.",
    tags: ["Display", "Retargeting", "CTV"],
    category: "Turismo",
  },
  {
    id: 5, sector: "Turismo", company: "EMPRESA DE TURISMO",
    metrics: ["+150%", "conversões"],
    mainMetric: "+150%", mainLabel: "volume de conversões",
    strategy: "Brand + performance com lookalike e retargeting premium.",
    tags: ["Display", "Vídeo", "Lookalike"],
    category: "Turismo",
  },
  {
    id: 6, sector: "FMCG", company: "EMPRESA DE BEBIDAS",
    metrics: ["83%", "complete rate", "R$0,04", "CPV", "8M", "views"],
    mainMetric: "8M", mainLabel: "views",
    strategy: "Vídeo programático com alto impacto e brand safety. 75% viewability, CTR 0,55%.",
    tags: ["Vídeo", "Display", "Brand Safety"],
    category: "Bebidas",
  },
];

const categories = ["Todos", "Tecnologia", "Turismo", "Educação", "App", "Bebidas"];

function CaseCard({ c }: { c: typeof cases[0] }) {
  return (
    <div className="glass-card overflow-hidden group opacity-0 translate-y-[30px] animate-[fadeInUp_0.6s_ease-out_forwards]">
      {/* Top - Orange metric */}
      <div className="bg-[#7F31B8] p-6 text-center">
        <span className="font-['Inter'] font-bold text-white text-5xl md:text-6xl block">{c.mainMetric}</span>
        <span className="text-white/80 text-sm font-['Inter']">{c.mainLabel}</span>
      </div>
      {/* Bottom - Details */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#7F31B8] font-['Inter'] font-bold text-sm">{c.company}</span>
          <span className="text-white/60 text-xs">/ {c.sector}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {Array.from({ length: Math.floor(c.metrics.length / 2) }).map((_, i) => (
            <div key={i} className="text-center">
              <span className="font-['Inter'] font-bold text-white text-lg block">{c.metrics[i * 2]}</span>
              <span className="text-white/60 text-xs">{c.metrics[i * 2 + 1]}</span>
            </div>
          ))}
        </div>
        <p className="text-white/80 text-sm leading-relaxed mb-4">{c.strategy}</p>
        <div className="flex flex-wrap gap-2">
          {c.tags.map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Custom hook for scroll animation that re-observes on filter change
function useScrollAnimationWithDeps(deps: unknown[]) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const el = ref.current;
    if (el) {
      const elements = el.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => observer.observe(element));
    }

    return () => observer.disconnect();
  }, deps);

  return ref;
}

export default function Resultados() {
  const [filter, setFilter] = useState("Todos");
  const scrollRef = useScrollAnimationWithDeps([filter]);

  const marcasRef = useCountUp(30);
  const publishersRef = useCountUp(40000);
  const ctvRef = useCountUp(1330);

  const filtered = filter === "Todos" ? cases : cases.filter((c) => c.category === filter);

  return (
    <div ref={scrollRef}>
      <Helmet>
        <title>Resultados e Cases Reais de Mídia Programática | South Media</title>
        <meta name="description" content="Cases reais de CTV, display, app marketing e áudio programático: +193% conversões, +600% CTR e 93,7% de taxa de conclusão. Veja os resultados da South Media." />
        <link rel="canonical" href="https://southmedia.com.br/resultados" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="South Media" />
        <meta property="og:title" content="Resultados e Cases Reais de Mídia Programática | South Media" />
        <meta property="og:description" content="Cases reais de CTV, display, app marketing e áudio programático, com métricas comprovadas." />
        <meta property="og:url" content="https://southmedia.com.br/resultados" />
        <meta property="og:image" content="https://southmedia.com.br/og-southmedia.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resultados e Cases Reais de Mídia Programática | South Media" />
        <meta name="twitter:description" content="Cases reais de CTV, display, app marketing e áudio programático, com métricas comprovadas." />
        <meta name="twitter:image" content="https://southmedia.com.br/og-southmedia.png" />
      </Helmet>

      <Navbar />

      <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 to-[#000000]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="pill-label mb-6 inline-block animate-on-scroll">Cases e Resultados Reais</span>
            <h1 className="font-['Inter'] font-bold text-white text-4xl md:text-6xl lg:text-7xl mb-6 animate-on-scroll text-balance">
              Resultados que<br />comprovam a estratégia.
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed animate-on-scroll">
              Conheça casos práticos que mostram como nossas soluções transformam
              campanhas de marketing em resultados reais.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="section-dark py-8">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-['Inter'] font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-[#7F31B8] text-white"
                    : "bg-[#141414] text-white/80 border border-[#2A2A2A] hover:border-[#7F31B8]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="section-light py-12 pb-20">
        <div className="container relative z-10">
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((c, index) => (
                <div key={c.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CaseCard c={c} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/80 text-lg">Nenhum case encontrado para esta categoria.</p>
              <button
                onClick={() => setFilter("Todos")}
                className="mt-4 px-6 py-2 rounded-full bg-[#7F31B8] text-white font-['Inter'] font-semibold text-sm cursor-pointer"
              >
                Ver todos os cases
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Methodology */}
      <section className="section-dark py-20">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="pill-label mb-4 inline-block">Como Garantimos Resultados Mensuráveis</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl text-balance">
              Nossa Metodologia de Resultados
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 animate-on-scroll">
            {["DIAGNÓSTICO", "DOUBLE CHECK", "ATIVAÇÃO", "OTIMIZAÇÃO REAL-TIME", "RELATÓRIO TRANSPARENTE"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="px-4 py-3 rounded-xl bg-[#141414] border border-[#2A2A2A] text-center min-w-[140px]">
                  <p className="font-['Inter'] font-bold text-white text-xs">{step}</p>
                </div>
                {i < 4 && <span className="text-[#F45504] font-bold text-xl hidden md:block">&rarr;</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Metrics */}
      <section className="section-light py-20">
        <div className="container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { ref: marcasRef, prefix: "+", suffix: "", label: "Marcas Atendidas" },
              { ref: publishersRef, prefix: "+", suffix: "", label: "Publishers Premium" },
              { ref: ctvRef, prefix: "+", suffix: "", label: "Publishers CTV" },
              { ref: null, value: "Nacional", label: "+ América Latina" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 text-center animate-on-scroll">
                {item.ref ? (
                  <span className="font-['Inter'] font-bold text-4xl md:text-5xl text-[#F45504]">
                    {item.prefix}<span ref={item.ref}>0</span>{item.suffix}
                  </span>
                ) : (
                  <span className="font-['Inter'] font-bold text-4xl md:text-5xl text-[#F45504]">{item.value}</span>
                )}
                <p className="text-white/80 text-sm mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section-dark py-20">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="pill-label mb-4 inline-block">Nossa Tecnologia — Verificação e Segurança Proprietária</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl text-balance">
              Não dependemos apenas de ferramentas de terceiros. Criamos as nossas próprias.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "DOUBLE VERIFY", desc: "Verificação de viewability, brand safety e tráfego inválido em todas as campanhas." },
              { title: "ANTI-VPN TECH", desc: "Tecnologia proprietária que identifica e bloqueia impressões originadas de VPNs e proxies." },
              { title: "DOUBLE CHECK", desc: "Camada adicional de verificação antes das campanhas irem ao ar. Auditoria prévia de inventário." },
              { title: "OTIMIZAÇÃO REAL-TIME", desc: "Algoritmos proprietários que otimizam lances e alocação em tempo real." },
              { title: "AD TECH CORE", desc: "DSP 100% brasileira e independente. Sem intermediários entre você e o resultado." },
              { title: "GEO INTELLIGENCE", desc: "Inteligência geográfica proprietária para segmentação e mensuração de campanhas regionais." },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6 animate-on-scroll">
                <div className="w-12 h-12 rounded-xl bg-[#7F31B8] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="font-['Inter'] font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-orange relative py-20 overflow-hidden">
        <div className="container relative z-10 text-center">
          <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-5xl mb-6 animate-on-scroll text-balance">
            Seja o próximo case de sucesso.
          </h2>
          <a
            href={WA_RESULTADOS}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta !text-lg !px-10 !py-5 animate-on-scroll inline-flex"
          >
            Quero resultados parecidos
          </a>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
