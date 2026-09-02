import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { navigation } from "@/lib/navigation";

const contactInfo = [
  { icon: Mail, text: "Directionalleco@gmail.com", href: "mailto:Direction alleco@gmail.com" },
  { icon: Phone, text: "05 22 22 43 72" },
  { icon: MapPin, text: "Address: 159 Bd de la Résistance, Casablanca 20250", isAddress: true },
];

export default async function Footer() {
  const tNav = await getTranslations("navigation");
  const tFooter = await getTranslations("footer");

  const servicesMenu = navigation.find((item) => item.labelKey === "services");
  const internationalMenu = navigation.find((item) => item.labelKey === "international");

  return (
    <footer className="mt-16 w-full border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/Logoalleco.png"
                alt={tFooter("companyName")}
                width={110}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {tFooter("companyDescription")}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">{tFooter("servicesTitle")}</p>
            <ul className="mt-4 space-y-3 text-sm">
              {servicesMenu?.children?.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground transition hover:text-foreground">
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">{tFooter("internationalTitle")}</p>
            <ul className="mt-4 space-y-3 text-sm">
              {internationalMenu?.children?.map((item) =>
                "children" in item && item.children.length ? (
                  // Groups with sub-pages (e.g. "Rénovation énergétique" → Espagne/France)
                  // are rendered as a non-clickable label with its sub-links indented,
                  // so the footer never links to an empty parent page.
                  <li key={item.href}>
                    <p className="font-medium text-foreground">{tNav(item.labelKey)}</p>
                    <ul className="mt-2 space-y-2 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="text-muted-foreground transition hover:text-foreground">
                            {tNav(child.labelKey)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="text-muted-foreground transition hover:text-foreground">
                      {tNav(item.labelKey)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">{tFooter("contactTitle")}</p>
            <ul className="mt-4 space-y-3 text-sm">
              {contactInfo.map(({ icon: Icon, text, isAddress, href }) => (
                <li key={text} className="flex items-start gap-2">
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {isAddress ? (
                    <address className="not-italic text-muted-foreground">{text}</address>
                  ) : href ? (
                    <a
                      href={href}
                      className="inline-block text-muted-foreground transition-transform duration-200 hover:scale-110 hover:text-foreground"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground sm:flex sm:justify-between sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {tFooter("companyName")}. {tFooter("rightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
