import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const EndFedAntennaScene = lazy(
  () => import("~/components/end-fed-antenna-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "端馈半波天线 (End-Fed Half Wave) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示端馈天线（EFHW）的便携性与多波段谐振特性，展示49:1阻抗变换器原理。",
    },
    {
      property: "og:title",
      content: "端馈半波天线 (End-Fed Half Wave) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示端馈天线（EFHW）的便携性与多波段谐振特性，展示49:1阻抗变换器原理。",
    },
    {
      name: "twitter:title",
      content: "端馈半波天线 (End-Fed Half Wave) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示端馈天线（EFHW）的便携性与多波段谐振特性，展示49:1阻抗变换器原理。",
    },
    {
      name: "keywords",
      content:
        "端馈天线, EFHW, End-Fed Half Wave, 49:1 balun, 便携天线, portable antenna, 多波段天线",
    },
  ];
};

export default function EndFedAntennaPage() {
  const { t } = useTranslation("demos");
  const ef = "endFedAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${ef}.title`)}</h1>
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
            <EndFedAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t(`${ef}.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${ef}.impedance`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${ef}.structure`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${ef}.multiband`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t(`${ef}.polarizationTitle`)}</h3>
          <ul></ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">
                    <Trans
                      ns="demos"
                      i18nKey={`${ef}.physicsContent`}
                      components={{ strong: <strong /> }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${ef}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "hallas",
                  text: "Hallas, J., W1ZR. (2012). The End-Fed Half-Wave Antenna. QST Magazine.",
                },
                {
                  id: "yaeger",
                  text: "Yager, A. (2010). Driven Elements: The End-Fed Half-Wave. QEX.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
