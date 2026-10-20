import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import "@/styles/ebook-lp.css";
import { Count, Words, prefersReducedMotion, useReveal } from "@/components/ebook/motion";
import { useEbookForm } from "@/components/ebook/useEbookForm";

const d = (n: number) => ({ ["--d" as string]: n }) as CSSProperties;

const TITLE = "Ebook grátis: O Futuro da Inteligência de Mídia | South Media";
const DESCRIPTION =
  "Ebook gratuito da South Media: os dados que explicam para onde a atenção está indo e como orquestrar a mídia em um ecossistema fragmentado. Fontes WARC, IAB Brasil e Kantar.";
const OG_TITLE = "O Futuro da Inteligência de Mídia — ebook gratuito";
const OG_DESCRIPTION = "Comprar espaço acabou. A era agora é comprar inteligência em tempo real.";
const URL = "https://southmedia.com.br/ebook";

const MARQUEE = [
  { b: "+10,7%", t: "crescimento publicitário do Brasil em 2026", s: "WARC" },
  { b: "80%", t: "alta do digital no Brasil desde 2020", s: "IAB Brasil / Ibope" },
  { b: "54,7%", t: "do digital global com Google, Meta e Amazon", s: "WARC" },
  { b: "57%", t: "das marcas apontam atribuição e mensuração como crítico", s: "Supermetrics, via eMarketer" },
  { b: "64%", t: "da população digital brasileira já usa CTV", s: "Kantar; IBOPE Media; Comverse" },
  { b: "+37%", t: "de crescimento do retail media no Brasil sobre 2024", s: "IAB Brasil" },
  { b: "+30%", t: "compra programática em DOOH e áudio em 2026", s: "Madison & Wall" },
];

const CHAPTERS = [
  { n: "01", h: "O mercado cresce. A atenção ficou cara.", p: "A contradição entre o crescimento recorde e o leilão saturado dos grandes walled gardens.", k: "+10,7% · 80% · 54,7%" },
  { n: "02", h: "A pergunta de 1 milhão de reais", p: "Fragmentação, atribuição e por que o cookie sobreviveu, mas a confiança nele não.", k: "66% · 57% · 57%" },
  { n: "03", h: "O novo mapa da atenção", p: "CTV, retail media e Drive to Store, DOOH programático e áudio digital.", k: "64% · R$ 4,8 bi · +30%" },
  { n: "04", h: "A camada de inteligência South Media", p: "Orquestração, tecnologia e método para operar um ecossistema fragmentado.", k: "Anti-VPN Tech · Double Check" },
];

const WHO = [
  { h: "Analistas e BI", p: "Números de mercado com fonte, prontos para entrar no próximo relatório." },
  { h: "Supervisores de mídia", p: "Um mapa dos canais que estão ganhando atenção fora dos feeds." },
  { h: "Gestores de mídia", p: "Argumentos para diversificar o plano com intenção e contexto." },
  { h: "Gestores de marketing", p: "Uma leitura rápida da virada: de comprar espaço a comprar inteligência." },
];

const LOGO_BRANCA = "/images/brand/southmedia-logo-horizontal-branco.png";

/** Logo oficial (PNG 949×200), branca para fundo preto. */
function Logo({ h, eager = false }: { h: number; eager?: boolean }) {
  return (
    <img
      src={LOGO_BRANCA}
      alt="South Media"
      width={Math.round((h * 949) / 200)}
      height={h}
      loading={eager ? "eager" : "lazy"}
      style={{ height: h, width: "auto", display: "block" }}
    />
  );
}

