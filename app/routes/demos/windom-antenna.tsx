import type { TFunction } from "i18next";
import i18next from "i18next";
import { lazy, Suspense } from "react";
import { initReactI18next, Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { BlockMath, InlineMath } from "~/components/math";
import { ScientificCitation } from "~/components/scientific-citation";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/windom-antenna";

const WindomAntennaScene = lazy(
  () => import("~/components/windom-antenna-scene"),
);

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t: TFunction<["common", "demos"]> = await i18next
    .use(initReactI18next)
    .init({
      lng: locale,
      resources,
    });
  return {
    title: t("demos:windomAntenna.metaTitle"),
    description: t("demos:windomAntenna.metaDescription"),
    keywords: t("demos:windomAntenna.metaKeywords"),
  };
};

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const { title, description, keywords } = loaderData || {};
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

export default function WindomAntennaPage() {
  const { t } = useTranslation("demos");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t("windomAntenna.title")}</h1>
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
            <WindomAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          {/* Overview */}
          <h3>{t("windomAntenna.overviewTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.overview"}
              components={{ strong: <strong />, M: <InlineMath /> }}
            />
          </p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={"windomAntenna.structure"}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          {/* Principle / Why 1/3? */}
          <h3>{t("windomAntenna.principleTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.principleIntro"}
              components={{ strong: <strong /> }}
            />
          </p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={"windomAntenna.principlePoints.fundamental"}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={"windomAntenna.principlePoints.harmonics2"}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={"windomAntenna.principlePoints.harmonics4"}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.principleConclusion"}
              components={{ strong: <strong /> }}
            />
          </p>

          {/* Matching System */}
          <h3>{t("windomAntenna.matchingTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.matchingIntro"}
              components={{ strong: <strong />, M: <InlineMath /> }}
            />
          </p>
          <BlockMath math="\text{Balun Ratio} = \frac{Z_{antenna}}{Z_{cable}} = \frac{200\Omega}{50\Omega} = 4:1" />
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.matchingConclusion"}
              components={{ strong: <strong /> }}
            />
          </p>

          {/* Radiation Pattern */}
          <h3>{t("windomAntenna.patternTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.patternIntro"}
              components={{ strong: <strong /> }}
            />
          </p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={"windomAntenna.patternPoints.fundamental"}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={"windomAntenna.patternPoints.harmonic"}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          {/* Comparison Table */}
          <h3>{t("windomAntenna.comparisonTitle")}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr>
                  <th className="p-4 border-b dark:border-zinc-700 font-semibold">
                    {t("windomAntenna.tableHead.feature")}
                  </th>
                  <th className="p-4 border-b dark:border-zinc-700 font-semibold">
                    {t("windomAntenna.tableHead.dipole")}
                  </th>
                  <th className="p-4 border-b dark:border-zinc-700 font-semibold">
                    {t("windomAntenna.tableHead.windom")}
                  </th>
                  <th className="p-4 border-b dark:border-zinc-700 font-semibold">
                    {t("windomAntenna.tableHead.efhw")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-zinc-800">
                  <td className="p-4">{t("windomAntenna.tableRow.feedPos")}</td>
                  <td className="p-4">
                    {t("windomAntenna.tableCell.dipoleFeed")}
                  </td>
                  <td className="p-4 font-semibold text-primary">
                    {t("windomAntenna.tableCell.windomFeed")}
                  </td>
                  <td className="p-4">
                    {t("windomAntenna.tableCell.efhwFeed")}
                  </td>
                </tr>
                <tr className="border-b dark:border-zinc-800">
                  <td className="p-4">
                    {t("windomAntenna.tableRow.multiBand")}
                  </td>
                  <td className="p-4">
                    {t("windomAntenna.tableCell.dipoleBand")}
                  </td>
                  <td className="p-4 font-semibold text-primary">
                    {t("windomAntenna.tableCell.windomBand")}
                  </td>
                  <td className="p-4 font-semibold text-primary">
                    {t("windomAntenna.tableCell.efhwBand")}
                  </td>
                </tr>
                <tr className="border-b dark:border-zinc-800">
                  <td className="p-4">{t("windomAntenna.tableRow.match")}</td>
                  <td className="p-4">
                    {t("windomAntenna.tableCell.dipoleMatch")}
                  </td>
                  <td className="p-4 font-semibold text-primary">
                    {t("windomAntenna.tableCell.windomMatch")}
                  </td>
                  <td className="p-4 font-semibold text-primary">
                    {t("windomAntenna.tableCell.efhwMatch")}
                  </td>
                </tr>
                <tr className="border-b dark:border-zinc-800">
                  <td className="p-4">{t("windomAntenna.tableRow.ground")}</td>
                  <td className="p-4">
                    {t("windomAntenna.tableCell.dipoleGround")}
                  </td>
                  <td className="p-4">
                    {t("windomAntenna.tableCell.windomGround")}
                  </td>
                  <td className="p-4 font-semibold text-primary">
                    {t("windomAntenna.tableCell.efhwGround")}
                  </td>
                </tr>
                <tr>
                  <td className="p-4">{t("windomAntenna.tableRow.cons")}</td>
                  <td className="p-4">
                    {t("windomAntenna.tableCell.dipoleCons")}
                  </td>
                  <td className="p-4">
                    {t("windomAntenna.tableCell.windomCons")}
                  </td>
                  <td className="p-4">
                    {t("windomAntenna.tableCell.efhwCons")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.comparisonSummary"}
              components={{ strong: <strong /> }}
            />
          </p>

          {/* Misconception */}
          <h3>{t("windomAntenna.misconceptionTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.misconceptionIntro"}
              components={{ strong: <strong /> }}
            />
          </p>
          <h4>{t("windomAntenna.misconceptionPhysicsTitle")}</h4>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.misconceptionPhysics"}
              components={{ strong: <strong /> }}
            />
          </p>
          <h4>{t("windomAntenna.misconceptionFeedTitle")}</h4>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.misconceptionFeed"}
              components={{ strong: <strong /> }}
            />
          </p>
          <ul>
            <li>{t("windomAntenna.misconceptionFeedLow")}</li>
            <li>{t("windomAntenna.misconceptionFeedHigh")}</li>
            <li>{t("windomAntenna.misconceptionFeedMid")}</li>
          </ul>
          <p>
            <strong className="text-primary">
              {t("windomAntenna.misconceptionConclusion")}
            </strong>
          </p>
          <h4>{t("windomAntenna.misconceptionExTitle")}</h4>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.misconceptionEx"}
              components={{ strong: <strong /> }}
            />
          </p>

          {/* Polarization */}
          <h3>{t("windomAntenna.polarizationTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.polarizationIntro"}
              components={{ strong: <strong /> }}
            />
          </p>

          <h4>{t("windomAntenna.polarizationReason1Title")}</h4>
          <p>{t("windomAntenna.polarizationReason1")}</p>

          <h4>{t("windomAntenna.polarizationReason2Title")}</h4>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={"windomAntenna.polarizationReason2List.horizontal"}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={"windomAntenna.polarizationReason2List.invertedV"}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={"windomAntenna.polarizationReason2List.sloper"}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h4>{t("windomAntenna.polarizationExceptionTitle")}</h4>
          <p>
            <Trans
              ns="demos"
              i18nKey={"windomAntenna.polarizationException"}
              components={{ strong: <strong /> }}
            />
          </p>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <p className="mb-2">
                  <Trans
                    ns="demos"
                    i18nKey={"windomAntenna.physicsContent"}
                    components={{ strong: <strong /> }}
                  />
                </p>
              }
              citations={[
                {
                  id: "arrl-antenna-book",
                  text: "The ARRL Antenna Book. Chapter 6: Multiband Antennas.",
                },
                {
                  id: "w8ji-windom",
                  text: "W8JI. Windom Antenna and Off-Center Fed Dipoles.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
