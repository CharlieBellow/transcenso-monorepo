import FillInput from "@/components/FillInput";
import { IconHeader } from "@/components/IconHeader";
import { CardRoot } from "@/components/ui/Card/CardRoot";
import { BookOpen, Globe2 } from "lucide-react";

export function MethodologyCard() {
  return (
    <CardRoot className="flex flex-col gap-4 p-6">
      <IconHeader
        icon={Globe2}
        title="Metodologia Aberta"
        subtitle="Todo o pipeline de coleta, anonimização e agregação é público.
        Pesquisadoras podem reproduzir, auditar e contestar."
      />

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <FillInput colorText="primary" text={"V2.4.0"} title="Schema"/>
        <FillInput colorText="chart-2" text={"ODbL 1.0"} title="Licença" />
  
      </div>
    </CardRoot>
  )
}