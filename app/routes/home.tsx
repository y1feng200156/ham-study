import { CalculatorIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, type MetaFunction } from "react-router";
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
import { calculateYagi } from "~/lib/yagi-calc";

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

export const meta: MetaFunction = () => {
  return [
    { title: "业余无线电可视化" },
    {
      name: "description",
      content:
        "业余无线电天线可视化合集：包含垂直/水平/圆极化、八木、倒V、GP、正V、方框、莫克森等经典天线的3D极化与辐射演示。",
    },
    { property: "og:title", content: "业余无线电可视化" },
    {
      property: "og:description",
      content:
        "业余无线电天线可视化合集：包含垂直/水平/圆极化、八木、倒V、GP、正V、方框、莫克森等经典天线的3D极化与辐射演示。",
    },
    { name: "twitter:title", content: "业余无线电可视化" },
    {
      name: "twitter:description",
      content:
        "业余无线电天线可视化合集：包含垂直/水平/圆极化、八木、倒V、GP、正V、方框、莫克森等经典天线的3D极化与辐射演示。",
    },
    {
      name: "keywords",
      content:
        "业余无线电, 天线演示, 3D可视化, 垂直极化, 水平极化, 圆极化, 八木天线, GP天线, 倒V天线, 正V天线, 方框天线, 莫克森天线, ham radio demos, antenna visualization",
    },
  ];
};

interface Demo {
  title: string;
  description: string;
  href: string;
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

function DemoCard({ demo, actionText }: { demo: Demo; actionText: string }) {
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
          <div className="bg-slate-100 grid dark:bg-slate-800 h-[200px] rounded-md overflow-hidden text-muted-foreground text-sm relative">
            <ClientOnly
              fallback={
                <div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
              }
            >
              <Suspense
                fallback={
                  <div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
                }
              >
                <demo.component isThumbnail={true} isHovered={isHovered} />
              </Suspense>
            </ClientOnly>
            <div
              className={`absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-0" : "opacity-0"
              }`}
            />
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
}

export default function Home() {
  const { t } = useTranslation();
  const demos: Demo[] = [
    {
      title: t("demos.vertical.title"),
      description: t("demos.vertical.description"),
      href: "/demos/vertical-polarization",
      component: VerticalPolarizationScene,
    },
    {
      title: t("demos.horizontal.title"),
      description: t("demos.horizontal.description"),
      href: "/demos/horizontal-polarization",
      component: HorizontalPolarizationScene,
    },
    {
      title: t("demos.circular.title"),
      description: t("demos.circular.description"),
      href: "/demos/circular-polarization",
      component: CircularPolarizationScene,
    },
    {
      title: t("demos.elliptical.title"),
      description: t("demos.elliptical.description"),
      href: "/demos/elliptical-polarization",
      component: EllipticalPolarizationScene,
    },
    {
      title: t("demos.yagi.title"),
      description: t("demos.yagi.description"),
      href: "/demos/yagi-antenna",
      component: YagiAntennaScene,
    },
    {
      title: t("demos.invertedV.title"),
      description: t("demos.invertedV.description"),
      href: "/demos/inverted-v-antenna",
      component: InvertedVAntennaScene,
    },
    {
      title: t("demos.gp.title"),
      description: t("demos.gp.description"),
      href: "/demos/gp-antenna",
      component: GPAntennaScene,
    },
    {
      title: t("demos.positiveV.title"),
      description: t("demos.positiveV.description"),
      href: "/demos/positive-v-antenna",
      component: PositiveVAntennaScene,
    },
    {
      title: t("demos.quad.title"),
      description: t("demos.quad.description"),
      href: "/demos/quad-antenna",
      component: QuadAntennaScene,
    },
    {
      title: t("demos.moxon.title"),
      description: t("demos.moxon.description"),
      href: "/demos/moxon-antenna",
      component: MoxonAntennaScene,
    },
    {
      title: t("demos.endFed.title"),
      description: t("demos.endFed.description"),
      href: "/demos/end-fed-antenna",
      component: EndFedAntennaScene,
    },
  ];

  const tools: Tool[] = [
    {
      title: t("tools.yagiCalculator.title"),
      description: t("tools.yagiCalculator.description"),
      href: "/tools/yagi-calculator",
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
    },
  ];

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
        {demos.map((demo) => (
          <DemoCard
            key={demo.href}
            demo={demo}
            actionText={t("actions.viewDemo")}
          />
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CalculatorIcon className="w-8 h-8 text-primary" />
          {t("sections.tools")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
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
            hasPart: demos.map((demo) => ({
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
