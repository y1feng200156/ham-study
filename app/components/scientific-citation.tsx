import { InfoIcon } from "@phosphor-icons/react";

interface Citation {
  id: string;
  text: string;
  url?: string;
}

interface ScientificCitationProps {
  title: string;
  content: React.ReactNode;
  citations: Citation[];
}

export function ScientificCitation({
  title,
  content,
  citations,
}: ScientificCitationProps) {
  return (
    <div className="text-sm text-muted-foreground">
      <div className="flex items-center gap-2 mb-3 text-foreground font-semibold">
        <InfoIcon className="w-4 h-4" />
        {title}
      </div>

      <div className="prose dark:prose-invert max-w-none mb-6 text-sm/relaxed">
        {content}
      </div>

      <div className="space-y-1">
        <p className="font-medium text-xs uppercase tracking-wider text-muted-foreground/80 mb-2">
          References / 参考文献
        </p>
        <ol className="list-decimal list-outside ml-4 space-y-1 text-xs">
          {citations.map((cite) => (
            <li key={cite.id} className="pl-1">
              {cite.url ? (
                <a
                  href={cite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-primary transition-colors"
                >
                  {cite.text}
                </a>
              ) : (
                <span>{cite.text}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
