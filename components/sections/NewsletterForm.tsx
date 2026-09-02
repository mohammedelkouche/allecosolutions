"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Google Apps Script Web App that appends the email to the newsletter Google
// Sheet. Deployed with access "Anyone", so it can be called from the browser.
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx-i_GvcezaKvkKA-LCcv5YRZfNYKGR9KbLonpK1zxMA9lvUT-Yihj2uMz-1XGZeI7d/exec";

export function NewsletterForm() {
  const t = useTranslations("newsletter.form");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!emailPattern.test(trimmedEmail)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      // Apps Script doesn't answer CORS preflights, so send a simple request:
      // Content-Type text/plain (no preflight) + mode "no-cors" (fire and trust
      // the script to record the row). A network failure is the only detectable
      // error; if the script answers, we treat it as success.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
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
            if (status !== "idle" && status !== "loading") setStatus("idle");
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
          disabled={status === "loading"}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "..." : t("subscribeButton")}
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