import type { TFunction } from "i18next";
import i18next from "i18next";
import { lazy, Suspense } from "react";
import { initReactI18next, Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { BlockMath, InlineMath } from "~/components/math";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/end-fed-antenna";

const EndFedAntennaScene = lazy(
  () => import("~/components/end-fed-antenna-scene"),
);

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
    title: t("demos:endFedAntenna.metaTitle"),
    description: t("demos:endFedAntenna.metaDescription"),
    keywords: t("demos:endFedAntenna.metaKeywords"),
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

export default function EndFedAntennaPage() {
  const { t } = useTranslation("demos");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`endFedAntenna.title`)}</h1>
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
          <p>{t(`endFedAntenna.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`endFedAntenna.impedance`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`endFedAntenna.structure`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`endFedAntenna.multiband`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t(`endFedAntenna.theoryAnalysis`)}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`endFedAntenna.theoryVoltageFeed`}
                components={{ strong: <strong />, M: <InlineMath /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`endFedAntenna.harmonics`}
                components={{ strong: <strong />, M: <InlineMath /> }}
              />
            </li>
          </ul>

          <div className="my-6 space-y-4">
            <div>
              <p className="font-semibold mb-2">
                {t(`endFedAntenna.formulaRadiation`)}:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    <Trans
                      ns="demos"
                      i18nKey={`endFedAntenna.oddHarmonics`}
                      components={{ M: <InlineMath /> }}
                    />
                  </p>
                  <BlockMath math="F(\theta) = \frac{\cos(\frac{n\pi}{2} \cos \theta)}{\sin \theta}" />
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    <Trans
                      ns="demos"
                      i18nKey={`endFedAntenna.evenHarmonics`}
                      components={{ M: <InlineMath /> }}
                    />
                  </p>
                  <BlockMath math="F(\theta) = \frac{\sin(\frac{n\pi}{2} \cos \theta)}{\sin \theta}" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <Trans
                  ns="demos"
                  i18nKey={`endFedAntenna.patternDesc`}
                  components={{ M: <InlineMath /> }}
                />
              </p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <Trans
                ns="demos"
                i18nKey={`endFedAntenna.commonMode`}
                components={{ strong: <strong /> }}
              />
            </p>
          </div>

          <h3>{t(`endFedAntenna.polarizationTitle`)}</h3>
          <ul></ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">
                    <Trans
                      ns="demos"
                      i18nKey={`endFedAntenna.physicsContent`}
                      components={{ strong: <strong /> }}
                    />
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`endFedAntenna.physicsQuote`)}
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
