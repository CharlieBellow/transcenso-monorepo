import { SexualityDTO } from 'src/domain/dtos/sexualityDto';

export class SexualityPresenter {
  static toHTTP(sexuality: SexualityDTO) {
    return {
      id: sexuality.id,
      title: sexuality.title,
      acronym: sexuality.acronym,
    };
  }
}
