import { Controller, Get } from '@nestjs/common';
import { FindAllPersonUseCase } from 'src/application/useCases/person/findAllPersonUseCase';
import { PersonPresenter } from 'src/infra/http/presenters/person.presenter';

@Controller('people')
export class FindAllPersonController {
  constructor(private readonly findAllPersonUseCase: FindAllPersonUseCase) {}

  @Get()
  async handle() {
    const people = await this.findAllPersonUseCase.execute();

    // Itera sobre o array e aplica o presenter de resumo para cada pessoa
    return people.map((person) => PersonPresenter.toSummaryHTTP(person));
  }
}
