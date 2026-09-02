"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO: brancher l'envoi sur le formulaire Google Forms fourni par le client
// (ou un endpoint dédié). Pour l'instant la validation est purement client,
// puisqu'il n'y a pas de backend.
export function NewsletterForm() {
  const t = useTranslations("newsletter.form");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  const inputClassName =
    "h-12 w-full rounded-md border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    // suppressHydrationWarning: browser form extensions inject attributes
    // (e.g. `fdprocessedid`) into form controls before React hydrates, which
    // otherwise triggers an unavoidable hydration-mismatch warning.
    <form onSubmit={handleSubmit} noValidate suppressHydrationWarning className="w-full max-w-md">
      <label
        htmlFor="newsletter-email"
        className="mb-2 block text-sm font-medium text-white"
      >
        {t("emailLabel")}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          suppressHydrationWarning
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={
            status === "error" ? "newsletter-email-error" : undefined
          }
          placeholder={t("emailPlaceholder")}
          className={`${inputClassName} ${status === "error" ? "border-red-400 focus-visible:outline-red-400" : "border-border"}`}
        />
        <button
          type="submit"
          suppressHydrationWarning
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t("subscribeButton")}
        </button>
      </div>

      <div aria-live="polite" className="mt-3 text-sm">
        {status === "error" && (
          <p id="newsletter-email-error" className="text-red-300">
            {t("errorMessage")}
          </p>
        )}
        {status === "success" && (
          <p className="font-medium text-white">{t("successMessage")}</p>
        )}
      </div>
    </form>
  );
}