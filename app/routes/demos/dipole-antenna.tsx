import { lazy, Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { BlockMath, InlineMath } from "~/components/math";
import { ScientificCitation } from "~/components/scientific-citation";
import { getInstance } from "~/middleware/i18next";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

const DipoleAntennaScene = lazy(
  () => import("~/components/dipole-antenna-scene"),
);

export const loader = ({ context }: LoaderFunctionArgs) => {
  const { t } = getInstance(context);
  return {
    title: t("demos:dipoleAntenna.metaTitle"),
    description: t("demos:dipoleAntenna.metaDescription"),
    keywords: t("demos:dipoleAntenna.metaKeywords"),
  };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { title, description, keywords } = data || {};
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
  const dp = "dipoleAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${dp}.title`)}</h1>
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
          <h3>{t(`${dp}.overviewTitle`)}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${dp}.overview`}
              components={{ strong: <strong />, M: <InlineMath /> }}
            />
          </p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.structure`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.halfWave`}
                components={{ strong: <strong />, M: <InlineMath /> }}
              />
            </li>
          </ul>

          {/* Principle */}
          <h3>{t(`${dp}.principleTitle`)}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${dp}.principle`}
              components={{ strong: <strong /> }}
            />
          </p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.principleDetails.ends`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.principleDetails.center`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.principleDetails.impedance`}
                components={{ strong: <strong />, M: <InlineMath /> }}
              />
            </li>
          </ul>

          {/* Pattern */}
          <h3>{t(`${dp}.patternTitle`)}</h3>
          <p>
            <Trans
              ns="demos"
              i18nKey={`${dp}.patternIntro`}
              components={{ M: <InlineMath /> }}
            />
          </p>
          <BlockMath math="F(\theta) = \frac{\cos(\frac{kL}{2} \cos \theta) - \cos(\frac{kL}{2})}{\sin \theta}" />

          <p>{t(`${dp}.halfWaveSpecialCase`)}:</p>
          <BlockMath math="F(\theta) = \frac{\cos(\frac{\pi}{2} \cos \theta)}{\sin \theta}" />

          {/* Full Wave Note */}
          <h3>{t(`${dp}.fullWaveTitle`)}</h3>
          <p>{t(`${dp}.fullWaveIntro`)}</p>
          <ol>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.fullWavePoints.pattern`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.fullWavePoints.impedance`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.fullWavePoints.conclusion`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ol>

          {/* Impedance & Inverted V */}
          <h3>{t(`${dp}.impedanceTitle`)}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.impedance73`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${dp}.impedance50`}
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
                      i18nKey={`${dp}.physicsContent`}
                      components={{ strong: <strong /> }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${dp}.physicsQuote`)}
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
