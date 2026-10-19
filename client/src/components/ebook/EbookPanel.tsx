import { useEffect, useState } from "react";
import { Link } from "wouter";
import "@/styles/ebook-popup.css";
import { Count } from "./motion";
import { useEbookForm } from "./useEbookForm";
import { LOGO_BRANCO } from "./EbookCover";

interface EbookPanelProps {
  /** true quando o painel está visível (dispara contadores). */
  active: boolean;
  /** Presente apenas no pop-up: mostra "Agora não" e fecha após o sucesso. */
  onClose?: () => void;
  /** Id base para os campos (evita duplicar ids se houver mais de um painel). */
  idPrefix: string;
  /** Chamado após o envio com sucesso. */
  onSuccess?: () => void;
}

/** Painel do ebook: gancho preto à esquerda + formulário branco à direita. */
export default function EbookPanel({ active, onClose, idPrefix, onSuccess }: EbookPanelProps) {
  const f = useEbookForm(onSuccess);
  const id = (n: string) => `${idPrefix}-${n}`;
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (f.status !== "success") return;
    const raf = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(raf);
  }, [f.status]);

  return (
    <>
      <div className="ebk-hook">
        <div className="ebk-c p" />
        <div className="ebk-c o" />
        <img
          className="ebk-logo ebk-st" style={{ ["--d" as string]: 0 }} src={LOGO_BRANCO} alt="South Media"
          width={142} height={30} loading="lazy" decoding="async"
        />
        <p className="ebk-eb ebk-st" style={{ ["--d" as string]: 0 }}>Ebook gratuito</p>
        <h2 className="ebk-head ebk-st" style={{ ["--d" as string]: 1 }} id={id("title")}>
          O dinheiro da mídia está <span>mudando de endereço.</span>
        </h2>
        <p className="ebk-s ebk-st" style={{ ["--d" as string]: 2 }}>E não está indo para o óbvio:</p>
        <ul className="ebk-stats">
          <li className="ebk-st" style={{ ["--d" as string]: 3 }}>
            <b><Count to={54.7} dec={1} suf="%" start={active} delay={550} duration={1200} /></b>
            <span>da verba digital do mundo disputa o mesmo leilão de Google, Meta e Amazon<em>WARC, 2025</em></span>
          </li>
          <li className="ebk-st" style={{ ["--d" as string]: 4 }}>
            <b><Count to={37} pre="+" suf="%" start={active} delay={670} duration={1200} /></b>
            <span>foi o crescimento do retail media no Brasil sobre 2024<em>IAB Brasil — Digital AdSpend 2026</em></span>
          </li>
          <li className="ebk-st" style={{ ["--d" as string]: 5 }}>
            <b><Count to={30} pre="+" suf="%" start={active} delay={790} duration={1200} /></b>
            <span>é a alta prevista da compra programática em DOOH e áudio em 2026<em>Madison &amp; Wall, 2026</em></span>
          </li>
        </ul>
        <p className="ebk-punch ebk-st" style={{ ["--d" as string]: 6 }}>
          O futuro da mídia é <span>programático.</span> Quem chega primeiro, compra melhor.
        </p>
      </div>

      <div className={`ebk-form${f.status === "success" ? " sent" : ""}`}>
        {f.status !== "success" ? (
          <form onSubmit={f.submit} noValidate>
            <p className="eb2 ebk-st" style={{ ["--d" as string]: 2 }}>O Futuro da Inteligência de Mídia</p>
            <h3 className="ebk-st" style={{ ["--d" as string]: 3 }}>Receba o ebook grátis no seu e&#8209;mail</h3>
            <p className="ebk-meta ebk-st" style={{ ["--d" as string]: 4 }}>4 capítulos · 15 páginas · cada número com fonte</p>
            <div className="ebk-f ebk-st" style={{ ["--d" as string]: 5 }}>
              <label htmlFor={id("email")}>E-mail corporativo</label>
              <input
                id={id("email")}
                type="email"
                autoComplete="email"
                placeholder="voce@empresa.com"
                required
                value={f.email}
                onChange={(e) => f.setEmail(e.target.value)}
                onBlur={f.onEmailBlur}
                className={f.emailErr ? "bad" : ""}
                aria-invalid={!!f.emailErr}
                aria-describedby={id("email-err")}
              />
              <p className="ebk-err" id={id("email-err")} aria-live="polite">{f.emailErr}</p>
            </div>
            <div className="ebk-row ebk-st" style={{ ["--d" as string]: 6 }}>
              <div className="ebk-f" style={{ marginTop: 4 }}>
                <label htmlFor={id("cargo")}>Cargo</label>
                <input
                  id={id("cargo")}
                  type="text"
                  autoComplete="organization-title"
                  placeholder="Seu cargo"
                  required
                  value={f.cargo}
                  onChange={(e) => f.setCargo(e.target.value)}
                  className={f.badCargo ? "bad" : ""}
                  aria-invalid={f.badCargo}
                />
              </div>
              <div className="ebk-f" style={{ marginTop: 4 }}>
                <label htmlFor={id("empresa")}>Empresa</label>
                <input
                  id={id("empresa")}
                  type="text"
                  autoComplete="organization"
                  placeholder="Empresa"
                  required
                  value={f.empresa}
                  onChange={(e) => f.setEmpresa(e.target.value)}
                  className={f.badEmpresa ? "bad" : ""}
                  aria-invalid={f.badEmpresa}
                />
              </div>
            </div>
            <label className="ebk-ok ebk-st" style={{ ["--d" as string]: 7 }}>
              <input type="checkbox" checked={f.consent} onChange={(e) => f.setConsent(e.target.checked)} />
              Autorizo a South Media a coletar meus dados e enviar novidades por e-mail. Posso cancelar a qualquer momento.
            </label>
            <button
              className="ebk-btn ebk-st"
              style={{ ["--d" as string]: 8 }}
              type="submit"
              disabled={!f.consent || f.status === "loading"}
            >
              <span>{f.status === "loading" ? "Enviando…" : "Quero o ebook grátis"}</span>{" "}
              <span className="ar" aria-hidden="true">→</span>
            </button>
            <p className="ebk-msg" aria-live="polite">{f.msg}</p>
            <p className="ebk-micro">Sem spam. O material chega direto no seu e-mail.</p>
            <Link href="/ebook" className="ebk-link" onClick={onClose}>Ver o que tem no ebook</Link>
            {onClose && (
              <button className="ebk-no" type="button" onClick={onClose}>Agora não</button>
            )}
          </form>
        ) : (
          <div className={`ebk-done live${drawn ? " go" : ""}`} role="status">
            <svg width="68" height="68" viewBox="0 0 72 72" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="36" cy="36" r="30" stroke="#7F31B8" />
              <path d="M23 37l9 9 17-19" stroke="#F45504" />
            </svg>
            <h3>Pronto! O ebook está a caminho.</h3>
            <p>Enviamos o material para o seu e-mail. Se não aparecer em alguns minutos, confira a caixa de promoções ou spam.</p>
          </div>
        )}
      </div>
    </>
  );
}
