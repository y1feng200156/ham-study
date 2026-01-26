import { useTranslation } from "react-i18next";
import { Card, CardContent } from "~/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider";

interface BasicSpecsCardProps {
  frequency: number;
  setFrequency: (v: number) => void;
  elementCount: number;
  setElementCount: (v: number) => void;
}

export function BasicSpecsCard({
  frequency,
  setFrequency,
  elementCount,
  setElementCount,
}: BasicSpecsCardProps) {
  const { t } = useTranslation("common");

  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          {t("tools.yagiCalculator.specs.title")}
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t("tools.yagiCalculator.specs.frequency")}</Label>
            <InputGroup>
              <InputGroupInput
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value) || 0)}
                className="font-mono text-lg font-bold"
              />
              <InputGroupAddon align="inline-end">MHz</InputGroupAddon>
            </InputGroup>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <Label>{t("tools.yagiCalculator.specs.elements")}</Label>
              <span className="text-sm font-mono text-primary font-bold">
                {elementCount}
              </span>
            </div>
            <Slider
              value={[elementCount]}
              min={3}
              max={30}
              step={1}
              onValueChange={(v) => setElementCount(v[0])}
              className="py-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
