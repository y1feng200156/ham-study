import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const GPAntennaScene = lazy(() => import("~/components/gp-antenna-scene"));

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "GP天线 (Ground Plane Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示GP天线（Ground Plane）的垂直单极子结构、地网作用及辐射图。",
    },
    {
      property: "og:title",
      content: "GP天线 (Ground Plane Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示GP天线（Ground Plane）的垂直单极子结构、地网作用及辐射图。",
    },
    {
      name: "twitter:title",
      content: "GP天线 (Ground Plane Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示GP天线（Ground Plane）的垂直单极子结构、地网作用及辐射图。",
    },
    {
      name: "keywords",
      content:
        "GP天线, Ground Plane antenna, 垂直单极子, vertical monopole, 地网, radials, 1/4波长",
    },
  ];
};

export default function GPAntennaPage() {
  const { t } = useTranslation("demos");
  const gp = "gpAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${gp}.title`)}</h1>
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
            <GPAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t(`${gp}.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${gp}.artificialGround`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${gp}.takeoffAngle`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t("polarizationTitle")}</h3>
          <ul></ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">
                    <Trans
                      ns="demos"
                      i18nKey={`${gp}.physicsContent`}
                      components={{ strong: <strong /> }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${gp}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "stutzman",
                  text: "Stutzman, W. L., & Thiele, G. A. (2012). Antenna Theory and Design (3rd ed.). Wiley. Section 3.2: Monopole Antennas.",
                },
                {
                  id: "balanis-mono",
                  text: "Balanis, C. A. (2016). Antenna Theory. Section 4.7: Ground Plane Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
