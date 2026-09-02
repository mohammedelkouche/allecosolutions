"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";

const locales = ["fr", "es"] as const;
type Locale = (typeof locales)[number];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("languageSwitcher");
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!switcherRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  function switchLanguage(nextLocale: Locale) {
    const query = Array.from(new URLSearchParams(window.location.search)).reduce<
      Record<string, string | string[]>
    >((params, [key, value]) => {
      const currentValue = params[key];
      params[key] = currentValue
        ? Array.isArray(currentValue)
          ? [...currentValue, value]
          : [currentValue, value]
        : value;
      return params;
    }, {});

    router.replace({ pathname, query }, { locale: nextLocale });
    setIsOpen(false);
  }

  return (
    <div
      ref={switcherRef}
      className="relative"
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        suppressHydrationWarning
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={t("label")}
        className="inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-foreground outline-none transition-colors hover:bg-secondary"
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9s-1.1 6.6-3.3 9c-2.2-2.4-3.3-6.6-3.3-9S9.8 5.4 12 3Z" />
        </svg>
        <span className="text-xs">{locale.toUpperCase()}</span>
        <span aria-hidden="true" className="text-xs">{isOpen ? "▴" : "▾"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 w-36 rounded-md border border-border bg-white py-1 shadow-lg" role="menu">
          {locales.map((nextLocale) => (
            <button
              key={nextLocale}
              type="button"
              role="menuitem"
              aria-current={nextLocale === locale ? "true" : undefined}
              className="block w-full px-4 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground focus:bg-secondary focus:outline-none"
              onClick={() => switchLanguage(nextLocale)}
            >
              {t(nextLocale)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}