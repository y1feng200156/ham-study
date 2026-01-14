import type { TFunction } from "i18next";
import i18next from "i18next";
import { lazy, Suspense } from "react";
import { initReactI18next, Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/elliptical-polarization";

const EllipticalPolarizationScene = lazy(
  () => import("~/components/elliptical-polarization-scene"),
);

import { InlineMath } from "~/components/math";
import { ScientificCitation } from "~/components/scientific-citation";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t: TFunction<["common", "demos"]> = await i18next
    .use(initReactI18next)
    .init({
      lng: locale,
      resources,
    });
  return {
    title: t("demos:ellipticalPolarization.metaTitle"),
    description: t("demos:ellipticalPolarization.metaDescription"),
    keywords: t("demos:ellipticalPolarization.metaKeywords"),
  };
};

export const meta = ({ loaderData }: Route.MetaArgs) => {
  const { title, description, keywords } = loaderData;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "keywords", content: keywords },
  ];
};

export default function EllipticalPolarizationPage() {
  const { t } = useTranslation("demos");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">
          {t(`ellipticalPolarization.title`)}
        </h1>
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
              i18nKey={`ellipticalPolarization.about`}
              components={{ b: <b />, M: <InlineMath /> }}
            />
          </p>
          <p>{t(`ellipticalPolarization.sliderNote`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`ellipticalPolarization.linear`}
                components={{ strong: <strong />, M: <InlineMath /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`ellipticalPolarization.circular`}
                components={{ strong: <strong />, M: <InlineMath /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`ellipticalPolarization.elliptical`}
                components={{ strong: <strong />, M: <InlineMath /> }}
              />
            </li>
          </ul>

          <h3>{t(`ellipticalPolarization.generalRulesTitle`)}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`ellipticalPolarization.generalRules`}
              components={{ strong: <strong />, M: <InlineMath /> }}
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
                      i18nKey={`ellipticalPolarization.physicsContent`}
                      components={{
                        strong: <strong />,
                        M: <InlineMath />,
                      }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`ellipticalPolarization.physicsQuote`)}
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