function Header({ scrolled }: { scrolled: boolean }) {
  return (
    <header className={`eb-top${scrolled ? " scrolled" : ""}`}>
      <div className="wrap">
        <Link className="wm" href="/" aria-label="South Media"><Logo h={38} eager /></Link>
        <a className="btn o" href="#form" tabIndex={scrolled ? 0 : -1}>
          Baixar o ebook grátis <span className="ar" aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}

function LeadCard({ cardRef }: { cardRef: React.RefObject<HTMLDivElement | null> }) {
  const f = useEbookForm();
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (f.status !== "success") return;
    const raf = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(raf);
  }, [f.status]);

  return (
    <div className="formcard" ref={cardRef}>
      {f.status !== "success" ? (
        <form onSubmit={f.submit} noValidate>
          <h3>Receba o ebook no seu e-mail</h3>
          <p className="sub">Preencha e o material chega direto na sua caixa de entrada.</p>
          <div className="f">
            <label htmlFor="eb-email">E-mail corporativo</label>
            <input
              id="eb-email" name="email" type="email" autoComplete="email" placeholder="voce@empresa.com" required
              value={f.email} onChange={(e) => f.setEmail(e.target.value)} onBlur={f.onEmailBlur}
              className={f.emailErr ? "bad" : ""} aria-invalid={!!f.emailErr} aria-describedby="eb-email-err"
            />
            <p className="err" id="eb-email-err" aria-live="polite">{f.emailErr}</p>
          </div>
          <div className="f">
            <label htmlFor="eb-cargo">Cargo</label>
            <input
              id="eb-cargo" name="cargo" type="text" autoComplete="organization-title" placeholder="Seu cargo" required
              value={f.cargo} onChange={(e) => f.setCargo(e.target.value)}
              className={f.badCargo ? "bad" : ""} aria-invalid={f.badCargo}
            />
          </div>
          <div className="f">
            <label htmlFor="eb-empresa">Empresa</label>
            <input
              id="eb-empresa" name="empresa" type="text" autoComplete="organization" placeholder="Nome da empresa" required
              value={f.empresa} onChange={(e) => f.setEmpresa(e.target.value)}
              className={f.badEmpresa ? "bad" : ""} aria-invalid={f.badEmpresa}
            />
          </div>
          <label className="consent">
            <input type="checkbox" name="consent" checked={f.consent} onChange={(e) => f.setConsent(e.target.checked)} />
            Autorizo a South Media a coletar meus dados e enviar novidades por e-mail. Posso cancelar a qualquer momento.
          </label>
          <button className="btn o" type="submit" disabled={!f.consent || f.status === "loading"}>
            {f.status === "loading" ? "Enviando…" : "Quero receber o ebook grátis"} <span className="ar" aria-hidden="true">→</span>
          </button>
          <p className="formmsg" aria-live="polite">{f.msg}</p>
          <p className="micro">Sem spam. Você recebe o material direto no seu e-mail.</p>
        </form>
      ) : (
        <div className={`success live${drawn ? " go" : ""}`} role="status">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="36" cy="36" r="30" stroke="#7F31B8" />
            <path d="M23 37l9 9 17-19" stroke="#F45504" />
          </svg>
          <h3>Pronto! O ebook está a caminho.</h3>
          <p>Enviamos o material para o seu e-mail. Se não aparecer em alguns minutos, confira a caixa de promoções ou spam.</p>
        </div>
      )}
    </div>
  );
}

