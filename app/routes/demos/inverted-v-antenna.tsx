import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const InvertedVAntennaScene = lazy(
  () => import("~/components/inverted-v-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "倒V天线 (Inverted V Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示倒V天线（Inverted-V）的结构与辐射特性，解释其阻抗特性与架设优势。",
    },
    {
      property: "og:title",
      content: "倒V天线 (Inverted V Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示倒V天线（Inverted-V）的结构与辐射特性，解释其阻抗特性与架设优势。",
    },
    {
      name: "twitter:title",
      content: "倒V天线 (Inverted V Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示倒V天线（Inverted-V）的结构与辐射特性，解释其阻抗特性与架设优势。",
    },
    {
      name: "keywords",
      content:
        "倒V天线, Inverted V antenna, 偶极子, dipole, 阻抗匹配, impedance matching, 便携天线",
    },
  ];
};

export default function InvertedVAntennaPage() {
  const { t } = useTranslation("demos");
  const iv = "invertedVAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${iv}.title`)}</h1>
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
            <InvertedVAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t(`${iv}.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${iv}.impedance`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${iv}.space`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t("polarizationTitle")}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${iv}.mixedPolarization`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${iv}.application`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">{t(`${iv}.physicsContent`)}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${iv}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "arrl-wire",
                  text: "The ARRL Antenna Book. Chapter 6: Low-Frequency Antennas - The Inverted-V Dipole.",
                },
                {
                  id: "cebik",
                  text: "Cebik, L. B., W4RNL. (2000). The Inverted-V: Its Gain and Patterns.",
                  url: "http://www.antentop.org/w4rnl.001/v1.html",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
