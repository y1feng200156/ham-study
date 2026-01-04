import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const HorizontalPolarizationScene = lazy(
  () => import("~/components/horizontal-polarization-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "水平极化 (Horizontal Polarization) | 业余无线电可视化" },
    {
      name: "description",
      content: "3D演示水平极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      property: "og:title",
      content: "水平极化 (Horizontal Polarization) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content: "3D演示水平极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      name: "twitter:title",
      content: "水平极化 (Horizontal Polarization) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content: "3D演示水平极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      name: "keywords",
      content:
        "水平极化, horizontal polarization, 偶极子, dipole, 水平天线, horizontal antenna, 极化损耗",
    },
  ];
};

export default function HorizontalPolarizationPage() {
  const { t } = useTranslation("demos");
  const hp = "horizontalPolarization";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${hp}.title`)}</h1>
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
            <HorizontalPolarizationScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t(`${hp}.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${hp}.polarization`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${hp}.horizontalDipole`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${hp}.propagation`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t("polarizationMatch")}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${hp}.hToH`}
                components={{ strong: <strong /> }}
              />
              <span className="text-green-600 font-bold dark:text-green-400">
                {" "}
                {t("circularPolarization.bestMatch")}
              </span>
              。{t(`${hp}.hToHNote`)}
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${hp}.hToV`}
                components={{ strong: <strong /> }}
              />
              <span className="text-red-600 font-bold dark:text-red-400">
                {" "}
                {t("verticalPolarization.crossPolarization")}
              </span>
              。
              <Trans
                ns="demos"
                i18nKey={`${hp}.hToVNote`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">{t(`${hp}.physicsContent`)}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${hp}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "arrl-handbook",
                  text: "Silver, H. W. (Ed.). (2023). The ARRL Handbook for Radio Communications. Chapter 21: Antennas.",
                },
                {
                  id: "itu-r",
                  text: "ITU-R P.372-14: Radio noise.",
                  url: "https://www.itu.int/rec/R-REC-P.372/en",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
