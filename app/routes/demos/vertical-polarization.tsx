import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const VerticalPolarizationScene = lazy(
  () => import("~/components/vertical-polarization-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "垂直极化 (Vertical Polarization) | 业余无线电可视化" },
    {
      name: "description",
      content: "3D演示垂直极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      property: "og:title",
      content: "垂直极化 (Vertical Polarization) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content: "3D演示垂直极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      name: "twitter:title",
      content: "垂直极化 (Vertical Polarization) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content: "3D演示垂直极化偶极子天线的电场传播与极化匹配原理。",
    },
    {
      name: "keywords",
      content:
        "垂直极化, vertical polarization, 偶极子, dipole, 垂直天线, vertical antenna, 极化损耗",
    },
  ];
};

export default function VerticalPolarizationPage() {
  const { t } = useTranslation("demos");
  const vp = "verticalPolarization";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${vp}.title`)}</h1>
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
            <VerticalPolarizationScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t(`${vp}.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${vp}.polarization`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${vp}.verticalDipole`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${vp}.propagation`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t("polarizationMatch")}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${vp}.vToV`}
                components={{ strong: <strong /> }}
              />
              <span className="text-green-600 font-bold dark:text-green-400">
                {" "}
                {t("circularPolarization.bestMatch")}
              </span>
              。{t(`${vp}.vToVNote`)}
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${vp}.vToH`}
                components={{ strong: <strong /> }}
              />
              <span className="text-red-600 font-bold dark:text-red-400">
                {" "}
                {t(`${vp}.crossPolarization`)}
              </span>
              。
              <Trans
                ns="demos"
                i18nKey={`${vp}.vToHNote`}
                components={{ strong: <strong /> }}
              />
              <br />
              <em>{t(`${vp}.crossPolNote`)}</em>
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${vp}.vToC`}
                components={{ strong: <strong /> }}
              />
              <span className="text-yellow-600 font-bold dark:text-yellow-400">
                {" "}
                {t("circularPolarization.loss3db")}
              </span>
              。{t(`${vp}.vToCNote`)}
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">{t(`${vp}.physicsContent`)}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${vp}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "balanis",
                  text: "Balanis, C. A. (2016). Antenna Theory: Analysis and Design (4th ed.). Wiley. pp. 170-172.",
                  url: "https://www.wiley.com/en-us/Antenna+Theory%3A+Analysis+and+Design%2C+4th+Edition-p-9781118642061",
                },
                {
                  id: "kraus",
                  text: "Kraus, J. D., & Marhefka, R. J. (2002). Antennas for All Applications (3rd ed.). McGraw-Hill. Ch. 5.",
                },
                {
                  id: "ieee",
                  text: "IEEE Standard Definitions of Terms for Antennas (IEEE Std 145-2013).",
                  url: "https://ieeexplore.ieee.org/document/6758443",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
