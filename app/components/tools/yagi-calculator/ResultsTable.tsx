import {
  ApproximateEqualsIcon,
  CopyIcon,
  QuestionIcon,
} from "@phosphor-icons/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { YagiDesign } from "~/lib/yagi-calc";
import { useTranslation } from "react-i18next";

interface ResultsTableProps {
  design: YagiDesign;
  copyTable: () => void;
}

export function ResultsTable({ design, copyTable }: ResultsTableProps) {
  const { t } = useTranslation("common");
  return (
    <Card className="gap-y-0 pb-0">
      <CardHeader className="border-b flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-bold text-slate-800">
            {t("tools.yagiCalculator.results.title")}
          </CardTitle>
          <CardDescription className="text-xs">
            {t("tools.yagiCalculator.results.tolerance")}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={copyTable}
          className="h-8 text-xs gap-2"
        >
          <CopyIcon className="w-3 h-3" />
          {t("tools.yagiCalculator.results.copy")}
        </Button>
      </CardHeader>
      <CardContent className="p-0 border-0 overflow-x-auto">
        <table className="w-full text-sm text-left font-mono">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-5 py-3 font-sans">
                {t("tools.yagiCalculator.results.headers.element")}
              </th>
              <th className="px-5 py-3 font-sans">
                {t("tools.yagiCalculator.results.headers.pos")}
              </th>
              <th className="px-5 py-3 font-sans">
                {t("tools.yagiCalculator.results.headers.space")}
              </th>
              <th className="px-5 py-3 font-sans text-slate-400">
                {t("tools.yagiCalculator.results.headers.half")}
              </th>
              <th className="px-5 py-3 font-sans text-sky-700 font-bold bg-sky-50">
                {t("tools.yagiCalculator.results.headers.cut")}
              </th>
              <th className="px-5 py-3 font-sans text-slate-400">
                {t("tools.yagiCalculator.results.headers.note")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {design.elements.map((el) => {
              const isDE = el.type === "DE";
              let note = "-";
              if (isDE) {
                if (el.style === "folded")
                  note = t("tools.yagiCalculator.results.notes.folded");
                else if (el.gap)
                  note = t("tools.yagiCalculator.results.notes.gap", {
                    val: el.gap,
                  });
              }
              return (
                <tr
                  key={el.name}
                  className={`hover:bg-slate-50 transition ${isDE ? "bg-sky-50/30" : ""}`}
                >
                  <td className={`relative px-5 py-2`}>
                    <div
                      className={`absolute left-0 top-0 w-4 h-full border-l-4 ${isDE ? "border-sky-500" : "border-transparent"}`}
                    ></div>
                    {el.name}
                  </td>
                  <td className="px-5 py-2 text-slate-600">
                    {el.position.toFixed(1)}
                  </td>
                  <td className="px-5 py-2 text-slate-400">
                    {el.spacing > 0 ? el.spacing.toFixed(1) : "-"}
                  </td>
                  <td className="px-5 py-2 text-slate-400">
                    {el.halfLength.toFixed(1)}
                  </td>
                  <td
                    className={`px-5 py-2 font-bold ${isDE ? "text-sky-700" : "text-slate-700"}`}
                  >
                    {el.cutLength.toFixed(1)}
                  </td>
                  <td className="px-5 py-2 text-xs text-slate-400 italic">
                    {note}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
      <div className="bg-slate-50 px-6 py-3 text-xs text-slate-500 flex justify-between border-t border-slate-200">
        <span className="font-medium">
          {t("tools.yagiCalculator.results.totalBoom", {
            val: (design.totalBoomLength + 60).toFixed(0),
          })}
        </span>
        <span className="font-medium text-sky-600 flex items-center gap-1">
          {t("tools.yagiCalculator.results.estGain")}
          <ApproximateEqualsIcon className="w-4 h-4" />
          {design.estimatedGain.toFixed(1)} dBi
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <QuestionIcon className="w-4 h-4 text-sky-400 cursor-help ml-1" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("tools.yagiCalculator.results.estGainTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>
    </Card>
  );
}
