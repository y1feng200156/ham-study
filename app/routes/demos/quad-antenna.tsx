import { lazy, Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { getInstance } from "~/middleware/i18next";
import type { Route } from "./+types/quad-antenna";

const QuadAntennaScene = lazy(() => import("~/components/quad-antenna-scene"));

import { ScientificCitation } from "~/components/scientific-citation";

export const loader = ({ context }: Route.LoaderArgs) => {
  const { t } = getInstance(context);
  return {
    title: t("demos.quad.title"),
    description: t("demos.quad.description"),
    keywords: t("demos.quad.keywords"),
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

export default function QuadAntennaPage() {
  const { t } = useTranslation("demos");
  const qa = "quadAntenna";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{t(`${qa}.title`)}</h1>
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
            <QuadAntennaScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t(`${qa}.about`)}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${qa}.highGain`}
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${qa}.lowNoise`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t(`${qa}.polarizationTitle`)}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${qa}.polarization`}
                components={{ strong: <strong /> }}
              />
              <br />- {t(`${qa}.horizontalFeed`)}
              <br />- {t(`${qa}.verticalFeed`)}
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey={`${qa}.challenge`}
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-4 md:p-6 mb-8 text-sm md:text-base leading-relaxed">
            <ScientificCitation
              title={t("physicsValidation")}
              content={
                <>
                  <p className="mb-2">{t(`${qa}.physicsContent`)}</p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t(`${qa}.physicsQuote`)}
                  </p>
                </>
              }
              citations={[
                {
                  id: "w9lzx",
                  text: "Moore, C. C., W9LZX. (1947). The Quad Antenna.",
                },
                {
                  id: "cubical-quad",
                  text: "Orr, W. I., W6SAI. (1959). All About Cubical Quad Antennas.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
