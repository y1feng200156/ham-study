import { Broadcast, WaveSine } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";

interface MoxonSpecsCardProps {
  frequency: number;
  setFrequency: (v: number) => void;
  wireDiameter: number;
  setWireDiameter: (v: number) => void;
}

export function MoxonSpecsCard({
  frequency,
  setFrequency,
  wireDiameter,
  setWireDiameter,
}: MoxonSpecsCardProps) {
  const { t } = useTranslation("common");
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
          <WaveSine className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="font-bold text-lg dark:text-white">
            {t("tools.moxonCalculator.specs.title")}
          </h2>
          <p className="text-xs text-slate-500">
            {t("tools.moxonCalculator.specs.subtitle")}
          </p>
        </div>
      </div>

      {/* Frequency Input */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="frequency" className="text-sm font-medium">
            {t("tools.moxonCalculator.specs.freqLabel")}
          </Label>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono">
            freq: {frequency}
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <Slider
            value={[frequency]}
            min={1}
            max={5000}
            step={0.1}
            onValueChange={(vals) => setFrequency(vals[0])}
            className="flex-1"
          />
          <Input
            id="frequency"
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-24 font-mono text-center"
            step={0.001}
          />
        </div>
        <p className="text-[10px] text-slate-400 italic">
          {t("tools.moxonCalculator.specs.typicalFreq")}
        </p>
      </div>

      <hr className="border-slate-100 dark:border-slate-800" />

      {/* Wire Diameter Input */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="wireDia" className="text-sm font-medium">
            {t("tools.moxonCalculator.specs.diaLabel")}
          </Label>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
            dia: {wireDiameter}mm
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
            <Broadcast className="w-4 h-4 text-slate-400" />
          </div>
          <Input
            id="wireDia"
            type="number"
            value={wireDiameter}
            onChange={(e) => setWireDiameter(Number(e.target.value))}
            className="w-full font-mono"
            step={0.1}
          />
        </div>
        <p className="text-[10px] text-slate-400">
          {t("tools.moxonCalculator.specs.typicalDia")}
        </p>
      </div>
    </div>
  );
}
