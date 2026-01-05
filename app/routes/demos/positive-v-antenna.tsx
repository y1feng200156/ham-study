import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const PositiveVAntennaScene = lazy(
  () => import("~/components/positive-v-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "正V天线 (Positive V Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示正V天线（Positive V）的结构特点，展示为何它是受限空间下理想的楼顶天线。",
    },
    {
      property: "og:title",
      content: "正V天线 (Positive V Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示正V天线（Positive V）的结构特点，展示为何它是受限空间下理想的楼顶天线。",
    },
    {
      name: "twitter:title",
      content: "正V天线 (Positive V Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示正V天线（Positive V）的结构特点，展示为何它是受限空间下理想的楼顶天线。",
    },
    {
      name: "keywords",
      content:
        "正V天线, Positive V antenna, 偶极子, dipole, 楼顶天线, balcony antenna, 紧凑型天线",
    },
  ];
};

export default function PositiveVAntennaPage() {
  const { t } = useTranslation("demos");
  const pv = "positiveVAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${pv}.title`)}</h1>
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
            <PositiveVAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t(`${pv}.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${pv}.structure`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${pv}.rotatable`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t(`${pv}.polarizationTitle`)}</h3>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">{t(`${pv}.physicsContent`)}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${pv}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "rotatable-dipole",
                  text: "Witt, F. J., AI1H. (2014). Broadband Rotatable Dipole. QST Magazine.",
                },
                {
                  id: "balanis-dipole",
                  text: "Balanis, C. A. Antenna Theory. Chapter 4: Linear Wire Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
