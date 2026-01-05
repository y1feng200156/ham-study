import { ArrowLeftIcon, HouseIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default function DemosLayout() {
  const location = useLocation();
  const { t } = useTranslation();

  // Demo key mapping for translation lookup
  const demoKeyMap: Record<string, string> = {
    "vertical-polarization": "demos.vertical.title",
    "horizontal-polarization": "demos.horizontal.title",
    "circular-polarization": "demos.circular.title",
    "elliptical-polarization": "demos.elliptical.title",
    "yagi-antenna": "demos.yagi.title",
    "inverted-v-antenna": "demos.invertedV.title",
    "gp-antenna": "demos.gp.title",
    "positive-v-antenna": "demos.positiveV.title",
    "quad-antenna": "demos.quad.title",
    "moxon-antenna": "demos.moxon.title",
    "end-fed-antenna": "demos.endFed.title",
  };
  const toolKeyMap: Record<string, string> = {
    "yagi-calculator": "tools.yagiCalculator.title",
  };

  const currentPath = location.pathname.split("/").pop() || "";
  const translationKey = demoKeyMap[currentPath] || toolKeyMap[currentPath];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentName = translationKey
    ? (t as (key: string) => string)(translationKey)
    : currentPath;

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-8 w-8">
            <Link to="/">
              <ArrowLeftIcon className="h-4 w-4" weight="bold" />
              <span className="sr-only">{t("nav.back")}</span>
            </Link>
          </Button>

          <Separator orientation="vertical" />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <HouseIcon className="h-4 w-4" weight="bold" />
                    {t("nav.home")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      {/* JSON-LD Structured Data for BreadcrumbList */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires this
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: t("nav.home"),
                item: "https://ham.charlesify.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: currentName,
                item: `https://ham.charlesify.com/demos/${currentPath}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
