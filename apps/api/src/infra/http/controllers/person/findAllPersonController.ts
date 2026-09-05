import { Controller, Get } from '@nestjs/common';
import { FindAllPersonUseCase } from 'src/application/useCases/person/findAllPersonUseCase';
import { PersonPresenter } from 'src/infra/http/presenters/person.presenter';

@Controller('people')
export class FindAllPersonController {
  constructor(private readonly findAllPersonUseCase: FindAllPersonUseCase) {}

  @Get()
  async handle() {
    const result = await this.findAllPersonUseCase.execute();

    return PersonPresenter.toHTTP(result);
  }
}
