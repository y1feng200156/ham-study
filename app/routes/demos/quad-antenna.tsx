import type { TFunction } from "i18next";
import i18next from "i18next";
import { lazy, Suspense } from "react";
import { initReactI18next, Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { BlockMath, InlineMath } from "~/components/math";
import { ScientificCitation } from "~/components/scientific-citation";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/quad-antenna";

const QuadAntennaScene = lazy(() => import("~/components/quad-antenna-scene"));

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t: TFunction<["common", "demos"]> = await i18next
    .use(initReactI18next)
    .init({
      lng: locale,
      resources,
    });
  return {
    title: t("demos:quadAntenna.metaTitle"),
    description: t("demos:quadAntenna.metaDescription"),
    keywords: t("demos:quadAntenna.metaKeywords"),
  };
};

export const meta = ({ loaderData }: Route.MetaArgs) => {
  const { title, description, keywords } = loaderData;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "keywords", content: keywords },
  ];
};

export default function QuadAntennaPage() {
  const { t } = useTranslation("demos");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t("quadAntenna.title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col gap-6">
        <ClientOnly
          fallback={
            <div className="h-[450px] md:h-[600px] w-full flex items-center justify-center bg-slate-100 rounded-lg">
              {t("loading")}
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="h-[450px] md:h-[600px] w-full flex items-center justify-center bg-slate-100 rounded-lg">
                {t("loading")}
              </div>
            }
          >
            <QuadAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t("quadAntenna.about")}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey="quadAntenna.highGain"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="quadAntenna.lowNoise"
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t("quadAntenna.theoryAnalysis")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey="quadAntenna.theoryContent"
              components={{ strong: <strong />, M: <InlineMath /> }}
            />
          </p>

          <div className="my-6 space-y-4">
            <div>
              <p className="font-semibold mb-2">
                {t("quadAntenna.formulaLoopLength")}:
              </p>
              <BlockMath math="L_{loop} \approx 1.005\lambda" />
            </div>
            <div>
              <p className="font-semibold mb-2">
                {t("quadAntenna.formulaImpedance")}:
              </p>
              <BlockMath math="Z_{in} \approx 100\Omega" />
            </div>
          </div>

          <h4>{t("quadAntenna.comparisonTable.title")}</h4>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  {(
                    t("quadAntenna.comparisonTable.headers", {
                      returnObjects: true,
                    }) as string[]
                  ).map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {(
                  t("quadAntenna.comparisonTable.rows", {
                    returnObjects: true,
                  }) as Array<{
                    feature: string;
                    small: string;
                    full: string;
                  }>
                ).map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className="px-4 py-3">{row.small}</td>
                    <td className="px-4 py-3">{row.full}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">{t("quadAntenna.physicsContent")}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t("quadAntenna.physicsQuote")}
                  </p>
                </>
              }
              citations={[
                {
                  id: "w9lzx",
                  text: "Moore, C. C., W9LZX. (1947). The Quad Antenna.",
                },
                {
                  id: "cubical-quad",
                  text: "Orr, W. I., W6SAI. (1959). All About Cubical Quad Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
