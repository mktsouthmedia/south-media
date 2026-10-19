import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function formatBR(v: number, dec: number, pre: string, suf: string) {
  return pre + v.toFixed(dec).replace(".", ",") + suf;
}

interface CountProps {
  to: number;
  dec?: number;
  pre?: string;
  suf?: string;
  className?: string;
  /** Início controlado (pop-up). Se omitido, começa ao entrar na tela. */
  start?: boolean;
  delay?: number;
  duration?: number;
}

/** Número que conta de 0 até `to` no formato brasileiro (10,7%, R$ 4,8 bi). */
export function Count({ to, dec = 0, pre = "", suf = "", className, start, delay = 250, duration = 1500 }: CountProps) {
  const ref = useRef<HTMLElement>(null);
  const final = formatBR(to, dec, pre, suf);
  const [text, setText] = useState(final);
  const [visible, setVisible] = useState(false);
  const controlled = start !== undefined;
  const go = controlled ? start : visible;

  useEffect(() => {
    if (controlled) return;
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controlled]);

  useEffect(() => {
    if (!go || prefersReducedMotion()) {
      setText(final);
      return;
    }
    let raf = 0;
    let t0: number | null = null;
    setText(formatBR(0, dec, pre, suf));
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const t = Math.min(1, Math.max(0, (ts - t0 - delay) / duration));
      setText(formatBR(to * (1 - Math.pow(1 - t, 3)), dec, pre, suf));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [go]); // eslint-disable-line react-hooks/exhaustive-deps

  // Antes de entrar na tela mostra 0 (se animação ligada); sem animação, o valor final.
  const shown = !go && !prefersReducedMotion() ? formatBR(0, dec, pre, suf) : text;
  return (
    <span ref={ref} className={className} aria-label={final}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

/** Divide o texto em palavras que entram escalonadas (classe .w, acionada por .in no pai). */
export function Words({ children }: { children: ReactNode }) {
  let n = 0;
  const walk = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return node.split(/(\s+)/).filter(Boolean).map((t, k) =>
        /^\s+$/.test(t) ? (
          <Fragment key={k}>{t}</Fragment>
        ) : (
          <span key={k} className="w" style={{ ["--i" as string]: n++ }}>
            {t}
          </span>
        )
      );
    }
    if (Array.isArray(node)) return node.map((c, k) => <Fragment key={k}>{walk(c)}</Fragment>);
    if (node && typeof node === "object" && "props" in node) {
      const el = node as React.ReactElement<{ children?: ReactNode }>;
      return { ...el, props: { ...el.props, children: walk(el.props.children) } };
    }
    return node;
  };
  return <>{walk(children)}</>;
}

/** Adiciona a classe "in" aos elementos .rv / .words quando entram na tela. */
export function useReveal(root: React.RefObject<HTMLElement | null>, selector = ".rv,.words,.brow") {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      targets.forEach((t) => t.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    // herói entra já no carregamento
    requestAnimationFrame(() => el.querySelectorAll(".hero .rv,.hero .words").forEach((t) => t.classList.add("in")));
    return () => io.disconnect();
  }, [root, selector]);
}
