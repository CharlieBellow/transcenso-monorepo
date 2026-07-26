export enum Pronouns {
  ELA_DELA = "ELA_DELA",
  ELE_DELE = "ELE_DELE",
  ELU_DELU = "ELU_DELU",
  NEUTRO = "NEUTRO",
  PREFIRO_NAO_DIZER = "PREFIRO_NAO_DIZER"
}

// 1. Dicionário de Rótulos para Exibição (Exhaustive Mapping)
export const PRONOUN_LABELS: Record<Pronouns, string> = {
  [Pronouns.ELA_DELA]: "Ela / Dela",
  [Pronouns.ELE_DELE]: "Ele / Dele",
  [Pronouns.ELU_DELU]: "Elu / Delu",
  [Pronouns.NEUTRO]: "Neutro",
  [Pronouns.PREFIRO_NAO_DIZER]: "Prefiro não dizer"
}

// 2. Função/Lista gerada dinamicamente para o Select ou Pills
export const PRONOUN_OPTIONS = Object.values(Pronouns).map((value) => ({
  value,
  label: PRONOUN_LABELS[value]
}))