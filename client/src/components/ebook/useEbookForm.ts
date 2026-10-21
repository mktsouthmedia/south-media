import { useState } from "react";
import { trackOpenAiEbookDownload } from "@/lib/openaiPixel";
import { SEND_ERROR_MSG, sendEbookLead, validateCorporateEmail } from "@/lib/ebookLead";

/** Estado e envio do formulário do ebook, compartilhado entre LP, pop-up e Home. */
export function useEbookForm(onSuccess?: () => void) {
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [badCargo, setBadCargo] = useState(false);
  const [badEmpresa, setBadEmpresa] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const checkEmail = () => {
    const err = validateCorporateEmail(email);
    setEmailErr(err);
    return !err;
  };

  const onEmailBlur = () => {
    if (email) checkEmail();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const okEmail = checkEmail();
    const okCargo = cargo.trim() !== "";
    const okEmpresa = empresa.trim() !== "";
    setBadCargo(!okCargo);
    setBadEmpresa(!okEmpresa);
    if (!okEmail || !okCargo || !okEmpresa) {
      if (okEmail) setMsg("Preencha cargo e empresa.");
      return;
    }
    setStatus("loading");
    const ok = await sendEbookLead({
      email: email.trim(),
      cargo: cargo.trim(),
      empresa: empresa.trim(),
    });
    if (ok) {
      setStatus("success");
      trackOpenAiEbookDownload();
      onSuccess?.();
    } else {
      setStatus("idle");
      setMsg(SEND_ERROR_MSG);
    }
  };

  return {
    email, setEmail, cargo, setCargo, empresa, setEmpresa, consent, setConsent,
    emailErr, badCargo, badEmpresa, msg, status, onEmailBlur, submit,
  };
}
