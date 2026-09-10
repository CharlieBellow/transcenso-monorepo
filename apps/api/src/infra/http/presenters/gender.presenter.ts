import { GenderDTO } from 'src/domain/dtos/genderDto';

export class GenderPresenter {
  static toHTTP(gender: GenderDTO) {
    return {
      id: gender.id,
      title: gender.title,
      acronym: gender.acronym,
    };
  }
}
