import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useTranslation } from "react-i18next";

export type QuickPresetType = "metal_bonded" | "metal_insulated" | "pvc";

interface QuickModePanelProps {
  quickPreset: QuickPresetType;
  setQuickPreset: (v: QuickPresetType) => void;
}

export function QuickModePanel({
  quickPreset,
  setQuickPreset,
}: QuickModePanelProps) {
  const { t } = useTranslation("common");

  return (
    <Card className="border-l-4 border-l-green-500 shadow-sm animate-in fade-in slide-in-from-top-2">
      <CardHeader className="">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 hover:bg-green-100"
          >
            QUICK
          </Badge>
          <CardTitle className="text-sm">
            {t("tools.yagiCalculator.quick.title")}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{t("tools.yagiCalculator.quick.label")}</Label>
          <Select
            value={quickPreset}
            onValueChange={(v) => setQuickPreset(v as QuickPresetType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metal_bonded">
                {t("tools.yagiCalculator.quick.presets.metal_bonded")}
              </SelectItem>
              <SelectItem value="metal_insulated">
                {t("tools.yagiCalculator.quick.presets.metal_insulated")}
              </SelectItem>
              <SelectItem value="pvc">
                {t("tools.yagiCalculator.quick.presets.pvc")}
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {t("tools.yagiCalculator.quick.note")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
