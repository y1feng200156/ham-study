import type { TFunction } from "i18next";
import i18next from "i18next";
import { lazy, Suspense } from "react";
import { initReactI18next, Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { BlockMath, InlineMath } from "~/components/math";
import { ScientificCitation } from "~/components/scientific-citation";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/dipole-antenna";

const DipoleAntennaScene = lazy(
  () => import("~/components/dipole-antenna-scene"),
);

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t: TFunction<["common", "demos"]> = await i18next
    .use(initReactI18next)
    .init({
      lng: locale,
      resources,
    });
  return {
    title: t("demos:dipoleAntenna.metaTitle"),
    description: t("demos:dipoleAntenna.metaDescription"),
    keywords: t("demos:dipoleAntenna.metaKeywords"),
  };
};

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const { title, description, keywords } = loaderData || {};
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

export default function DipoleAntennaPage() {
  const { t } = useTranslation("demos");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dipoleAntenna.title")}</h1>
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
            <DipoleAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          {/* Overview */}
          <h3>{t("dipoleAntenna.overviewTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey="dipoleAntenna.overview"
              components={{ strong: <strong />, M: <InlineMath /> }}
            />
          </p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.structure"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.halfWave"
                components={{ strong: <strong />, M: <InlineMath /> }}
              />
            </li>
          </ul>

          {/* Principle */}
          <h3>{t("dipoleAntenna.principleTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey="dipoleAntenna.principle"
              components={{ strong: <strong /> }}
            />
          </p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.principleDetails.ends"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.principleDetails.center"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.principleDetails.impedance"
                components={{ strong: <strong />, M: <InlineMath /> }}
              />
            </li>
          </ul>

          {/* Pattern */}
          <h3>{t("dipoleAntenna.patternTitle")}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey="dipoleAntenna.patternIntro"
              components={{ M: <InlineMath /> }}
            />
          </p>
          <BlockMath math="F(\theta) = \frac{\cos(\frac{kL}{2} \cos \theta) - \cos(\frac{kL}{2})}{\sin \theta}" />

          <p>{t("dipoleAntenna.halfWaveSpecialCase")}:</p>
          <BlockMath math="F(\theta) = \frac{\cos(\frac{\pi}{2} \cos \theta)}{\sin \theta}" />

          {/* Full Wave Note */}
          <h3>{t("dipoleAntenna.fullWaveTitle")}</h3>
          <p>{t("dipoleAntenna.fullWaveIntro")}</p>
          <ol>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.fullWavePoints.pattern"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.fullWavePoints.impedance"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.fullWavePoints.conclusion"
                components={{ strong: <strong /> }}
              />
            </li>
          </ol>

          {/* Impedance & Inverted V */}
          <h3>{t("dipoleAntenna.impedanceTitle")}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.impedance73"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="dipoleAntenna.impedance50"
                components={{ strong: <strong /> }}
              />
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
                      i18nKey="dipoleAntenna.physicsContent"
                      components={{ strong: <strong /> }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t("dipoleAntenna.physicsQuote")}
                  </p>
                </>
              }
              citations={[
                {
                  id: "arrl-antenna-book",
                  text: "The ARRL Antenna Book. Chapter 2: Antenna Fundamentals.",
                },
                {
                  id: "balanis",
                  text: "Balanis, C. A. (2016). Antenna Theory: Analysis and Design. Wiley.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
