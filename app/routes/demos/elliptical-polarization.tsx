import { lazy, Suspense } from "react";
import type { MetaFunction } from "react-router";
import { useTranslation, Trans } from "react-i18next";
import { ClientOnly } from "~/components/client-only";

const EllipticalPolarizationScene = lazy(
  () => import("~/components/elliptical-polarization-scene"),
);

import { MathInfinity } from "~/components/math-inline";
import { ScientificCitation } from "~/components/scientific-citation";

export const meta: MetaFunction = () => {
  return [
    { title: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化" },
    {
      name: "description",
      content: "3D演示极化的一般形式——椭圆极化，介于线极化和圆极化之间。",
    },
    {
      property: "og:title",
      content: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化",
    },
    {
      property: "og:description",
      content: "3D演示极化的一般形式——椭圆极化，介于线极化和圆极化之间。",
    },
    {
      name: "twitter:title",
      content: "椭圆极化 (Elliptical Polarization) | 业余无线电可视化",
    },
    {
      name: "twitter:description",
      content: "3D演示极化的一般形式——椭圆极化，介于线极化和圆极化之间。",
    },
    {
      name: "keywords",
      content:
        "椭圆极化, elliptical polarization, 极化, polarization, 无线电传播, radio propagation",
    },
  ];
};

export default function EllipticalPolarizationPage() {
  const { t } = useTranslation("demos");
  const ep = "ellipticalPolarization";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${ep}.title`)}</h1>
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
            <EllipticalPolarizationScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${ep}.about`}
              components={{ b: <b /> }}
            />
          </p>
          <p>{t(`${ep}.sliderNote`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${ep}.linear`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${ep}.circular`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${ep}.elliptical`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t(`${ep}.generalRulesTitle`)}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${ep}.generalRules`}
              components={{ strong: <strong /> }}
            />
          </p>
          <ul></ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">
                    <Trans
                      ns="demos"
                      i18nKey={`${ep}.physicsContent`}
                      components={{
                        strong: <strong />,
                        infinity: <MathInfinity />,
                      }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${ep}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "pozar",
                  text: "Pozar, D. M. (2011). Microwave Engineering (4th ed.). Wiley. Section 1.5: Plane Waves.",
                },
                {
                  id: "ieee-pol",
                  text: "IEEE Standard Definitions of Terms for Antennas. (IEEE Std 145-2013). Section 2.29.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
