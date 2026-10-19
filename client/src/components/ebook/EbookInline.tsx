import { useEffect, useRef, useState } from "react";
import EbookPanel from "./EbookPanel";

/** Mesmo painel do pop-up, embutido na página (seção do ebook da Home). */
export default function EbookInline() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ebk-scope ebk-inline${open ? " ebk-open" : ""}`}>
      <div className="ebk">
        <EbookPanel active={open} idPrefix="ebk-home" />
      </div>
    </div>
  );
}
