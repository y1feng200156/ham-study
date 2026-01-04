import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const CircularPolarizationScene = lazy(
  () => import("~/components/circular-polarization-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "圆极化 (Circular Polarization) | 业余无线电可视化" },
    {
      name: "description",
      content: "3D演示圆极化电波的传播特性，包括右旋(RHCP)和左旋(LHCP)。",
    },
    {
      property: "og:title",
      content: "圆极化 (Circular Polarization) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content: "3D演示圆极化电波的传播特性，包括右旋(RHCP)和左旋(LHCP)。",
    },
    {
      name: "twitter:title",
      content: "圆极化 (Circular Polarization) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content: "3D演示圆极化电波的传播特性，包括右旋(RHCP)和左旋(LHCP)。",
    },
    {
      name: "keywords",
      content:
        "圆极化, circular polarization, RHCP, LHCP, 螺旋天线, helical antenna, 卫星通信, satellite communication",
    },
  ];
};

export default function CircularPolarizationPage() {
  const { t } = useTranslation("demos");
  const cp = "circularPolarization";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${cp}.title`)}</h1>
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
            <CircularPolarizationScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${cp}.about`}
              components={{ b: <b /> }}
            />
          </p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${cp}.rhcp`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${cp}.lhcp`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${cp}.application`}
                components={{ strong: <strong />, b: <b /> }}
              />
            </li>
          </ul>

          <h3>{t("polarizationMatch")}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${cp}.matchRhcpToRhcp`}
                components={{ strong: <strong /> }}
              />
              <span className="text-green-600 font-bold dark:text-green-400">
                {" "}
                {t(`${cp}.bestMatch`)}
              </span>
              。
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${cp}.matchRhcpToLhcp`}
                components={{ strong: <strong /> }}
              />
              <span className="text-red-600 font-bold dark:text-red-400">
                {" "}
                {t(`${cp}.highLoss`)}
              </span>
              。 {t(`${cp}.rhcpToLhcpNote`)}
              <br />
              <em>{t(`${cp}.reflectionNote`)}</em>
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${cp}.matchCircularToLinear`}
                components={{ strong: <strong /> }}
              />
              <span className="text-yellow-600 font-bold dark:text-yellow-400">
                {" "}
                {t(`${cp}.loss3db`)}
              </span>
              。 {t(`${cp}.circularToLinearNote`)}
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">
                    <Trans
                      ns="demos"
                      i18nKey={`${cp}.physicsContent`}
                      components={{ strong: <strong /> }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${cp}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "kraus-helix",
                  text: "Kraus, J. D. (1947). Helical Beam Antennas. Electronics, 20, 109-111.",
                },
                {
                  id: "balanis-helix",
                  text: "Balanis, C. A. (2016). Antenna Theory: Analysis and Design. Wiley. Chapter 10: Traveling Wave and Broadband Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
