import katex from "katex";
import { useEffect, useRef } from "react";

export const InlineMath = ({ math }: { math: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, {
        throwOnError: false,
        displayMode: false,
      });
    }
  }, [math]);
  return <span ref={ref} />;
};

export const BlockMath = ({ math }: { math: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, {
        throwOnError: false,
        displayMode: true,
      });
    }
  }, [math]);
  return <div ref={ref} />;
};
