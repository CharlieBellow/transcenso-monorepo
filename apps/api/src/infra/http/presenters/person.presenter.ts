// infra/http/presenters/person.presenter.ts
import { PersonDTO } from 'src/domain/dtos/personDto';

export class PersonPresenter {
  // 1. Visão Resumida (Para tabelas e listagens públicas)
  static toSummaryHTTP(person: PersonDTO) {
    return {
      id: person.id,
      name: person.name, // Já calculado pela Entidade/DTO (socialName || civilName)
      pronouns: person.pronouns,
      gender: person.gender
        ? { id: person.gender.id, title: person.gender.title }
        : null,
      sexuality: person.sexuality
        ? { id: person.sexuality.id, title: person.sexuality.title }
        : null,
    };
  }

  // 2. Visão Detalhada (Para telas de perfil, edições e retorno de cadastro)
  static toDetailHTTP(person: PersonDTO) {
    return {
      id: person.id,
      name: person.name,
      civilName: person.civilName,
      socialName: person.socialName ?? null,
      slug: person.slug,
      cpf: person.cpf,
      rg: person.rg,
      birthDate: person.birthDate,
      pronouns: person.pronouns,
      gender: person.gender,
      sexuality: person.sexuality,
    };
  }
}
