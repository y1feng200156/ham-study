import { CalculatorIcon, GithubLogoIcon } from "@phosphor-icons/react";
import i18next from "i18next";
import { lazy, memo, Suspense, useMemo, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ClientOnly } from "~/components/client-only";
import { LocaleLink } from "~/components/locale-link";
import { YagiSvgRenderer } from "~/components/tools/yagi-calculator/YagiSvgRenderer";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { demos as demosConfig, tools as toolsConfig } from "~/data/items";
import { calculateYagi } from "~/lib/yagi-calc";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/home";

export const links: Route.LinksFunction = () => {
  return [
    {
      rel: "preload",
      as: "image",
      href: "/images/demos/vertical-polarization.webp",
      fetchPriority: "high",
    },
  ];
};

// Lazy load heavy 3D components
const CircularPolarizationScene = lazy(
  () => import("~/components/circular-polarization-scene"),
);
const EllipticalPolarizationScene = lazy(
  () => import("~/components/elliptical-polarization-scene"),
);
const GPAntennaScene = lazy(() => import("~/components/gp-antenna-scene"));
const HorizontalPolarizationScene = lazy(
  () => import("~/components/horizontal-polarization-scene"),
);
const InvertedVAntennaScene = lazy(
  () => import("~/components/inverted-v-scene"),
);
const MoxonAntennaScene = lazy(
  () => import("~/components/moxon-antenna-scene"),
);
const EndFedAntennaScene = lazy(
  () => import("~/components/end-fed-antenna-scene"),
);
const PositiveVAntennaScene = lazy(
  () => import("~/components/positive-v-scene"),
);
const QuadAntennaScene = lazy(() => import("~/components/quad-antenna-scene"));
const VerticalPolarizationScene = lazy(
  () => import("~/components/vertical-polarization-scene"),
);
const YagiAntennaScene = lazy(() => import("~/components/yagi-antenna-scene"));
const LongWireAntennaScene = lazy(
  () => import("~/components/long-wire-antenna-scene"),
);
const DipoleAntennaScene = lazy(
  () => import("~/components/dipole-antenna-scene"),
);
const WindomAntennaScene = lazy(
  () => import("~/components/windom-antenna-scene"),
);
const HB9CVAntennaScene = lazy(
  () => import("~/components/hb9cv-antenna-scene"),
);
const MagneticLoopAntennaScene = lazy(
  () => import("~/components/magnetic-loop-antenna-scene"),
);
const ElectromagneticPropagationScene = lazy(
  () => import("~/components/electromagnetic-propagation-scene"),
);

export const meta = ({ loaderData }: Route.MetaArgs) => {
  const { title, description, keywords } = loaderData;
  return [
    { title },
    {
      name: "description",
      content: description,
    },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: description,
    },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "keywords",
      content: keywords,
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t = await i18next.use(initReactI18next).init({
    lng: locale,
    ns: "common",
    resources,
  });

  return {
    title: t("meta.home.title"),
    description: t("meta.home.description"),
    keywords: t("meta.home.keywords"),
  };
};

interface Demo {
  title: string;
  description: string;
  href: string;
  image: string;
  component: React.ComponentType<{
    isThumbnail?: boolean;
    isHovered?: boolean;
  }>;
}

interface Tool {
  title: string;
  description: string;
  href: string;
  preview: React.ReactNode;
}

