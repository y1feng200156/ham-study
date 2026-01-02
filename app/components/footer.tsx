import { EnvelopeIcon, HandWavingIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Feedback Section */}
          {/* Feedback Section & Contact */}
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <HandWavingIcon size={20} weight="duotone" />
              <span>有想法或建议？</span>
            </h3>
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span>欢迎随时反馈，帮助改进这个项目</span>
              <Button asChild size="icon" variant="outline" className="rounded-full">
                <a
                href="mailto:ham@charlesify.com"
                title="发送邮件给 ham@charlesify.com"
              >
                  <EnvelopeIcon weight="duotone" />
                </a>
              </Button>
            </div>
          </div>

          {/* Callsign */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
              BG8ROM
            </span>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 flex justify-center">
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
                © {new Date().getFullYear()} Ham Radio Visualization. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
