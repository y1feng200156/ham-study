import type { SVGProps } from "react";
import { cn } from "~/lib/utils";

const commonClassName = "inline-block h-[1.25em] w-auto fill-current";
const commonStyle = { verticalAlign: "-0.3em" };

export function MathOmega(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 18 18"
      className={cn(commonClassName, props.className)}
      {...props}
    >
      <title>Ω</title>
      <text
        x="50%"
        y="14"
        textAnchor="middle"
        fontSize="16"
        fontFamily="Times New Roman, serif"
        fontStyle="italic"
      >
        Ω
      </text>
    </svg>
  );
}

export function MathInfinity(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={cn(commonClassName, props.className)}
      {...props}
    >
      <title>∞</title>
      <text
        x="50%"
        y="12"
        textAnchor="middle"
        fontSize="20"
        fontFamily="Times New Roman, serif"
      >
        ∞
      </text>
    </svg>
  );
}

export function MathLambdaQuarter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 18"
      className={cn(commonClassName, props.className)}
      {...props}
    >
      <title>λ/4</title>
      <text
        x="0"
        y="14"
        fontSize="16"
        fontFamily="Times New Roman, serif"
        fontStyle="italic"
      >
        λ/4
      </text>
    </svg>
  );
}

export function MathETheta(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 20"
      className={cn(commonClassName, props.className)}
      {...props}
    >
      <title>Eθ</title>
      <text
        x="2"
        y="14"
        fontSize="16"
        fontFamily="Times New Roman, serif"
        fontStyle="italic"
      >
        E
      </text>
      <text
        x="13"
        y="16"
        fontSize="10"
        fontFamily="Times New Roman, serif"
        fontStyle="italic"
      >
        θ
      </text>
    </svg>
  );
}

export function MathZVI(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 60 18"
      className={cn(commonClassName, props.className)}
      {...props}
    >
      <title>Z = V/I</title>
      <text
        x="0"
        y="14"
        fontSize="16"
        fontFamily="Times New Roman, serif"
        fontStyle="italic"
      >
        Z = V/I
      </text>
    </svg>
  );
}
