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
    const supportedLocales = ["zh", "zh-HK", "en-US"];
    const segments = location.pathname.split("/").filter(Boolean);

    // Check if the first segment is a supported locale
    if (segments.length > 0 && supportedLocales.includes(segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    return `/${segments.join("/")}${location.search}`;
  };

  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-50 sticky top-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Title */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <title>Ham Radio Visualization Logo</title>
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
              <circle cx="12" cy="12" r="2" />
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
              <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
            </svg>
          </div>
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
