import type { TFunction } from "i18next";
import i18next from "i18next";
import { lazy, Suspense } from "react";
import { initReactI18next, Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { BlockMath, InlineMath } from "~/components/math";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/yagi-antenna";

const YagiAntennaScene = lazy(() => import("~/components/yagi-antenna-scene"));

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
    title: t("demos:yagiAntenna.metaTitle"),
    description: t("demos:yagiAntenna.metaDescription"),
    keywords: t("demos:yagiAntenna.metaKeywords"),
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

export default function YagiAntennaPage() {
  const { t } = useTranslation("demos");
  const yagi = "yagiAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${yagi}.title`)}</h1>
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
            <YagiAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${yagi}.about`}
              components={{ strong: <strong /> }}
            />
          </p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${yagi}.principle`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${yagi}.gain`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${yagi}.application`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t(`${yagi}.polarizationTitle`)}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${yagi}.polarizationMatch`}
                components={{ strong: <strong /> }}
              />
              <br />
              {t(`${yagi}.polarizationNote`)}
            </li>
          </ul>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h3>{t(`${yagi}.theoryAnalysis`)}</h3>

            <p>
              <Trans
                ns="demos"
                i18nKey={`${yagi}.theoryContent`}
                components={{ strong: <strong /> }}
              />
            </p>

            <div className="my-6 space-y-4">
              <div>
                <p className="font-semibold mb-2">
                  {t(`${yagi}.formulaDriven`)}:
                </p>
                <BlockMath math="L_{DE} \approx 0.48\lambda" />
              </div>
              <div>
                <p className="font-semibold mb-2">
                  {t(`${yagi}.formulaReflector`)}:
                </p>
                <BlockMath math="L_{Ref} > L_{DE} \quad (L_{Ref} \approx 1.05 \cdot \frac{\lambda}{2})" />
              </div>
              <div>
                <p className="font-semibold mb-2">
                  {t(`${yagi}.formulaDirector`)}:
                </p>
                <BlockMath math="L_{Dir} < L_{DE} \quad (L_{Dir} \approx 0.95 \cdot \frac{\lambda}{2})" />
              </div>
            </div>

            <h4>{t(`${yagi}.theorySummaryTable.title`)}</h4>
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800">
                    {Object.entries(
                      t(`${yagi}.theorySummaryTable.headers`, {
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
                    t(`${yagi}.theorySummaryTable.rows`, {
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
                            // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                            `${yagi}.theorySummaryTable.rows.${key}.type` as any
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
                            // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                            `${yagi}.theorySummaryTable.rows.${key}.length` as any
                          }
                          components={{ M: <InlineMath /> }}
                        />
                      </td>
                      <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                        <Trans
                          ns="demos"
                          i18nKey={
                            // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                            `${yagi}.theorySummaryTable.rows.${key}.reactance` as any
                          }
                          components={{ M: <InlineMath /> }}
                        />
                      </td>
                      <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                        <Trans
                          ns="demos"
                          i18nKey={
                            // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                            `${yagi}.theorySummaryTable.rows.${key}.phase` as any
                          }
                          components={{ M: <InlineMath /> }}
                        />
                      </td>
                      <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                        <Trans
                          ns="demos"
                          i18nKey={
                            // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                            `${yagi}.theorySummaryTable.rows.${key}.function` as any
                          }
                          components={{ M: <InlineMath /> }}
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
                  <p className="mb-2">
                    <Trans
                      ns="demos"
                      i18nKey={`${yagi}.physicsContent`}
                      components={{ strong: <strong /> }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${yagi}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "yagi-uda",
                  text: "Yagi, H., & Uda, S. (1926). Projector of the Sharpest Beam of Electric Waves. Proceedings of the Imperial Academy, 2(2), 49-52.",
                },
                {
                  id: "arrl-yagi",
                  text: "The ARRL Antenna Book. Chapter 11: HF Yagi Arrays.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
