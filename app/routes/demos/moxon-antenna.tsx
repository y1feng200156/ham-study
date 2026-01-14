import type { TFunction } from "i18next";
import i18next from "i18next";
import { lazy, Suspense } from "react";
import { initReactI18next, Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { BlockMath, InlineMath } from "~/components/math";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/moxon-antenna";

const MoxonAntennaScene = lazy(
  () => import("~/components/moxon-antenna-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t: TFunction<["common", "demos"]> = await i18next
    .use(initReactI18next)
    .init({
      lng: locale,
      resources,
    });
  return {
    title: t("demos:moxonAntenna.metaTitle"),
    description: t("demos:moxonAntenna.metaDescription"),
    keywords: t("demos:moxonAntenna.metaKeywords"),
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

export default function MoxonAntennaPage() {
  const { t } = useTranslation("demos");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t("moxonAntenna.title")}</h1>
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
            <MoxonAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t("moxonAntenna.about")}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey="moxonAntenna.fbRatio"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="moxonAntenna.compact"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="moxonAntenna.bandwidth"
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t("moxonAntenna.applicationTitle")}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey="moxonAntenna.foxHunting"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="moxonAntenna.limitedSpace"
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h3>{t("moxonAntenna.theoryAnalysis")}</h3>

            <p>
              <Trans
                ns="demos"
                i18nKey="moxonAntenna.theoryContent"
                components={{ strong: <strong /> }}
              />
            </p>

            <div className="my-6 space-y-4">
              <div>
                <p className="font-semibold mb-2">
                  {t("moxonAntenna.formulaRadiation")}:
                </p>
                <BlockMath math="F(\theta) \approx \left( \frac{1 + \cos \theta}{2} \right)^A" />
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <Trans
                      ns="demos"
                      i18nKey="moxonAntenna.formulaAngle"
                      components={{ M: <InlineMath /> }}
                    />
                  </li>
                  <li>
                    <Trans
                      ns="demos"
                      i18nKey="moxonAntenna.formulaShapeFactor"
                      components={{ M: <InlineMath /> }}
                    />
                  </li>
                </ul>
              </div>
            </div>

            <h4>{t("moxonAntenna.theorySummaryTable.title")}</h4>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    {Object.entries(
                      t("moxonAntenna.theorySummaryTable.headers", {
                        returnObjects: true,
                      }) as string[],
                    ).map(([key, header]) => (
                      <th
                        key={key}
                        className="border border-zinc-200 dark:border-zinc-700 p-2 text-left font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(
                    t("moxonAntenna.theorySummaryTable.rows", {
                      returnObjects: true,
                    }),
                  ).map(([key]) => (
                    <tr
                      key={key}
                      className="even:bg-zinc-50 dark:even:bg-zinc-900/50"
                    >
                      <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                        <Trans
                          ns="demos"
                          i18nKey={
                            `moxonAntenna.theorySummaryTable.rows.${key}.feature` as never
                          }
                          components={{
                            strong: <strong />,
                            M: <InlineMath />,
                          }}
                        />
                      </td>
                      <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                        <Trans
                          ns="demos"
                          i18nKey={
                            `moxonAntenna.theorySummaryTable.rows.${key}.moxon` as never
                          }
                          components={{
                            strong: <strong />,
                            M: <InlineMath />,
                          }}
                        />
                      </td>
                      <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                        <Trans
                          ns="demos"
                          i18nKey={
                            `moxonAntenna.theorySummaryTable.rows.${key}.yagi` as never
                          }
                          components={{
                            strong: <strong />,
                            M: <InlineMath />,
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">{t("moxonAntenna.physicsContent")}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t("moxonAntenna.physicsQuote")}
                  </p>
                </>
              }
              citations={[
                {
                  id: "moxon-book",
                  text: "Moxon, L. A., G6XN. (1993). HF Antennas for All Locations. RSGB. Chapter 6.",
                },
                {
                  id: "cebik-moxon",
                  text: "Cebik, L. B., W4RNL. The Moxon Rectangle: A Review.",
                  url: "http://www.antentop.org/w4rnl.001/moxon1.html",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
