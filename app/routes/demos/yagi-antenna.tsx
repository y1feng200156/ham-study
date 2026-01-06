import { lazy, Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { getInstance } from "~/middleware/i18next";
import { InlineMath } from "~/components/math";
import type { Route } from "./+types/yagi-antenna";

const YagiAntennaScene = lazy(() => import("~/components/yagi-antenna-scene"));

import { ScientificCitation } from "~/components/scientific-citation";

export const loader = ({ context }: Route.LoaderArgs) => {
  const { t } = getInstance(context);
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

          <h3>{t(`${yagi}.theoryTitle`)}</h3>

          {/* <p> element removed, content merged with previous header or implicit */}
          <p>
            <Trans
              ns="demos"
              i18nKey={`${yagi}.theorySection1.content`}
              components={{ strong: <strong /> }}
            />
          </p>

          <h4>{t(`${yagi}.theorySection2.title`)}</h4>
          <p>{t(`${yagi}.theorySection2.intro`)}</p>
          <ul>
            <li>
              <strong>{t(`${yagi}.theorySection2.drivenElement.title`)}</strong>
              <ul className="list-[circle] pl-5 mt-2">
                {(
                  t(`${yagi}.theorySection2.drivenElement.items`, {
                    returnObjects: true,
                  }) as string[]
                ).map((_item, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: Static content from translation
                  <li key={i}>
                    <Trans
                      ns="demos"
                      // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                      i18nKey={
                        `${yagi}.theorySection2.drivenElement.items.${i}` as any
                      }
                      components={{ strong: <strong />, M: <InlineMath /> }}
                    />
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <strong>{t(`${yagi}.theorySection2.reflector.title`)}</strong>
              <ul className="list-[circle] pl-5 mt-2">
                {(
                  t(`${yagi}.theorySection2.reflector.items`, {
                    returnObjects: true,
                  }) as string[]
                ).map((_item, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: Static content from translation
                  <li key={i}>
                    <Trans
                      ns="demos"
                      // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                      i18nKey={
                        `${yagi}.theorySection2.reflector.items.${i}` as any
                      }
                      components={{ strong: <strong />, M: <InlineMath /> }}
                    />
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <strong>{t(`${yagi}.theorySection2.director.title`)}</strong>
              <ul className="list-[circle] pl-5 mt-2">
                {(
                  t(`${yagi}.theorySection2.director.items`, {
                    returnObjects: true,
                  }) as string[]
                ).map((_item, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: Static content from translation
                  <li key={i}>
                    <Trans
                      ns="demos"
                      // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                      i18nKey={
                        `${yagi}.theorySection2.director.items.${i}` as any
                      }
                      components={{ strong: <strong />, M: <InlineMath /> }}
                    />
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <h4>{t(`${yagi}.theorySection3.title`)}</h4>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${yagi}.theorySection3.content`}
              components={{ strong: <strong /> }}
            />
          </p>
          <ul>
            {(
              t(`${yagi}.theorySection3.items`, {
                returnObjects: true,
              }) as string[]
            ).map((_item, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Static content from translation
              <li key={i}>
                <Trans
                  ns="demos"
                  // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                  i18nKey={`${yagi}.theorySection3.items.${i}` as any}
                  components={{ strong: <strong />, M: <InlineMath /> }}
                />
              </li>
            ))}
          </ul>

          <h4>{t(`${yagi}.theorySummaryTable.title`)}</h4>
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800">
                  {(
                    t(`${yagi}.theorySummaryTable.headers`, {
                      returnObjects: true,
                    }) as string[]
                  ).map((header, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: Static headers
                    <th
                      key={i}
                      className="border border-zinc-200 dark:border-zinc-700 p-2 text-left font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  t(`${yagi}.theorySummaryTable.rows`, {
                    returnObjects: true,
                  }) as any[]
                ).map((_row, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: Static table data
                  <tr
                    key={i}
                    className="even:bg-zinc-50 dark:even:bg-zinc-900/50"
                  >
                    <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                      <Trans
                        ns="demos"
                        // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                        i18nKey={
                          `${yagi}.theorySummaryTable.rows.${i}.type` as any
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
                        // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                        i18nKey={
                          `${yagi}.theorySummaryTable.rows.${i}.length` as any
                        }
                        components={{ M: <InlineMath /> }}
                      />
                    </td>
                    <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                      <Trans
                        ns="demos"
                        // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                        i18nKey={
                          `${yagi}.theorySummaryTable.rows.${i}.reactance` as any
                        }
                        components={{ M: <InlineMath /> }}
                      />
                    </td>
                    <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                      <Trans
                        ns="demos"
                        // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                        i18nKey={
                          `${yagi}.theorySummaryTable.rows.${i}.phase` as any
                        }
                        components={{ M: <InlineMath /> }}
                      />
                    </td>
                    <td className="border border-zinc-200 dark:border-zinc-700 p-2">
                      <Trans
                        ns="demos"
                        // biome-ignore lint/suspicious/noExplicitAny: Dynamic key
                        i18nKey={
                          `${yagi}.theorySummaryTable.rows.${i}.function` as any
                        }
                        components={{ M: <InlineMath /> }}
                      />
                    </td>
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