function ToolCard({ tool, actionText }: { tool: Tool; actionText: string }) {
  return (
    <Card className="border ring-offset-4 ring-border/50 ring-offset-gray-50 hover:ring-offset-gray-100 transition duration-300 hover:shadow-lg group">
      <CardHeader className="flex-1">
        <CardTitle className="group-hover:text-primary transition-colors">
          {tool.title}
        </CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <LocaleLink to={tool.href} className="flex-1 flex flex-col gap-y-6">
          <div className="bg-slate-950 h-[200px] rounded-md overflow-hidden flex items-center justify-center relative">
            {tool.preview}
          </div>
        </LocaleLink>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <LocaleLink to={tool.href}>{actionText}</LocaleLink>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface DemoCardProps {
  demo: Demo;
  actionText: string;
  priority?: boolean;
}

const DemoCard = memo(function DemoCard({
  demo,
  actionText,
  priority = false,
}: DemoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="border ring-offset-4 ring-border/50 ring-offset-gray-50 hover:ring-offset-gray-100 transition duration-300 hover:shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex-1">
        <CardTitle className="group-hover:text-primary transition-colors">
          {demo.title}
        </CardTitle>
        <CardDescription>{demo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <LocaleLink to={demo.href} className="flex-1 flex flex-col gap-y-6">
          <div className="bg-slate-100 grid dark:bg-slate-800 h-[200px] rounded-md overflow-hidden text-muted-foreground text-sm relative isolate">
            {/* Layer 1 (Bottom): Static Image - Always rendered */}
            <img
              src={demo.image}
              alt={demo.title}
              className={`w-full z-1 relative h-[200px] object-cover  ${isHovered ? "opacity-0 transition-opacity delay-400 duration-300" : "opacity-100"}`}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : undefined}
            />

            {/* Layer 2 (Top): 3D Scene - Only if hovered */}
            {isHovered && (
              <div className="absolute inset-0 z-0 w-full h-[200px] grid">
                <ClientOnly fallback={null}>
                  <Suspense fallback={null}>
                    <demo.component isThumbnail={true} isHovered={isHovered} />
                  </Suspense>
                </ClientOnly>
              </div>
            )}
          </div>
        </LocaleLink>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <LocaleLink to={demo.href}>{actionText}</LocaleLink>
        </Button>
      </CardFooter>
    </Card>
  );
});

export default function Home() {
  const { t } = useTranslation();
  const demoItems: Demo[] = useMemo(() => {
    return demosConfig.map((item) => {
      const imageName = item.href.split("/").pop();
      const imagePath = `/images/demos/${imageName}.webp`;

      switch (item.i18nKey) {
        case "demoCards.vertical":
          return {
            title: t(`${item.i18nKey}.title` as never),
            description: t(`${item.i18nKey}.description` as never),
            href: item.href,
            image: imagePath,
            component: VerticalPolarizationScene,
          };
        case "demoCards.horizontal":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: HorizontalPolarizationScene,
          };
        case "demoCards.circular":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: CircularPolarizationScene,
          };
        case "demoCards.elliptical":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: EllipticalPolarizationScene,
          };
        case "demoCards.dipoleAntenna":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: DipoleAntennaScene,
          };
        case "demoCards.yagi":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: YagiAntennaScene,
          };
        case "demoCards.invertedV":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: InvertedVAntennaScene,
          };
        case "demoCards.gp":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: GPAntennaScene,
          };
        case "demoCards.positiveV":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: PositiveVAntennaScene,
          };
        case "demoCards.quad":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: QuadAntennaScene,
          };
        case "demoCards.moxon":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: MoxonAntennaScene,
          };
        case "demoCards.endFed":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: EndFedAntennaScene,
          };
        case "demoCards.longWireAntenna":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: LongWireAntennaScene,
          };
        case "demoCards.windomAntenna":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: WindomAntennaScene,
          };
        case "demoCards.hb9cv":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: HB9CVAntennaScene,
          };
        case "demoCards.magneticLoopAntenna":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: MagneticLoopAntennaScene,
          };
        case "demoCards.electromagneticPropagation":
          return {
            title: t(`${item.i18nKey}.title`),
            description: t(`${item.i18nKey}.description`),
            href: item.href,
            image: imagePath,
            component: ElectromagneticPropagationScene,
          };
        default:
          return {
            title: t(`${item.i18nKey}.title` as never),
            description: t(`${item.i18nKey}.description` as never),
            href: item.href,
            image: imagePath,
            component: VerticalPolarizationScene,
          };
      }
    });
  }, [t]);

  const toolItems: Tool[] = useMemo(() => {
    return toolsConfig.map((item) => {
      switch (item.i18nKey) {
        case "tools.yagiCalculator":
          return {
            title: t(`${item.i18nKey}.title` as never),
            description: t(`${item.i18nKey}.description` as never),
            href: item.href,
            preview: (
              <YagiSvgRenderer
                design={calculateYagi({
                  frequency: 435.0,
                  elementCount: 5,
                  elementDiameter: 4.0,
                  boomDiameter: 20.0,
                  boomShape: "round",
                  mountMethod: "bonded",
                  feedGap: 10,
                  drivenElementType: "folded",
                  spacingType: "dl6wu",
                  manualSpacing: 0,
                  manualBCFactor: 0.7,
                })}
                width={600}
                height={350}
                minimal={true}
              />
            ),
          };
        default:
          return {
            title: t(`${item.i18nKey}.title` as never),
            description: t(`${item.i18nKey}.description` as never),
            href: item.href,
            preview: null,
          };
      }
    });
  }, [t]);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="text-muted-foreground text-lg mb-6 max-w-[800px]">
        {t("description")}
      </p>

      <div className="mb-8 flex gap-4">
        <Button asChild variant="outline">
          <Link
            to="https://github.com/y1feng200156/ham-study"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <GithubLogoIcon size={20} />
            <span>{t("actions.github")}</span>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoItems.map((demo, index) => (
          <DemoCard
            key={demo.href}
            demo={demo}
            actionText={t("actions.viewDemo")}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CalculatorIcon className="w-8 h-8 text-primary" />
          {t("sections.tools")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolItems.map((tool) => (
            <ToolCard
              key={tool.href}
              tool={tool}
              actionText={t("actions.openTool")}
            />
          ))}
        </div>
      </div>

      {/* JSON-LD Structured Data for CollectionPage */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires this
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: t("title"),
            description: t("description"),
            url: "https://ham.charlesify.com/",
            hasPart: demoItems.map((demo) => ({
              "@type": "CreativeWork",
              name: demo.title,
              description: demo.description,
              url: `https://ham.charlesify.com${demo.href}`,
            })),
          }),
        }}
      />
    </div>
  );
}
