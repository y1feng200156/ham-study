import {
  ApproximateEqualsIcon,
  QuestionIcon,
  TableIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { YagiDesign } from "~/lib/yagi-calc";

interface ResultsTableProps {
  design: YagiDesign;
}

export function ResultsTable({ design }: ResultsTableProps) {
  const { t } = useTranslation("common");
  return (
    <Card className="gap-0">
      <CardHeader className="pb-6 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <TableIcon className="w-5 h-5 text-indigo-500" />
          {t("tools.yagiCalculator.results.title")}
        </CardTitle>
        <CardDescription>
          {t("tools.yagiCalculator.results.tolerance")}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 border-t border-slate-100 dark:border-slate-800">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-slate-50/50 dark:bg-slate-900/50">
              <TableHead className="w-[100px]">
                {t("tools.yagiCalculator.results.headers.element")}
              </TableHead>
              <TableHead>
                {t("tools.yagiCalculator.results.headers.pos")}
              </TableHead>
              <TableHead>
                {t("tools.yagiCalculator.results.headers.space")}
              </TableHead>
              <TableHead className="text-slate-400">
                {t("tools.yagiCalculator.results.headers.half")}
              </TableHead>
              <TableHead className="text-sky-700 font-bold bg-sky-50 dark:bg-sky-900/20">
                {t("tools.yagiCalculator.results.headers.cut")}
              </TableHead>
              <TableHead className="text-slate-400">
                {t("tools.yagiCalculator.results.headers.note")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
                <TableRow
                  key={el.name}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800 transition ${
                    isDE ? "bg-sky-50/50 dark:bg-sky-900/10" : ""
                  }`}
                >
                  <TableCell className="relative font-mono font-medium">
                    <div
                      className={`absolute left-0 top-0 w-1 h-full ${
                        isDE ? "bg-sky-500" : "bg-transparent"
                      }`}
                    ></div>
                    {el.name}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-mono">
                    {el.position.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-slate-400 font-mono">
                    {el.spacing > 0 ? el.spacing.toFixed(1) : "-"}
                  </TableCell>
                  <TableCell className="text-slate-400 font-mono">
                    {el.halfLength.toFixed(1)}
                  </TableCell>
                  <TableCell
                    className={`font-bold font-mono text-base ${
                      isDE
                        ? "text-sky-700 dark:text-sky-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {el.cutLength.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-xs text-slate-400 italic">
                    {note}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="text-xs text-slate-500 flex justify-between border-t border-slate-200 dark:border-slate-800">
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
      </CardFooter>
    </Card>
  );
}
