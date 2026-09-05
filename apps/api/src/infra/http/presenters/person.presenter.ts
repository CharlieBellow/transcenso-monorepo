// infra/http/presenters/person.presenter.ts

export interface PersonDataInput {
  id: string;
  socialName?: string | null;
  civilName: string;
  pronouns: any;
  genderId: string;
  sexualityId: string;
}
export class PersonPresenter {
  static toHTTP(person: PersonDataInput) {
    return {
      id: person.id,
      name: person.socialName || person.civilName,
      socialName: person.socialName,
      civilName: person.civilName,
      pronouns: person.pronouns,
      genderId: person.genderId,
      sexualityId: person.sexualityId,
    };
  }
}
