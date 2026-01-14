import type { TFunction } from "i18next";
import i18next from "i18next";
import { lazy, Suspense } from "react";
import { initReactI18next, Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import resources from "~/locales";
import { getLocale } from "~/middleware/i18next";
import type { Route } from "./+types/horizontal-polarization";

const HorizontalPolarizationScene = lazy(
  () => import("~/components/horizontal-polarization-scene"),
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
    title: t("demos:horizontalPolarization.metaTitle"),
    description: t("demos:horizontalPolarization.metaDescription"),
    keywords: t("demos:horizontalPolarization.metaKeywords"),
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

export default function HorizontalPolarizationPage() {
  const { t } = useTranslation("demos");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">
          {t("horizontalPolarization.title")}
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
            <HorizontalPolarizationScene />
          </Suspense>
        </ClientOnly>

        <div className="prose dark:prose-invert max-w-none">
          <h3>{t("aboutTitle")}</h3>
          <p>{t("horizontalPolarization.about")}</p>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey="horizontalPolarization.polarization"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="horizontalPolarization.horizontalDipole"
                components={{ strong: <strong /> }}
              />
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="horizontalPolarization.propagation"
                components={{ strong: <strong /> }}
              />
            </li>
          </ul>

          <h3>{t("polarizationMatch")}</h3>
          <ul>
            <li>
              <Trans
                ns="demos"
                i18nKey="horizontalPolarization.hToH"
                components={{ strong: <strong /> }}
              />
              <span className="text-green-600 font-bold dark:text-green-400">
                {" "}
                {t("circularPolarization.bestMatch")}
              </span>
              。{t("horizontalPolarization.hToHNote")}
            </li>
            <li>
              <Trans
                ns="demos"
                i18nKey="horizontalPolarization.hToV"
                components={{ strong: <strong /> }}
              />
              <span className="text-red-600 font-bold dark:text-red-400">
                {" "}
                {t("verticalPolarization.crossPolarization")}
              </span>
              。
              <Trans
                ns="demos"
                i18nKey="horizontalPolarization.hToVNote"
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
                    {t("horizontalPolarization.physicsContent")}
                  </p>
                  <p className="text-muted-foreground italic border-l-2 border-primary/20 pl-4 py-1">
                    {t("horizontalPolarization.physicsQuote")}
                  </p>
                </>
              }
              citations={[
                {
                  id: "arrl-handbook",
                  text: "Silver, H. W. (Ed.). (2023). The ARRL Handbook for Radio Communications. Chapter 21: Antennas.",
                },
                {
                  id: "itu-r",
                  text: "ITU-R P.372-14: Radio noise.",
                  url: "https://www.itu.int/rec/R-REC-P.372/en",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
