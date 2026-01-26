import { QuestionIcon } from "@phosphor-icons/react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type {
  BoomShape,
  DrivenElementType,
  MountMethod,
  SpacingType,
} from "~/lib/yagi-calc";
import { useTranslation } from "react-i18next";

interface ProModePanelProps {
  proBoomShape: BoomShape;
  setProBoomShape: (v: BoomShape) => void;
  proElDia: number;
  setProElDia: (v: number) => void;
  proBoomDia: number;
  setProBoomDia: (v: number) => void;
  proMountMethod: MountMethod;
  setProMountMethod: (v: MountMethod) => void;
  proManualBCFactor: number | undefined;
  setProManualBCFactor: (v: number | undefined) => void;
  proDeType: DrivenElementType;
  setProDeType: (v: DrivenElementType) => void;
  proFeedGap: number;
  setProFeedGap: (v: number) => void;
  proSpacingType: SpacingType;
  setProSpacingType: (v: SpacingType) => void;
  proManualSpacing: number;
  setProManualSpacing: (v: number) => void;
}

export function ProModePanel({
  proBoomShape,
  setProBoomShape,
  proElDia,
  setProElDia,
  proBoomDia,
  setProBoomDia,
  proMountMethod,
  setProMountMethod,
  proManualBCFactor,
  setProManualBCFactor,
  proDeType,
  setProDeType,
  proFeedGap,
  setProFeedGap,
  proSpacingType,
  setProSpacingType,
  proManualSpacing,
  setProManualSpacing,
}: ProModePanelProps) {
  const { t } = useTranslation("common");

  return (
    <Card className="border-l-4 border-l-sky-600 shadow-sm animate-in fade-in slide-in-from-top-2">
      <CardHeader className="bg-slate-50 border-b px-5">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-800">
            {t("tools.yagiCalculator.pro.title")}
          </h3>
          <Badge variant="secondary" className="bg-sky-100 text-sky-700">
            Pro Mode
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 1. Boom Correction */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase border-b pb-1">
            {t("tools.yagiCalculator.pro.section1")}
          </h4>

          {/* Boom Shape Toggle */}
          <div className="flex justify-between items-center bg-slate-50 p-2 rounded border">
            <Label className="text-xs uppercase text-slate-500">
              {t("tools.yagiCalculator.pro.boomShape")}
            </Label>
            <div className="flex gap-1">
              <Button
                type="button"
                variant={proBoomShape === "round" ? "default" : "outline"}
                size="sm"
                className={`h-6 text-xs px-2 ${proBoomShape === "round" ? "bg-sky-600 hover:bg-sky-500" : ""}`}
                onClick={() => setProBoomShape("round")}
              >
                {t("tools.yagiCalculator.pro.shapes.round")}
              </Button>
              <Button
                type="button"
                variant={proBoomShape === "square" ? "default" : "outline"}
                size="sm"
                className={`h-6 text-xs px-2 ${proBoomShape === "square" ? "bg-sky-600 hover:bg-sky-500" : ""}`}
                onClick={() => setProBoomShape("square")}
              >
                {t("tools.yagiCalculator.pro.shapes.square")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Label className="text-xs uppercase text-slate-500">
                  {t("tools.yagiCalculator.pro.elementDia")}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QuestionIcon className="h-4 w-4 text-slate-400 hover:text-sky-600 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[220px]">
                    <p className="font-bold text-background mb-1">
                      {t("tools.yagiCalculator.pro.elementDiaTooltip.title")}
                    </p>
                    <p className="text-xs text-background/80">
                      {t("tools.yagiCalculator.pro.elementDiaTooltip.content")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-1">
                <InputGroup className="h-8">
                  <InputGroupInput
                    type="number"
                    value={proElDia}
                    onChange={(e) =>
                      setProElDia(parseFloat(e.target.value) || 0)
                    }
                    className="text-sm font-mono"
                  />
                  <InputGroupAddon align="inline-end">mm</InputGroupAddon>
                </InputGroup>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Label className="text-xs uppercase text-slate-500">
                  {t("tools.yagiCalculator.pro.boomDia")}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QuestionIcon className="h-4 w-4 text-slate-400 hover:text-sky-600 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[220px]">
                    <p className="font-bold text-background mb-1">
                      {t("tools.yagiCalculator.pro.boomDiaTooltip.title")}
                    </p>
                    <p className="text-xs text-background/80">
                      {t("tools.yagiCalculator.pro.boomDiaTooltip.content")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-1">
                <InputGroup className="h-8">
                  <InputGroupInput
                    type="number"
                    value={proBoomDia}
                    onChange={(e) =>
                      setProBoomDia(parseFloat(e.target.value) || 0)
                    }
                    className="text-sm font-mono"
                  />
                  <InputGroupAddon align="inline-end">mm</InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label className="text-xs uppercase text-slate-500">
                {t("tools.yagiCalculator.pro.mount")}
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <QuestionIcon className="h-4 w-4 text-slate-400 hover:text-sky-600 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px]">
                  <p className="font-bold text-background mb-1">
                    修正系数参考 (k)
                  </p>
                  <ul className="list-disc pl-3 space-y-1 text-xs text-background/80">
                    <li>非金属: k ≈ 0</li>
                    <li>上方架设: k ≈ 0.05 (影响小)</li>
                    <li>穿孔接触: k = 动态计算 (0.6~0.8)</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select
              value={proMountMethod}
              onValueChange={(v) => setProMountMethod(v as MountMethod)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bonded">
                  {t("tools.yagiCalculator.pro.mountMethods.bonded")}
                </SelectItem>
                <SelectItem value="insulated">
                  {t("tools.yagiCalculator.pro.mountMethods.insulated")}
                </SelectItem>
                <SelectItem value="above">
                  {t("tools.yagiCalculator.pro.mountMethods.above")}
                </SelectItem>
                <SelectItem value="none">
                  {t("tools.yagiCalculator.pro.mountMethods.none")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-slate-50 p-2 rounded border flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <Label className="text-xs uppercase text-sky-700 block w-fit">
                  {t("tools.yagiCalculator.pro.bcFactor")}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QuestionIcon className="h-4 w-4 text-sky-500 hover:text-sky-700 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[250px]">
                    <p className="font-bold text-background mb-1">
                      {t("tools.yagiCalculator.pro.bcFactorTooltip.title")}
                    </p>
                    <p className="text-xs text-background/80">
                      {t("tools.yagiCalculator.pro.bcFactorTooltip.content")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                B/d = {(proBoomDia / proElDia || 0).toFixed(2)}
              </span>
            </div>
            <Input
              type="number"
              value={proManualBCFactor ?? 0}
              onChange={(e) =>
                setProManualBCFactor(parseFloat(e.target.value) || 0)
              }
              className="w-20 h-8 text-center font-mono font-bold text-sky-700 bg-white"
              step="0.001"
            />
          </div>
          <p className="text-xs text-slate-400 italic">
            {t("tools.yagiCalculator.pro.autoCalcNote")}
          </p>
        </div>

        {/* 2. Driven Element */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase border-b pb-1">
            {t("tools.yagiCalculator.pro.section2")}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Label className="text-xs uppercase text-slate-500">
                  {t("tools.yagiCalculator.pro.deType")}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QuestionIcon className="h-4 w-4 text-slate-400 hover:text-sky-600 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[220px]">
                    <p className="font-bold text-background mb-1">
                      {t("tools.yagiCalculator.pro.deTypeTooltip.title")}
                    </p>
                    <ul className="list-disc pl-3 space-y-1 text-xs text-background/80">
                      <li>
                        {t("tools.yagiCalculator.pro.deTypeTooltip.item1")}
                      </li>
                      <li>
                        {t("tools.yagiCalculator.pro.deTypeTooltip.item2")}
                      </li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={proDeType}
                onValueChange={(v) => setProDeType(v as DrivenElementType)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="folded">
                    {t("tools.yagiCalculator.pro.deTypes.folded")}
                  </SelectItem>
                  <SelectItem value="straight">
                    {t("tools.yagiCalculator.pro.deTypes.straight")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Label className="text-xs uppercase text-slate-500">
                  {t("tools.yagiCalculator.pro.feedGap")}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <QuestionIcon className="h-4 w-4 text-slate-400 hover:text-sky-600 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[220px]">
                    <p className="font-bold text-background mb-1">
                      {t("tools.yagiCalculator.pro.feedGapTooltip.title")}
                    </p>
                    <p className="text-xs text-background/80">
                      {t("tools.yagiCalculator.pro.feedGapTooltip.content")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-1">
                <InputGroup className="h-8">
                  <InputGroupInput
                    type="number"
                    value={proFeedGap}
                    onChange={(e) =>
                      setProFeedGap(parseFloat(e.target.value) || 0)
                    }
                    className="text-sm font-mono"
                  />
                  <InputGroupAddon align="inline-end">mm</InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Spacing */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase border-b pb-1">
            {t("tools.yagiCalculator.pro.section3")}
          </h4>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label className="text-xs uppercase text-slate-500">
                {t("tools.yagiCalculator.pro.algo")}
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <QuestionIcon className="h-4 w-4 text-slate-400 hover:text-sky-600 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px]">
                  <p className="font-bold text-background mb-1">
                    {t("tools.yagiCalculator.pro.algoTooltip.title")}
                  </p>
                  <p className="text-xs text-background/80">
                    {t("tools.yagiCalculator.pro.algoTooltip.content")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select
              value={proSpacingType}
              onValueChange={(v) => setProSpacingType(v as SpacingType)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dl6wu">
                  {t("tools.yagiCalculator.pro.algos.dl6wu")}
                </SelectItem>
                <SelectItem value="uniform">
                  {t("tools.yagiCalculator.pro.algos.uniform")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {proSpacingType === "uniform" && (
            <div className="bg-slate-50 p-2 rounded">
              <Label className="text-xs uppercase text-slate-500">
                {t("tools.yagiCalculator.pro.fixedSpacing")}
              </Label>
              <div className="flex items-center gap-1 mt-1">
                <InputGroup className="h-8">
                  <InputGroupInput
                    type="number"
                    value={proManualSpacing}
                    onChange={(e) =>
                      setProManualSpacing(parseFloat(e.target.value) || 0)
                    }
                    step="0.01"
                    className="text-sm font-mono"
                  />
                  <InputGroupAddon align="inline-end">λ</InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
