import { TableIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
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
import type { MoxonDesign } from "~/lib/moxon-calc";

interface MoxonResultsTableProps {
  design: MoxonDesign;
}

export function MoxonResultsTable({ design }: MoxonResultsTableProps) {
  const { t } = useTranslation("common");
  return (
    <Card className="gap-0">
      <CardHeader className="pb-6 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <TableIcon className="w-5 h-5 text-indigo-500" />
          {t("tools.moxonCalculator.results.title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 border-t border-slate-100 dark:border-slate-800">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-slate-50/50 dark:bg-slate-900/50">
              <TableHead className="w-[100px]">
                {t("tools.moxonCalculator.results.headers.id")}
              </TableHead>
              <TableHead>
                {t("tools.moxonCalculator.results.headers.desc")}
              </TableHead>
              <TableHead className="text-right font-mono">
                {t("tools.moxonCalculator.results.headers.len")}
              </TableHead>
              <TableHead className="text-right font-mono text-xs text-muted-foreground">
                {t("tools.moxonCalculator.results.headers.wl")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold font-mono text-indigo-600">
                A
              </TableCell>
              <TableCell>{t("tools.moxonCalculator.results.rows.A")}</TableCell>
              <TableCell className="text-right font-bold text-base">
                {design.A.toFixed(1)}
              </TableCell>
              <TableCell className="text-right font-mono">0.375</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold font-mono text-indigo-600">
                B
              </TableCell>
              <TableCell>{t("tools.moxonCalculator.results.rows.B")}</TableCell>
              <TableCell className="text-right font-bold text-base">
                {design.B.toFixed(1)}
              </TableCell>
              <TableCell className="text-right font-mono">0.058</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold font-mono text-emerald-600">
                C
              </TableCell>
              <TableCell>{t("tools.moxonCalculator.results.rows.C")}</TableCell>
              <TableCell className="text-right font-bold text-base">
                {design.C.toFixed(1)}
              </TableCell>
              <TableCell className="text-right font-mono">0.067</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold font-mono text-sky-600">
                D
              </TableCell>
              <TableCell>{t("tools.moxonCalculator.results.rows.D")}</TableCell>
              <TableCell className="text-right font-bold text-base">
                {design.D.toFixed(1)}
              </TableCell>
              <TableCell className="text-right font-mono">0.058</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold font-mono text-slate-500">
                E
              </TableCell>
              <TableCell>{t("tools.moxonCalculator.results.rows.E")}</TableCell>
              <TableCell className="text-right font-bold text-base">
                {design.E.toFixed(1)}
              </TableCell>
              <TableCell className="text-right font-mono">0.183</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="text-xs text-slate-500 flex-col items-start gap-1 border-t border-slate-100 dark:border-slate-800">
        <p>
          <strong>{t("tools.moxonCalculator.results.rows.wireDriven")}:</strong>{" "}
          {design.wireLengthDriven.toFixed(1)} mm
        </p>
        <p>
          <strong>{t("tools.moxonCalculator.results.rows.wireRef")}:</strong>{" "}
          {design.wireLengthReflector.toFixed(1)} mm
        </p>
      </CardFooter>
    </Card>
  );
}
