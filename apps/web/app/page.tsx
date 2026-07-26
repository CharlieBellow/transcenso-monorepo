import { ChartsGrid } from "@/components/ChartsGrid"
import { Footer } from "@/components/Footer"
import InlineBorder from "@/components/InlineBorder"
import { MethodologyCard } from "@/components/MetodologyCard"
import MetricsGrid, { metrics } from "@/components/MetricsGrid"

import { BarChart } from "@/components/BarChart"
import { ColumnsBars, defaultRegionData } from "@/components/ColumnsBars"
import PageBase from "@/components/PageBase"
import { PrivacyCard } from "@/components/PrivacyCard"
import { ShieldCheck } from "lucide-react"

export default function Page() {
  return (
    <PageBase hasHeader={true}>
      <section className="mx-auto mt-12 w-full max-w-6xl px-4 text-center sm:px-6">
        <InlineBorder>
          <ShieldCheck className="h-4 w-4 text-primary" />
          Privacidade por design · Anonimização total
        </InlineBorder>
        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
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

      <div className="mx-auto mt-12 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        
        <MetricsGrid metrics={metrics} />
        <PrivacyCard />
        <MethodologyCard />
        <ChartsGrid
          hasHeader={true}
          content={<BarChart />}
          title="Distribuição por identidade de gênero"
        />
        <ChartsGrid
          hasHeader={true}
          title="Distribuição Regional"
          content={<ColumnsBars data={defaultRegionData} />}
        />
      </div>
      <Footer />
    </PageBase>
  )
}
