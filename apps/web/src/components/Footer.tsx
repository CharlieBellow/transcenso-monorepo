import { IconHeader } from "@/components/IconHeader";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <p className="text-xs text-muted-foreground min-w-0">
          © {new Date().getFullYear()} TransCenso · construído com privacidade
          por design.
        </p>
        <IconHeader icon={ShieldCheck} title="API status:
          operacional">
        </IconHeader>
      </div>
    </footer>
  )
}
