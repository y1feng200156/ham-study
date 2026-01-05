import { lazy, Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { getInstance } from "~/middleware/i18next";
import type { Route } from "./+types/moxon-antenna";

const MoxonAntennaScene = lazy(
  () => import("~/components/moxon-antenna-scene"),
);

import { ScientificCitation } from "~/components/scientific-citation";

export const loader = ({ context }: Route.LoaderArgs) => {
  const { t } = getInstance(context);
  return {
    title: t("demos.moxon.title"),
    description: t("demos.moxon.description"),
    keywords: t("demos.moxon.keywords"),
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
