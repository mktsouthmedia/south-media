import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import EbookPanel from "@/components/ebook/EbookPanel";

interface EbookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUCCESS_CLOSE_MS = 4500;

export default function EbookModal({ open, onOpenChange }: EbookModalProps) {
  const [location] = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // Na própria LP o pop-up nunca abre.
  const blocked = location === "/ebook" || location.startsWith("/ebook/");
  const active = open && !blocked;

  const handleClose = useCallback(() => {
    sessionStorage.setItem("ebookPopupShown", "true");
    onOpenChange(false);
  }, [onOpenChange]);

  // Entrada animada: monta fechado e abre no quadro seguinte.
  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // Esc, foco preso, rolagem travada e retorno do foco.
  useEffect(() => {
    if (!active) return;
    const lastFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>("button,input,a[href]") ?? []
      ).filter((el) => !(el as HTMLButtonElement).disabled && el.offsetParent !== null);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const t = setTimeout(() => {
      const input = dialogRef.current?.querySelector<HTMLInputElement>('input[type="email"]');
      if (input && window.matchMedia("(pointer: fine)").matches) input.focus();
      else dialogRef.current?.focus();
    }, 450);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocus?.focus?.();
    };
  }, [active, handleClose]);

  if (!active) return null;

  return (
    <div
      className={`ebk-scope ebk-overlay${visible ? " ebk-open" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="ebk"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ebk-modal-title"
        tabIndex={-1}
      >
        <button className="ebk-x" type="button" aria-label="Fechar" onClick={handleClose}>×</button>
        <EbookPanel
          active={visible}
          idPrefix="ebk-modal"
          onClose={handleClose}
          onSuccess={() => setTimeout(handleClose, SUCCESS_CLOSE_MS)}
        />
      </div>
    </div>
  );
}
