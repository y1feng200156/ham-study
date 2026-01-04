import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const YagiAntennaScene = lazy(() => import("~/components/yagi-antenna-scene"));

import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化" },
    {
      name: "description",
      content:
        "3D演示八木天线的工作原理，展示引向器、有源振子和反射器的作用及辐射方向图。",
    },
    {
      property: "og:title",
      content: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content:
        "3D演示八木天线的工作原理，展示引向器、有源振子和反射器的作用及辐射方向图。",
    },
    {
      name: "twitter:title",
      content: "八木-宇田天线 (Yagi-Uda Antenna) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content:
        "3D演示八木天线的工作原理，展示引向器、有源振子和反射器的作用及辐射方向图。",
    },
    {
      name: "keywords",
      content:
        "八木天线, Yagi-Uda antenna, 定向天线, directional antenna, 引向器, director, 反射器, reflector",
    },
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

          <h3>{t(`${yagi}.polarizationMatch`)}</h3>
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
