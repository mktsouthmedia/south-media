import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecifeMap from "@/components/RecifeMap";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";
import { WA_SOLUCOES } from "@/lib/whatsapp";
import EbookModal from "@/components/EbookModal";
import { solucoes as produtos } from "@/data/solucoes";


function SolutionCard({ icon, title, description, id }: { icon: React.ReactNode; title: string; description: string; id?: string }) {
  return (
    <div id={id} className={`glass-card p-6 animate-on-scroll${id ? " scroll-mt-[104px]" : ""}`}>
      <div className="w-14 h-14 rounded-2xl bg-[#7F31B8] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-['Inter'] font-bold text-white text-lg mb-2">{title}</h3>
      <p className="text-white/80 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function StatPill({ text }: { text: string }) {
  return (
    <span className="inline-block px-4 py-2 rounded-full bg-[#7F31B8] text-white text-sm font-semibold">
      {text}
    </span>
  );
}

function FlowStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 animate-on-scroll">
      <div className="w-12 h-12 rounded-full bg-[#7F31B8] flex items-center justify-center shrink-0">
        <span className="font-['Inter'] font-bold text-white text-lg">{number}</span>
      </div>
      <div>
        <h4 className="font-['Inter'] font-bold text-white text-base mb-1">{title}</h4>
        <p className="text-white/80 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// SVG Icons
const IconTV = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
);
const IconLocation = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconData = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
);
const IconGame = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>
);


