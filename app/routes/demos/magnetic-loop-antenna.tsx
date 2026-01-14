import type { TFunction } from "i18next";
import i18next from "i18next";
import { Suspense } from "react";
import { initReactI18next, Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import MagneticLoopAntennaScene from "~/components/magnetic-loop-antenna-scene";
import { BlockMath, InlineMath as M } from "~/components/math";
import { ScientificCitation } from "~/components/scientific-citation";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/magnetic-loop-antenna";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const locale = getLocale(request);
  const t: TFunction<["common", "demos"]> = await i18next
    .use(initReactI18next)
    .init({
      lng: locale,
      resources,
    });
  return {
    title: t("demos:magneticLoopAntenna.metaTitle"),
    description: t("demos:magneticLoopAntenna.metaDescription"),
    keywords: t("demos:magneticLoopAntenna.metaKeywords"),
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

export default function MagneticLoopAntenna() {
  const { t } = useTranslation("demos");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{t("magneticLoopAntenna.title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* 3D Scene */}
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
            <MagneticLoopAntennaScene />
          </Suspense>
        </ClientOnly>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none">
          {/* Overview */}
          <h3>{t("magneticLoopAntenna.overviewTitle")}</h3>
          <p>
            <Trans
              i18nKey="magneticLoopAntenna.overview"
              ns="demos"
              components={{ M: <M /> }}
            />
          </p>
          <p>
            <Trans i18nKey="magneticLoopAntenna.structure" ns="demos" />
          </p>
          <p>
            <Trans i18nKey="magneticLoopAntenna.features" ns="demos" />
          </p>

          {/* Physics Model */}
          <h3>{t("magneticLoopAntenna.physicsModelTitle")}</h3>
          <p>
            <Trans
              i18nKey="magneticLoopAntenna.physicsModel"
              ns="demos"
              components={{ M: <M /> }}
            />
          </p>

          {/* Math Formula */}
          <h3>{t("magneticLoopAntenna.fieldFormulaTitle")}</h3>
          <p>
            <Trans
              i18nKey="magneticLoopAntenna.fieldFormulaDesc"
              ns="demos"
              components={{ M: <M /> }}
            />
          </p>

          <BlockMath math="E_\phi = \frac{\eta k^2 I A}{4\pi r} e^{-jkr} \sin\theta" />

          <ul>
            <li>
              <Trans
                i18nKey="magneticLoopAntenna.paramEta"
                ns="demos"
                components={{ M: <M /> }}
              />
            </li>
            <li>
              <Trans
                i18nKey="magneticLoopAntenna.paramK"
                ns="demos"
                components={{ M: <M /> }}
              />
            </li>
            <li>
              <Trans
                i18nKey="magneticLoopAntenna.paramI"
                ns="demos"
                components={{ M: <M /> }}
              />
            </li>
            <li>
              <Trans
                i18nKey="magneticLoopAntenna.paramA"
                ns="demos"
                components={{ M: <M /> }}
              />
            </li>
            <li>
              <Trans
                i18nKey="magneticLoopAntenna.paramTheta"
                ns="demos"
                components={{ M: <M /> }}
              />
            </li>
          </ul>

          {/* Pattern */}
          <h3>{t("magneticLoopAntenna.patternTitle")}</h3>
          <p>
            <Trans
              i18nKey="magneticLoopAntenna.patternDesc"
              ns="demos"
              components={{ M: <M /> }}
            />
          </p>
          <ul>
            <li>
              <strong className="text-red-500">NULL: </strong>
              <Trans
                i18nKey="magneticLoopAntenna.patternNull"
                ns="demos"
                components={{ M: <M /> }}
              />
            </li>
            <li>
              <strong className="text-green-500">MAX: </strong>
              <Trans
                i18nKey="magneticLoopAntenna.patternMax"
                ns="demos"
                components={{ M: <M /> }}
              />
            </li>
          </ul>

          {/* Anti-Noise / Advantages */}
          <h3>{t("magneticLoopAntenna.advantageTitle")}</h3>
          <p>
            <Trans i18nKey="magneticLoopAntenna.advantageDesc" ns="demos" />
          </p>

          {/* Scientific Citation */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed mt-8">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">
                    <Trans
                      i18nKey="magneticLoopAntenna.physicsContent"
                      ns="demos"
                      components={{ M: <M /> }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t("magneticLoopAntenna.physicsQuote")}
                  </p>
                </>
              }
              citations={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