export default function Ebook() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mctaShow, setMctaShow] = useState(false);

  useReveal(rootRef);

  // barra de progresso, header e CTA fixo no celular
  useEffect(() => {
    let formVisible = true;
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 40);
      if (barRef.current) barRef.current.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      setMctaShow(!formVisible && y > 300);
    };
    const io = new IntersectionObserver((es) => {
      formVisible = es[0].isIntersecting;
      onScroll();
    });
    if (cardRef.current) io.observe(cardRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // parallax dos círculos e inclinação da capa (só mouse, sem reduced-motion)
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const root = rootRef.current;
    const cover = coverRef.current;
    if (!root || !cover) return;
    const circs = Array.from(root.querySelectorAll<HTMLElement>("[data-par]"));
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      circs.forEach((c) => {
        const k = Number(c.dataset.par);
        c.style.transform = `translate(${x * k}px,${y * k}px)`;
      });
      cover.style.transform = `rotateY(${-14 + x * 16}deg) rotateX(${6 - y * 10}deg) rotateZ(-3deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const marqueeItems = (hidden: boolean) =>
    MARQUEE.map((m) => (
      <div className="mi" key={(hidden ? "b" : "a") + m.b + m.s} aria-hidden={hidden || undefined}>
        <b>{m.b}</b>
        <span>{m.t}</span>
        <em>{m.s}</em>
      </div>
    ));

  return (
    <div className="eb-lp" ref={rootRef}>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="South Media" />
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={OG_DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content="https://southmedia.com.br/og-southmedia.png" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={OG_TITLE} />
        <meta name="twitter:description" content={OG_DESCRIPTION} />
      </Helmet>

      <div className="eb-bar" ref={barRef} aria-hidden="true" />
      <Header scrolled={scrolled} />

      <main>
        {/* HERO */}
        <section className="hero dark" id="hero">
          <div className="circ p" data-par="18" aria-hidden="true" />
          <div className="circ o" data-par="-12" aria-hidden="true" />
          <div className="wrap grid">
            <div>
              <p className="eyebrow rv" style={d(0)}>Ebook gratuito · 2026</p>
              <h1 className="words">
                <Words>
                  Comprar espaço acabou. <span className="or">A era agora é comprar inteligência em tempo real.</span>
                </Words>
              </h1>
              <p className="lead rv" style={d(9)}>
                <b>O Futuro da Inteligência de Mídia</b> reúne, em 4 capítulos curtos, os dados que explicam para onde a atenção está indo e como orquestrar a mídia em um ecossistema fragmentado.
              </p>
              <div className="chips rv" style={d(11)}>
                <span className="chip"><b>4</b> capítulos</span>
                <span className="chip"><b>15</b> páginas</span>
                <span className="chip">Cada número com fonte: WARC, IAB Brasil, Kantar e mais</span>
              </div>
            </div>

            <div className="formcol rv r" style={d(4)} id="form">
              <div className="cover-wrap" aria-hidden="true">
                <div className="cover" ref={coverRef}>
                  <img className="cw" src={LOGO_BRANCA} alt="" width={949} height={200} />
                  <div className="cp" /><div className="co" />
                  <div className="ce">EBOOK · 2026</div>
                  <div className="ct">O Futuro da<br />Inteligência de Mídia</div>
                  <div className="cs">Dados, atenção e resultado real na nova era da mídia.</div>
                  <div className="cb">AdTech brasileira e independente · southmedia.com.br</div>
                  <div className="tag">GRÁTIS</div>
                </div>
              </div>
              <LeadCard cardRef={cardRef} />
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="orange marq" aria-label="Números do ebook">
          <div className="track">
            {marqueeItems(false)}
            {marqueeItems(true)}
          </div>
        </div>

        {/* CAPÍTULOS */}
        <section className="light sec" id="capitulos">
          <div className="wrap">
            <p className="eyebrow rv">O que você vai ler</p>
            <h2 className="t rv" style={d(1)}>Quatro capítulos, sem rodeio</h2>
            <div className="g4">
              {CHAPTERS.map((c, i) => (
                <article className="chap rv" style={d(i + 2)} key={c.n}>
                  <div className="n">{c.n}</div>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                  <span className="k">{c.k}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 01 */}
        <section className="dark sec" id="numeros">
          <div className="wrap">
            <p className="eyebrow rv">Um gostinho do capítulo 01</p>
            <h2 className="t rv" style={d(1)}>O mercado cresce. A atenção ficou cara.</h2>
            <div className="g3">
              <div className="stat rv" style={d(2)}>
                <div className="big"><Count to={10.7} dec={1} pre="+" suf="%" /></div>
                <p>de crescimento publicitário projetado para o Brasil em 2026. O maior entre os dez maiores mercados do mundo, puxado pela Copa.</p>
                <p className="src">WARC — Global Ad Forecast 2025/2026</p>
              </div>
              <div className="stat rv" style={d(3)}>
                <div className="big"><Count to={80} suf="%" /></div>
                <p>de alta do investimento digital no Brasil desde 2020: de R$ 23,7 bi para R$ 42,7 bi.</p>
                <p className="src">IAB Brasil / Ibope — Digital AdSpend 2026</p>
              </div>
              <div className="stat p rv s" style={d(5)}>
                <div className="big"><Count to={54.7} dec={1} suf="%" /></div>
                <p>do investimento digital global fica com Google, Meta e Amazon. <b style={{ color: "#fff" }}>Essa é a contradição.</b></p>
                <p className="src">WARC — Global Ad Forecast 2025/2026 (dado de 2025)</p>
              </div>
            </div>
            <p className="state words">
              <Words>
                Mais verba no mercado <span className="or">não significa mais resultado para a sua marca.</span>
              </Words>
            </p>
          </div>
        </section>

        {/* DOR */}
        <section className="light sec" id="dor">
          <div className="wrap">
            <p className="eyebrow rv">Capítulo 02</p>
            <h2 className="t rv" style={d(1)}>A pergunta de 1 milhão de reais</h2>
            <div className="pain">
              <div>
                <p className="lead rv" style={d(2)}>
                  TV conectada. Rua. Áudio. Varejo. Open web. Para estar em tudo ao mesmo tempo, uma marca opera <b>dezenas de plataformas</b>, cada uma com sua interface, sua métrica e seu relatório.
                </p>
                <div className="bars">
                  <p className="eyebrow rv" style={{ fontSize: 13, ...d(3) }}>O que as marcas apontam como crítico</p>
                  {[
                    { l: "Rastrear o usuário entre canais", v: 66 },
                    { l: "Queda na eficácia da segmentação", v: 57 },
                    { l: "Atribuição e mensuração confiáveis", v: 57 },
                  ].map((b, i) => (
                    <div className="brow rv" style={d(i + 4)} key={b.l}>
                      <div className="h"><span>{b.l}</span><b><Count to={b.v} suf="%" /></b></div>
                      <div className="t">
                        <div className="fill" style={{ ["--v" as string]: `${b.v}%`, ["--d" as string]: i + 1 } as CSSProperties} />
                      </div>
                    </div>
                  ))}
                  <p className="src rv" style={d(7)}>Fonte: Supermetrics, via eMarketer (2025)</p>
                </div>
              </div>
              <div className="cmo rv r" style={d(4)}>
                <p className="lb">A pergunta que todo CMO faz</p>
                <p className="q words" style={{ ["--base" as string]: "500ms" } as CSSProperties}>
                  <Words>“Onde, de fato, meu investimento está performando?”</Words>
                </p>
                <p>Poucos conseguem responder. O ebook mostra por quê, e o que muda o jogo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MAPA */}
        <section className="dark sec" id="mapa">
          <div className="wrap">
            <p className="eyebrow rv">Capítulo 03</p>
            <h2 className="t rv" style={d(1)}>O novo mapa da atenção</h2>
            <p className="lead rv" style={{ marginTop: 18, maxWidth: 860, ...d(2) }}>
              Mídia alternativa não é mídia menor. É o inventário fora do leilão saturado, onde a atenção chega com <b>intenção e contexto</b>.
            </p>
            <div className="tiles">
              <article className="tile rv" style={d(3)}>
                <span className="no">01</span><h3>CTV &amp; Streaming</h3><p className="tg">A convergência da década.</p>
                <div className="big"><Count to={64} suf="%" /></div>
                <p className="d">da população digital brasileira já usa CTV.</p>
                <p className="src">Kantar; IBOPE Media; Comverse (2025)</p>
              </article>
              <article className="tile rv" style={d(4)}>
                <span className="no">02</span><h3>Retail Media &amp; Drive to Store</h3><p className="tg">Onde a intenção encontra a visita.</p>
                <div className="big"><Count to={4.8} dec={1} pre="R$ " suf=" bi" /></div>
                <p className="d">em retail media no Brasil em 2025, +37% sobre 2024.</p>
                <p className="src">IAB Brasil — Digital AdSpend 2026</p>
              </article>
              <article className="tile rv" style={d(5)}>
                <span className="no">03</span><h3>DOOH programático</h3><p className="tg">A cidade virou inventário inteligente.</p>
                <div className="big"><Count to={30} pre="+" suf="%" /></div>
                <p className="d">de crescimento previsto da compra programática em DOOH e áudio em 2026.</p>
                <p className="src">Madison &amp; Wall (2026)</p>
              </article>
              <article className="tile rv" style={d(6)}>
                <span className="no">04</span><h3>Áudio digital</h3><p className="tg">A atenção exclusiva.</p>
                <div className="big">2º</div>
                <p className="d">maior mercado de podcast no Spotify na América Latina: o Brasil.</p>
                <p className="src">Spotify (2025)</p>
              </article>
            </div>
          </div>
        </section>

        {/* PARA QUEM */}
        <section className="light sec" id="para-quem">
          <div className="wrap">
            <p className="eyebrow rv">Para quem é</p>
            <h2 className="t rv" style={d(1)}>Feito para quem decide e defende a verba de mídia</h2>
            <div className="who">
              {WHO.map((w, i) => (
                <div className="rv" style={d(i + 2)} key={w.h}>
                  <h3>{w.h}</h3>
                  <p>{w.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="orange sec final" id="final">
          <div className="wrap">
            <p className="eyebrow rv">Próximo passo</p>
            <h2 className="words"><Words>A janela está aberta agora.</Words></h2>
            <p className="lead rv" style={d(5)}>
              O mercado brasileiro cresce acima da média global, e a atenção está migrando para canais que pedem orquestração. Comece pelos dados.
            </p>
            <a className="btn k rv" style={d(7)} href="#form">Quero o ebook grátis <span className="ar" aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>

      <footer className="dark">
        <div className="wrap">
          <div className="row">
            <div>
              <Link className="wm" href="/" aria-label="South Media"><Logo h={44} /></Link>
              <p style={{ marginTop: 8 }}>AdTech brasileira e independente.</p>
            </div>
            <div>
              <p><Link href="/">southmedia.com.br</Link></p>
              <p><a href="https://wa.me/5541996917857">WhatsApp (41) 99691-7857</a></p>
            </div>
            <div>
              <p><a href="https://www.instagram.com/southmedia.br/" target="_blank" rel="noopener noreferrer">Instagram @southmedia.br</a></p>
              <p><a href="https://www.linkedin.com/company/southmedia.br/" target="_blank" rel="noopener noreferrer">LinkedIn /company/southmedia.br</a></p>
            </div>
          </div>
          <p className="legal">
            © 2026 South Media Tech Ltda. · <Link href="/politica-privacidade" style={{ fontSize: 13 }}>Política de privacidade</Link>
          </p>
        </div>
      </footer>

      <div className={`eb-mcta${mctaShow ? " show" : ""}`}>
        <a className="btn o" href="#form" tabIndex={mctaShow ? 0 : -1}>
          Baixar o ebook grátis <span className="ar" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
