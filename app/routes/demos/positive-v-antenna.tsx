import { lazy, Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { getInstance } from "~/middleware/i18next";
import type { Route } from "./+types/positive-v-antenna";

const PositiveVAntennaScene = lazy(
  () => import("~/components/positive-v-scene"),
);

import { BlockMath } from "~/components/math";
import { ScientificCitation } from "~/components/scientific-citation";

export const loader = ({ context }: Route.LoaderArgs) => {
  const { t } = getInstance(context);
  return {
    title: t("demos:positiveVAntenna.metaTitle"),
    description: t("demos:positiveVAntenna.metaDescription"),
    keywords: t("demos:positiveVAntenna.metaKeywords"),
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

export default function PositiveVAntennaPage() {
  const { t } = useTranslation("demos");
  const pv = "positiveVAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${pv}.title`)}</h1>
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
            <PositiveVAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t(`${pv}.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${pv}.structure`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${pv}.rotatable`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t(`${pv}.theoryAnalysis`)}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${pv}.theoryContent`}
              components={{ strong: <strong /> }}
            />
          </p>

          <div className="my-6 space-y-4">
            <div>
              <p className="font-semibold mb-2">
                {t(`${pv}.impedanceMathLabel`)}:
              </p>
              <BlockMath math="Z_{in} \approx 50\Omega \quad (\text{at } 120^\circ)" />
            </div>
          </div>

          <h4>{t(`${pv}.comparisonTable.title`)}</h4>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  {(
                    t(`${pv}.comparisonTable.headers`, {
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
                  t(`${pv}.comparisonTable.rows`, {
                    returnObjects: true,
                  }) as Array<{
                    feature: string;
                    posV: string;
                    invV: string;
                  }>
                ).map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3 font-medium">{row.feature}</td>
                    <td className="px-4 py-3">{row.posV}</td>
                    <td className="px-4 py-3">{row.invV}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>{t(`${pv}.polarizationTitle`)}</h3>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">{t(`${pv}.physicsContent`)}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${pv}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "rotatable-dipole",
                  text: "Witt, F. J., AI1H. (2014). Broadband Rotatable Dipole. QST Magazine.",
                },
                {
                  id: "balanis-dipole",
                  text: "Balanis, C. A. Antenna Theory. Chapter 4: Linear Wire Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
