import katex from "katex";
import { useEffect, useRef } from "react";

export const InlineMath = ({
  math,
  children,
}: {
  math?: string;
  children?: React.ReactNode;
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      let latex = math || "";
      if (!latex && children) {
        if (typeof children === "string") {
          latex = children;
        } else if (Array.isArray(children)) {
          latex = children
            .map((c) => (typeof c === "string" ? c : ""))
            .join("");
        } else if (
          typeof children === "number" ||
          typeof children === "boolean"
        ) {
          latex = String(children);
        } else {
          // If it's a React element or something else, we try to grab text content if possible,
          // but for now, let's just ignore or cast cleanly to avoid crashes.
          // In Trans, it often passes arrays of strings.
          // Let's rely on standard toString behavior if sensible, or empty string.
          try {
            latex = String(children);
            if (latex === "[object Object]") latex = "";
          } catch {
            latex = "";
          }
        }
      }

      try {
        katex.render(latex, ref.current, {
          throwOnError: false,
          displayMode: false,
        });
      } catch (e) {
        console.error("KaTeX render error:", e);
      }
    }
  }, [math, children]);

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
