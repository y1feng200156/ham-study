import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const MoxonAntennaScene = lazy(
  () => import("~/components/moxon-antenna-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "莫克森天线 (Moxon Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示莫克森天线（Moxon Rectangle）的紧凑结构，展示其高前后比和卓越的指向性。",
    },
    {
      property: "og:title",
      content: "莫克森天线 (Moxon Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示莫克森天线（Moxon Rectangle）的紧凑结构，展示其高前后比和卓越的指向性。",
    },
    {
      name: "twitter:title",
      content: "莫克森天线 (Moxon Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示莫克森天线（Moxon Rectangle）的紧凑结构，展示其高前后比和卓越的指向性。",
    },
    {
      name: "keywords",
      content:
        "莫克森天线, Moxon antenna, 长方形天线, 矩形天线, 高前后比, high F/B ratio",
    },
  ];
};

export default function MoxonAntennaPage() {
  const { t } = useTranslation("demos");
  const mx = "moxonAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${mx}.title`)}</h1>
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
          <p>{t(`${mx}.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${mx}.fbRatio`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${mx}.compact`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${mx}.bandwidth`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t(`${mx}.applicationTitle`)}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${mx}.foxHunting`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${mx}.limitedSpace`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">{t(`${mx}.physicsContent`)}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${mx}.physicsQuote`)}
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