export default function Solucoes() {
  const scrollRef = useScrollAnimation();
  const publishersRef = useCountUp(40000);
  const ctvRef = useCountUp(1330);
  const [ebookModalOpen, setEbookModalOpen] = useState(false);

  // Auto-popup: abre o modal do ebook após 10s se não foi exibido nesta sessão
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("ebookPopupShown")) {
        setEbookModalOpen(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Chegada vinda de outra página via link com âncora (ex.: Navbar / Home "#ctv")
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  return (
    <div ref={scrollRef}>
      <Helmet>
        <title>Soluções — Display, CTV, DOOH, Áudio e Drive to Store | South Media</title>
        <meta name="description" content="One Stop Shop programático: display, CTV, publishers regionais, drive to store, DOOH, áudio e app marketing operados de ponta a ponta pela South Media." />
        <link rel="canonical" href="https://southmedia.com.br/solucoes" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="South Media" />
        <meta property="og:title" content="Soluções — Display, CTV, DOOH, Áudio e Drive to Store | South Media" />
        <meta property="og:description" content="One Stop Shop programático: display, CTV, publishers regionais, drive to store, DOOH, áudio e app marketing operados de ponta a ponta." />
        <meta property="og:url" content="https://southmedia.com.br/solucoes" />
        <meta property="og:image" content="https://southmedia.com.br/og-southmedia.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Soluções — Display, CTV, DOOH, Áudio e Drive to Store | South Media" />
        <meta name="twitter:description" content="One Stop Shop programático: display, CTV, publishers regionais, drive to store, DOOH, áudio e app marketing operados de ponta a ponta." />
        <meta name="twitter:image" content="https://southmedia.com.br/og-southmedia.png" />
      </Helmet>

      <Navbar />

      <main>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 to-[#000000]" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="pill-label mb-6 inline-block animate-on-scroll">Nossa AdTech</span>
            <h1 className="font-['Inter'] font-bold text-white text-4xl md:text-6xl lg:text-7xl mb-6 animate-on-scroll text-balance">
              One Stop Shop<br />Programático.
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed animate-on-scroll">
              Sem fragmentação. Sem intermediários. Conectamos diferentes telas e pontos de contato
              para integrar a jornada do consumidor.
            </p>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="section-light py-10 border-y border-[#2A2A2A]">
        <div className="container relative z-10 text-center">
          <p className="font-['Inter'] font-bold text-white text-xl md:text-2xl max-w-3xl mx-auto text-balance animate-on-scroll">
            Com a South Media, cada real investido em mídia entrega performance comprovável.
          </p>
        </div>
      </section>

      {/* Índice de produtos */}
      <section className="section-dark py-10">
        <div className="container relative z-10">
          <div className="flex flex-wrap justify-center gap-2 animate-on-scroll">
            {produtos.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="px-4 py-2 rounded-full text-sm font-['Inter'] font-semibold text-white/80 bg-[#141414] border border-[#2A2A2A] hover:border-[#F45504] hover:text-white transition-colors"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mídia Programática */}
      <section className="section-light py-20">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="pill-label mb-4 inline-block">Mídia Programática</span>
              <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-6 text-balance">
                Execute campanhas em mais de 40.000 publishers premium
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                Otimização contínua de lances, redução de CPA e maximização de conversão.
                Compramos nas principais plataformas do mercado e garantimos que cada
                impressão seja entregue a pessoas reais, em ambientes seguros e com total
                transparência.
              </p>
              <div className="flex flex-wrap gap-3">
                <StatPill text="+193% conversões" />
                <StatPill text="+600% CTR" />
                <StatPill text="+93% taxa de conclusão" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-on-scroll">
              <div className="glass-card p-6 text-center">
                <span className="font-['Inter'] font-bold text-3xl text-[#F45504]">+<span ref={publishersRef}>0</span></span>
                <p className="text-white/80 text-sm mt-2">Publishers Premium</p>
              </div>
              <div className="glass-card p-6 text-center">
                <span className="font-['Inter'] font-bold text-3xl text-[#7F31B8]">+<span ref={ctvRef}>0</span></span>
                <p className="text-white/80 text-sm mt-2">Publishers CTV</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Display */}
      <section id="display" className="section-dark py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="pill-label mb-4 inline-block">Display</span>
              <h2 className="font-['Inter'] font-bold text-white text-3xl mb-6">
                Formatos em diferentes portais de grande relevância.
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                Display e vídeo programático em publishers premium nacionais e internacionais.
                Formatos de alto impacto com viewability garantida e brand safety.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Globo.com", "UOL", "R7", "Terra", "iG", "Folha"].map((pub) => (
                  <span key={pub} className="tech-tag">{pub}</span>
                ))}
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="glass-card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-[#2A2A2A]">
                  <div className="w-3 h-3 rounded-full bg-[#F45504]" />
                  <div className="w-3 h-3 rounded-full bg-[#F45504]" />
                  <div className="w-3 h-3 rounded-full bg-[#7F31B8]" />
                  <div className="flex-1 mx-4 h-6 rounded-md bg-[#141414] flex items-center px-3">
                    <span className="text-white/50 text-xs">www.publisher-premium.com.br</span>
                  </div>
                </div>
                <div className="p-6 min-h-[200px] flex items-center justify-center">
                  <div className="w-full h-[160px] rounded-xl bg-[#141414] border-2 border-dashed border-[#F45504]/40 flex items-center justify-center">
                    <span className="font-['Inter'] font-bold text-[#F45504] text-lg">Seu anúncio aqui</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTV */}
      <section id="ctv" className="section-light py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="pill-label mb-4 inline-block">Inventário Connected TV</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 text-balance">
              Conecte-se com sua audiência pela maior tela da casa.
            </h2>
            <p className="text-[#F45504] font-['Inter'] font-bold text-xl">Anuncie conosco diretamente na Netflix</p>
            <span className="tech-tag mt-4 inline-block">+1.330 Publishers de CTV no Brasil</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Vídeo Streaming Content", desc: "Anúncios em conteúdo premium de streaming com alta atenção do espectador." },
              { title: "Pré-roll, Mid-roll & Post-roll", desc: "Formatos de vídeo integrados à experiência de assistir, com alto completion rate." },
              { title: "Sitelists ou Deals", desc: "Compre através de sitelists curadas ou deals exclusivos com publishers premium." },
            ].map((item) => (
              <div key={item.title} className="glass-card p-6 animate-on-scroll">
                <IconTV />
                <h3 className="font-['Inter'] font-bold text-white mt-4 mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTV Ecosystem Diagram */}
          <div className="animate-on-scroll max-w-3xl mx-auto">
            <div className="glass-card p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-[#7F31B8] flex items-center justify-center mx-auto mb-4">
                  <IconTV />
                </div>
                <h3 className="font-['Inter'] font-bold text-white text-xl">Ecossistema CTV</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Connected TV", items: "Netflix, Globoplay, Disney+" },
                  { label: "Over-the-Top", items: "Pluto TV, YouTube, Dailymotion" },
                  { label: "Devices", items: "Samsung, Apple TV, Roku, Fire TV" },
                  { label: "Console Gaming", items: "Xbox, PlayStation" },
                ].map((cat) => (
                  <div key={cat.label} className="p-3 rounded-xl bg-[rgba(127,49,184,0.1)] border border-[#2A2A2A]">
                    <p className="font-['Inter'] font-bold text-[#7F31B8] text-sm mb-1">{cat.label}</p>
                    <p className="text-white/60 text-xs">{cat.items}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOOH */}
      <section id="dooh" className="section-dark py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="pill-label mb-4 inline-block">DOOH</span>
              <h2 className="font-['Inter'] font-bold text-white text-3xl mb-6 text-balance">
                Telas digitais de alto tráfego, compradas como mídia digital.
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                Digital Out of Home programático: anúncios em telas digitais de shoppings,
                aeroportos, ruas e pontos de alto tráfego, com compra automatizada e a mesma
                curadoria de inventário que aplicamos nos demais canais.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Shoppings", "Aeroportos", "Vias Urbanas", "Compra Automatizada"].map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="animate-on-scroll flex justify-center">
              <div className="w-[280px] h-[180px] rounded-xl border-4 border-[#7F31B8] bg-black relative overflow-hidden shadow-2xl shadow-black/50">
                <div className="absolute inset-0 bg-[#7F31B8]/40 flex items-center justify-center">
                  <span className="font-['Inter'] font-bold text-white text-sm text-center px-4">Sua marca na tela certa, no lugar certo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Áudio Programático */}
      <section id="audio" className="section-light py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll order-2 lg:order-1">
              <div className="glass-card p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#7F31B8] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-[#141414] overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-[#7F31B8]" />
                  </div>
                </div>
                <p className="text-white/60 text-xs">Spotify · Podcasts · Rádio digital · Games</p>
              </div>
            </div>
            <div className="animate-on-scroll order-1 lg:order-2">
              <span className="pill-label mb-4 inline-block">Áudio Programático</span>
              <h2 className="font-['Inter'] font-bold text-white text-3xl mb-6 text-balance">
                Muito além do Spotify.
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                Áudio programático é a compra automatizada de espaço publicitário em streaming
                de música, podcasts, rádio digital e games. O Spotify segue como porta de
                entrada natural — mais de 36 milhões de usuários ativos no Brasil —, mas a
                inserção dinâmica de anúncios já abriu também o inventário de podcasts para
                compra programática.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Spotify", "Podcasts", "Rádio Digital", "Games"].map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              <Link href="/blog/audio-programatico-alem-spotify-2026" className="text-white font-['Inter'] font-bold text-sm hover:text-[#F45504] transition-colors">
                Entender o canal &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Native */}
      <section id="native" className="section-dark py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="pill-label mb-4 inline-block">Native</span>
              <h2 className="font-['Inter'] font-bold text-white text-3xl mb-6 text-balance">
                O formato que não grita entrega mais atenção.
              </h2>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                Native programático é o anúncio pago que assume a forma, a fonte e o ritmo do
                conteúdo ao redor — sempre identificado como publicidade — em vez de disputar
                atenção como um banner. Responde à cegueira de banner e vive em ambiente
                editorial real, com curadoria de inventário.
              </p>
              <Link href="/blog/native-programatico-atencao" className="text-white font-['Inter'] font-bold text-sm hover:text-[#F45504] transition-colors">
                Entender o formato &rarr;
              </Link>
            </div>
            <div className="animate-on-scroll grid grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <div className="w-full h-16 rounded-lg bg-[#7F31B8]/40 mb-3" />
                <div className="w-3/4 h-2 rounded-full bg-white/30 mb-2" />
                <div className="w-1/2 h-2 rounded-full bg-white/15 mb-3" />
                <span className="text-white/50 text-[10px] uppercase tracking-wide">Publicidade · Native</span>
              </div>
              <div className="glass-card p-4 opacity-50">
                <div className="w-full h-16 rounded-lg border-2 border-dashed border-[#2A2A2A] flex items-center justify-center mb-3">
                  <span className="text-white/40 text-[10px]">BANNER</span>
                </div>
                <div className="w-3/4 h-2 rounded-full bg-[#141414] mb-2" />
                <div className="w-1/2 h-2 rounded-full bg-[#141414]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drive to Store */}
      <section id="drive-to-store" className="section-light py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="pill-label mb-4 inline-block">Drive to Store</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 text-balance">
              Atribuição de visita física, do anúncio à loja.
            </h2>
          </div>
          <div className="max-w-xl mx-auto space-y-4">
            {[
              { n: "01", text: "Usuário recebe anúncio mobile/CTV" },
              { n: "02", text: "Recebemos o Device ID pelo bid-stream" },
              { n: "03", text: "Verificamos se passou perto da loja" },
              { n: "04", text: "Mapeamos usuários próximos de lojas e POIs" },
            ].map((item) => (
              <div key={item.n} className="flex items-center gap-3 animate-on-scroll">
                <span className="w-8 h-8 rounded-full bg-[#7F31B8] flex items-center justify-center font-['Inter'] font-bold text-white text-xs shrink-0">{item.n}</span>
                <p className="text-white/80 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Household Sync */}
      <section id="household-sync" className="section-dark py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="pill-label mb-4 inline-block">Household Sync</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 text-balance">
              Impacte, mensure e crie engajamento com Household Sync.
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 animate-on-scroll">
            {[
              { step: "TARGET CTV", desc: "Anúncio na TV Conectada" },
              { step: "HOUSEHOLD SYNC", desc: "Sincroniza mobile na mesma rede" },
              { step: "REIMPACTO", desc: "Janela de 30s a 10 dias" },
            ].map((item, i) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className="glass-card p-6 text-center min-w-[180px]">
                  <p className="font-['Inter'] font-bold text-[#F45504] text-sm mb-1">{item.step}</p>
                  <p className="text-white/80 text-xs">{item.desc}</p>
                </div>
                {i < 2 && <span className="text-[#F45504] font-bold text-2xl hidden md:block">&rarr;</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geolocalização */}
      <section id="geolocalizacao" className="section-light py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="pill-label mb-4 inline-block">Geolocalização — Location Intelligence</span>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                Obtenha maior precisão de alcance com a estratégia Location Based Audiences.
                Mapeamos toda a jornada do usuário até o destino, incluindo shoppings, praças,
                estacionamentos e pontos de ônibus.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="tech-tag">MAIN POI</span>
                <span className="tech-tag">TIER 2 INTEREST POINTS</span>
              </div>
            </div>
            <div className="glass-card p-4 animate-on-scroll overflow-hidden rounded-2xl">
              <RecifeMap />
            </div>
          </div>
        </div>
      </section>

      {/* Audience Insights / Inteligência de Dados */}
      <section id="audience-insights" className="section-dark py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="pill-label mb-4 inline-block">Audience Insights</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl text-balance">
              Dados que transformam campanhas em resultados
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <IconLocation />, title: "LBA", desc: "Location Based Audiences com precisão de alcance geográfico avançado." },
              { icon: <IconData />, title: "DMP", desc: "Data Management Platform para segmentação e ativação de audiências proprietárias." },
              { icon: <IconLocation />, title: "Geofence", desc: "Cercas virtuais ao redor de locais estratégicos para disparo automático de campanhas." },
              { icon: <IconData />, title: "Intenção de Busca", desc: "Segmentação baseada em comportamento de busca e intenção de compra do usuário." },
            ].map((item) => (
              <SolutionCard key={item.title} icon={item.icon} title={item.title} description={item.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* App Marketing */}
      <section id="app-marketing" className="section-light py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <span className="pill-label mb-4 inline-block">App Marketing</span>
              <h2 className="font-['Inter'] font-bold text-white text-3xl mb-4">Marketing de aplicativos, do install à conversão.</h2>
              <p className="text-white/80 text-base leading-relaxed mb-4">
                Tracking S2S com 5 eventos pós-download para mensuração completa do funil de
                conversão, com vídeo, nativos e display integrados à mesma operação.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Vídeo", "Nativos", "Display", "SMS"].map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="animate-on-scroll flex items-center justify-center">
              <div className="w-[220px] h-[420px] rounded-[32px] border-2 border-[#7F31B8] bg-[#000000] relative overflow-hidden">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20" />
                <div className="absolute top-16 left-4 right-4 p-4 rounded-xl bg-[#141414] border border-[#2A2A2A]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#7F31B8]" />
                    <span className="text-white text-xs font-bold">South Media</span>
                  </div>
                  <p className="text-white/80 text-[10px]">Instale agora e ganhe uma oferta especial de boas-vindas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Push Notification + Geofence */}
      <section id="push" className="section-dark py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <span className="pill-label mb-4 inline-block">Push Notification</span>
              <h2 className="font-['Inter'] font-bold text-white text-3xl mb-6">
                Metodologia South Media Geolocation Geofence
              </h2>
              <p className="text-white/80 text-base mb-8">Via triangulação de antenas com 230 milhões de celulares conectados.</p>
              <div className="space-y-6">
                {[
                  { n: "01", title: "Geofence como cerca virtual", desc: "Delimitação precisa de áreas geográficas de interesse." },
                  { n: "02", title: "Locais estratégicos", desc: "Posicionada ao redor de shoppings, eventos e pontos de interesse." },
                  { n: "03", title: "Disparo automático", desc: "Notificação enviada ao entrar na área delimitada." },
                  { n: "04", title: "Resultados mensuráveis", desc: "Aumenta visitas, promove eventos, complementa OOH." },
                ].map((item) => (
                  <FlowStep key={item.n} number={item.n} title={item.title} description={item.desc} />
                ))}
              </div>
            </div>
            <div className="animate-on-scroll flex items-center justify-center">
              <div className="w-[220px] h-[420px] rounded-[32px] border-2 border-[#7F31B8] bg-[#000000] relative overflow-hidden">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20" />
                <div className="absolute top-16 left-4 right-4 p-4 rounded-xl bg-[#141414] border border-[#2A2A2A]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#7F31B8]" />
                    <span className="text-white text-xs font-bold">South Media</span>
                  </div>
                  <p className="text-white/80 text-[10px]">Oferta especial! Você está próximo da nossa loja. Aproveite 20% de desconto.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Streamings */}
      <section id="streamings" className="section-light py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="pill-label mb-4 inline-block">Streamings</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 text-balance">
              Anúncios dentro dos apps de streaming mais assistidos do Brasil.
            </h2>
          </div>
          <div className="max-w-2xl mx-auto animate-on-scroll">
            <SolutionCard
              icon={<IconTV />}
              title="Vídeo em ambiente de streaming premium"
              description="Compra direta e via sitelists em Netflix, Prime Video, Max, Globoplay e Disney+, com alta atenção do espectador e curadoria e verificação do Double Check antes de qualquer real ir ao ar."
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6 animate-on-scroll">
            {["Netflix", "Prime Video", "Max", "Globoplay", "Disney+"].map((f) => (
              <span key={f} className="tech-tag">{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* In-Game */}
      <section id="in-game" className="section-dark py-20 scroll-mt-[104px]">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            <SolutionCard
              icon={<IconGame />}
              title="In-Game Advertising"
              description="A publicidade em jogos permite que as marcas se conectem em ambiente nativo. Brasil é o 5o maior consumidor de apps móveis. Gamers são 2,5x mais engajados que a média."
            />
          </div>
        </div>
      </section>

      {/* Rich Media */}
      <section className="section-light py-20">
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="pill-label mb-4 inline-block">Formatos Especiais & Exclusivos - Rich Media</span>
            <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-4xl mb-4 text-balance">
              Experiências interativas e em vídeo que aumentam o tempo de permanência.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 animate-on-scroll">
            {/* Carrossel Interativo - PEACHY */}
            <div className="flex flex-col items-center">
              <div className="w-[200px] h-[380px] rounded-[32px] border-2 bg-[#000000] relative overflow-hidden" style={{ borderColor: "#F45504" }}>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20 z-10" />
                <div className="absolute inset-0 flex items-center">
                  <div className="flex animate-carousel" style={{ animation: "carousel 6s ease-in-out infinite" }}>
                    {["#7F31B8", "#F45504", "#7F31B8", "#F45504"].map((c, i) => (
                      <div key={i} className="w-[200px] h-[380px] shrink-0 flex flex-col items-center justify-center p-6" style={{ background: `${c}22` }}>
                        <div className="w-24 h-24 rounded-2xl mb-4" style={{ background: `${c}` }} />
                        <div className="w-28 h-2 rounded-full bg-white/20 mb-2" />
                        <div className="w-20 h-2 rounded-full bg-[#141414]" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {[0,1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" style={{ animation: `dotPulse 6s ease-in-out infinite ${i * 1.5}s` }} />)}
                </div>
                <span className="absolute top-12 left-1/2 -translate-x-1/2 font-['Inter'] font-bold text-white/60 text-xs tracking-wider z-10">Carrossel Interativo</span>
              </div>

            </div>

            {/* Fullscreen Imersivo - NATUZZI */}
            <div className="flex flex-col items-center">
              <div className="w-[200px] h-[380px] rounded-[32px] border-2 bg-[#000000] relative overflow-hidden" style={{ borderColor: "#F45504" }}>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20 z-10" />
                <div className="absolute inset-0" style={{ animation: "fullscreenPulse 4s ease-in-out infinite" }}>
                  <div className="absolute inset-0 bg-[#7F31B8]/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="w-full h-32 rounded-xl bg-[#7F31B8]/30 mb-4" style={{ animation: "scaleBreath 3s ease-in-out infinite" }} />
                    <div className="w-32 h-3 rounded-full bg-white/30 mb-2" />
                    <div className="w-24 h-3 rounded-full bg-white/15 mb-6" />
                    <div className="px-6 py-2 rounded-full border border-[#F45504]/50 bg-[#F45504]/20">
                      <span className="text-[#F45504] text-xs font-bold">SAIBA MAIS</span>
                    </div>
                  </div>
                </div>
                <span className="absolute top-12 left-1/2 -translate-x-1/2 font-['Inter'] font-bold text-white/60 text-xs tracking-wider z-10">Fullscreen Imersivo</span>
              </div>

            </div>

            {/* Galeria Shoppable - H&M */}
            <div className="flex flex-col items-center">
              <div className="w-[200px] h-[380px] rounded-[32px] border-2 bg-[#000000] relative overflow-hidden" style={{ borderColor: "#F45504" }}>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/20 z-10" />
                <div className="absolute inset-0 p-4 pt-10">
                  <div className="grid grid-cols-2 gap-2 h-full pb-4">
                    {["#7F31B8", "#F45504", "#7F31B8", "#F45504", "#7F31B8", "#F45504"].map((c, i) => (
                      <div key={i} className="rounded-lg relative overflow-hidden group" style={{ background: `${c}33`, animation: `fadeInItem 0.5s ease-out ${i * 0.3}s both, shimmer 3s ease-in-out ${i * 0.5}s infinite` }}>
                        <div className="absolute inset-0 flex items-end p-1.5">
                          <div className="w-full flex items-center justify-between">
                            <div className="w-8 h-1 rounded bg-white/20" />
                            <div className="w-4 h-4 rounded-full bg-[#F45504]/40 flex items-center justify-center">
                              <span className="text-white text-[6px]">+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <span className="absolute top-12 left-1/2 -translate-x-1/2 font-['Inter'] font-bold text-white/60 text-xs tracking-wider z-10">Galeria Shoppable</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-orange py-20">
        <div className="container relative z-10 text-center">
          <h2 className="font-['Inter'] font-bold text-white text-3xl md:text-5xl mb-6 animate-on-scroll text-balance">
            Qual solução é certa para você?
          </h2>
          <a
           href={WA_SOLUCOES}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta !text-lg !px-10 !py-5 animate-on-scroll inline-flex"
          >
            Quero ver no meu caso
          </a>
        </div>
      </section>

      <EbookModal open={ebookModalOpen} onOpenChange={setEbookModalOpen} />
      </main>
      <Footer />
    </div>
  );
}
