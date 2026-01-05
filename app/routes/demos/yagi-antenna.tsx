import { lazy, Suspense } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ClientOnly } from "~/components/client-only";
import { getInstance } from "~/middleware/i18next";
import type { Route } from "./+types/yagi-antenna";

const YagiAntennaScene = lazy(() => import("~/components/yagi-antenna-scene"));

import { ScientificCitation } from "~/components/scientific-citation";

export const loader = ({ context }: Route.LoaderArgs) => {
  const { t } = getInstance(context);
  return {
    title: t("demos.yagi.title"),
    description: t("demos.yagi.description"),
    keywords: t("demos.yagi.keywords"),
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
