import { useState, useEffect, useCallback } from "react";

const COOKIE_CONSENT_KEY = "south-media-cookie-consent";
const COOKIE_PREFERENCES_KEY = "south-media-cookie-preferences";

export type CookiePreferences = {
  necessary: boolean; // sempre true
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function getStoredConsent(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return null;
}

function storeConsent(prefs: CookiePreferences) {
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
  localStorage.setItem(
    COOKIE_PREFERENCES_KEY,
    JSON.stringify({ ...prefs, timestamp: new Date().toISOString() })
  );
}

// Dispatch custom event so other parts of the app can react
function dispatchConsentEvent(prefs: CookiePreferences) {
  window.dispatchEvent(
    new CustomEvent("cookie-consent-update", { detail: prefs })
  );
}

export function getCookieConsent(): CookiePreferences | null {
  return getStoredConsent();
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    } else {
      dispatchConsentEvent(stored);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    storeConsent(allAccepted);
    dispatchConsentEvent(allAccepted);
    setVisible(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    const allRejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    storeConsent(allRejected);
    dispatchConsentEvent(allRejected);
    setVisible(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    storeConsent(preferences);
    dispatchConsentEvent(preferences);
    setVisible(false);
    setShowDetails(false);
  }, [preferences]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 pointer-events-auto"
        onClick={() => {}}
      />

      {/* Banner */}
      <div
        className="relative w-full max-w-3xl mx-4 mb-4 bg-black border border-[#2A2A2A] rounded-2xl shadow-2xl pointer-events-auto animate-[slideUp_0.4s_ease-out]"
        role="dialog"
        aria-label="Configurações de Cookies"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F45504] flex items-center justify-center flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="8" cy="10" r="1.5" fill="white" />
                <circle cx="15" cy="8" r="1" fill="white" />
                <circle cx="14" cy="14" r="1.5" fill="white" />
                <circle cx="9" cy="15" r="1" fill="white" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">
                Sua privacidade importa para nós
              </h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                Utilizamos cookies para melhorar sua experiência de navegação,
                personalizar conteúdo e analisar o tráfego do site. Em
                conformidade com a{" "}
                <span className="text-[#F45504] font-semibold">
                  Lei Geral de Proteção de Dados (LGPD)
                </span>
                , você pode escolher quais cookies deseja permitir.
              </p>
            </div>
          </div>

          {/* Detailed preferences */}
          {showDetails && (
            <div className="mb-5 space-y-3 border-t border-[#2A2A2A] pt-4">
              {/* Necessary */}
              <div className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
                <div>
                  <p className="text-white text-sm font-semibold">
                    Cookies Necessários
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Essenciais para o funcionamento do site. Não podem ser
                    desativados.
                  </p>
                </div>
                <div className="w-11 h-6 bg-[#7F31B8] rounded-full relative cursor-not-allowed opacity-70">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
                <div>
                  <p className="text-white text-sm font-semibold">
                    Cookies de Análise
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Nos ajudam a entender como os visitantes interagem com o
                    site (Google Analytics).
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPreferences((p) => ({ ...p, analytics: !p.analytics }))
                  }
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    preferences.analytics ? "bg-[#7F31B8]" : "bg-white/20"
                  }`}
                  aria-label="Ativar cookies de análise"
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                      preferences.analytics ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-3 bg-[#141414] rounded-lg">
                <div>
                  <p className="text-white text-sm font-semibold">
                    Cookies de Marketing
                  </p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Utilizados para rastrear visitantes e exibir anúncios
                    relevantes (Google Tag Manager).
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPreferences((p) => ({ ...p, marketing: !p.marketing }))
                  }
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    preferences.marketing ? "bg-[#7F31B8]" : "bg-white/20"
                  }`}
                  aria-label="Ativar cookies de marketing"
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                      preferences.marketing ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-5 py-2.5 bg-[#F45504] hover:bg-[#F45504]/85 text-white font-semibold rounded-lg text-sm transition-all"
            >
              Aceitar Todos
            </button>
            <button
              onClick={handleRejectAll}
              className="flex-1 px-5 py-2.5 bg-[#141414] hover:bg-white/15 text-white font-semibold rounded-lg text-sm transition-all"
            >
              Rejeitar Opcionais
            </button>
            <button
              onClick={() =>
                showDetails
                  ? handleSavePreferences()
                  : setShowDetails(true)
              }
              className="flex-1 px-5 py-2.5 border border-[#2A2A2A] hover:border-[#7F31B8] hover:bg-[#141414] text-white/70 font-semibold rounded-lg text-sm transition-all"
            >
              {showDetails ? "Salvar Preferências" : "Personalizar"}
            </button>
          </div>

          {/* Footer note */}
          <p className="text-white/50 text-xs mt-3 text-center">
            Ao continuar navegando, você concorda com nossa{" "}
            <a href="/politica-privacidade" className="text-white/50 underline hover:text-white/70">
              Política de Privacidade
            </a>
            . Você pode alterar suas preferências a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}
