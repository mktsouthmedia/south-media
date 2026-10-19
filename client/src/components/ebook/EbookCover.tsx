import { forwardRef } from "react";
import "@/styles/ebook-cover.css";

export const LOGO_BRANCO = "/images/brand/southmedia-logo-horizontal-branco.png";

/** Capa do ebook feita em CSS, igual à da referência (sem imagem da capa). */
const EbookCover = forwardRef<HTMLDivElement, { className?: string }>(function EbookCover({ className = "" }, ref) {
  return (
    <div className={`ebcv ${className}`.trim()} ref={ref}>
      <img className="cw" src={LOGO_BRANCO} alt="" width={190} height={40} loading="lazy" decoding="async" />
      <div className="cp" /><div className="co" />
      <div className="ce">EBOOK · 2026</div>
      <div className="ct">O Futuro da<br />Inteligência de Mídia</div>
      <div className="cs">Dados, atenção e resultado real na nova era da mídia.</div>
      <div className="cb">AdTech brasileira e independente · southmedia.com.br</div>
      <div className="tag">GRÁTIS</div>
    </div>
  );
});

export default EbookCover;
