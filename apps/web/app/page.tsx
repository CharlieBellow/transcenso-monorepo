import { DataCollectionForm } from "@/components/data-collection-form"
import { DataVisualization } from "@/components/data-visualization"
import { SecureHeader } from "@/components/secure-header"
import {
  BarChart,
  ChartsGrid,
  Footer,
  MethodologyCard,
  MetricsGrid,
  PrivacyCard,
  RegionBars
} from "@/components/utilComponent"
import { ShieldCheck } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-svh pb-16">
      <SecureHeader />

      <section className="mx-auto mt-12 w-full max-w-6xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-4 py-1.5 text-xs text-foreground/80">
          <ShieldCheck className="h-3.5 w-3.5 text-[#a5ccf9]" />
          Privacidade por design · Anonimização total
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Dados demográficos da população{" "}
          <span className="text-gradient">trans</span>, com total{" "}
          <span className="text-gradient">trans-parência</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          Coletamos e publicamos estatísticas com foco extremo em segurança e
          anonimização. Você contribui em segurança — a comunidade enxerga os
          dados de forma transparente.
        </p>
      </section>

      <div className="mx-auto mt-12 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* <DataCollectionForm /> */}
        <DataVisualization />
        <PrivacyCard />
        <MethodologyCard />
        <MetricsGrid />
        <ChartsGrid />
        <BarChart />
        <RegionBars />
        <Footer />
      </div>
    </main>
  )
}
