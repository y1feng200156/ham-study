import { lazy, Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { getInstance } from "~/middleware/i18next";
import type { Route } from "./+types/inverted-v-antenna";

const InvertedVAntennaScene = lazy(
  () => import("~/components/inverted-v-scene"),
);

import { BlockMath } from "~/components/math";
import { ScientificCitation } from "~/components/scientific-citation";

export const loader = ({ context }: Route.LoaderArgs) => {
  const { t } = getInstance(context);
  return {
    title: t("demos:invertedVAntenna.metaTitle"),
    description: t("demos:invertedVAntenna.metaDescription"),
    keywords: t("demos:invertedVAntenna.metaKeywords"),
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

export default function InvertedVAntennaPage() {
  const { t } = useTranslation("demos");
  const iv = "invertedVAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${iv}.title`)}</h1>
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
            <InvertedVAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t(`${iv}.about`)}</p>
          <h3>{t(`${iv}.theoryAnalysis`)}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${iv}.theoryContent`}
              components={{ strong: <strong /> }}
            />
          </p>

          <div className="my-6 space-y-4">
            <div>
              <p className="font-semibold mb-2">
                {t(`${iv}.formulaImpedance`)}:
              </p>
              <BlockMath math="Z_{in} \approx 50\Omega \quad (90^{\circ} < \theta < 120^{\circ})" />
            </div>
          </div>

          <h4>{t(`${iv}.comparisonTable.title`)}</h4>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  {(
                    t(`${iv}.comparisonTable.headers`, {
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
                  t(`${iv}.comparisonTable.rows`, {
                    returnObjects: true,
                  }) as Array<{
                    feature: string;
                    rigid: string;
                    inverted: string;
                  }>
                ).map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className="px-4 py-3">{row.rigid}</td>
                    <td className="px-4 py-3">{row.inverted}</td>
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
                  <p className="mb-2">{t(`${iv}.physicsContent`)}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${iv}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "arrl-wire",
                  text: "The ARRL Antenna Book. Chapter 6: Low-Frequency Antennas - The Inverted-V Dipole.",
                },
                {
                  id: "cebik",
                  text: "Cebik, L. B., W4RNL. (2000). The Inverted-V: Its Gain and Patterns.",
                  url: "http://www.antentop.org/w4rnl.001/v1.html",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
