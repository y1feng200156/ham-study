import { TranslateIcon } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function Header() {
  const { t, i18n } = useTranslation("common");
  const location = useLocation();

  const languages = [
    { code: "zh", label: "简体中文" },
    { code: "zh-HK", label: "繁體中文" },
    { code: "en-US", label: "English" },
  ];

  const handleLanguageChange = (newLang: string) => {
    const prefixes = ["zh-HK", "en-US"];
    const segments = location.pathname.split("/").filter(Boolean);
    const hasPrefix = segments.length > 0 && prefixes.includes(segments[0]);

    if (newLang === "zh") {
      // Switching to default (Root)
      if (hasPrefix) {
        segments.shift(); // Remove the prefix (e.g. /en-US/foo -> /foo)
      }
      // If no prefix, we are already at root-based path or generic path, just use it.
    } else {
      // Switching to a prefixed language
      if (hasPrefix) {
        segments[0] = newLang; // Replace existing prefix
      } else {
        segments.unshift(newLang); // Add new prefix
      }
    }
    return `/${segments.join("/")}${location.search}`;
  };

  // Determine home link
  const prefixes = ["zh-HK", "en-US"];
  const segments = location.pathname.split("/").filter(Boolean);
  const currentPrefix =
    segments.length > 0 && prefixes.includes(segments[0]) ? segments[0] : "";
  const homeLink = currentPrefix ? `/${currentPrefix}` : "/";

  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-50 sticky top-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Title */}
        <Link to={homeLink} className="flex items-center gap-2 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            className="w-10 h-10 transform transition-transform duration-300 group-hover:scale-105"
          >
            <defs>
              <linearGradient
                id="bg-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient
                id="logo-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <title>Ham Radio Visualization Logo</title>
            <rect
              x="0.5"
              y="0.5"
              width="39"
              height="39"
              rx="10"
              fill="url(#bg-gradient)"
              stroke="currentColor"
              className="text-black/5 dark:text-white/10"
            />
            <g transform="translate(8 8)">
              <path
                d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"
                stroke="url(#logo-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-100"
              />
              <path
                d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"
                stroke="url(#logo-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              />
              <circle cx="12" cy="12" r="2.5" fill="url(#logo-gradient)" />
              <path
                d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"
                stroke="url(#logo-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              />
              <path
                d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"
                stroke="url(#logo-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-100"
              />
            </g>
          </svg>
          <span className="font-bold text-lg hidden md:block">
            {t("title")}
          </span>
          <span className="font-bold text-lg md:hidden">HamVis</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9"
              >
                <TranslateIcon size={20} weight="duotone" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} asChild>
                  <Link
                    to={handleLanguageChange(lang.code)}
                    className={`flex items-center justify-between cursor-pointer ${
                      i18n.language === lang.code
                        ? "bg-accent text-accent-foreground font-medium"
                        : ""
                    }`}
                  >
                    <span>{lang.label}</span>
                    {i18n.language === lang.code && (
                      <span className="w-2 h-2 rounded-full bg-primary ml-2" />
                    )}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
