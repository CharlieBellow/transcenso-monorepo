import { Controller, Get, Param } from '@nestjs/common';
import { FindByIdPersonUseCase } from 'src/application/useCases/person/findByIdPersonUseCase';
import { PersonPresenter } from 'src/infra/http/presenters/person.presenter';

@Controller('people')
export class FindByIdPersonController {
  constructor(private readonly findByIdPersonUseCase: FindByIdPersonUseCase) {}

  @Get('id/:id')
  async handle(@Param('id') id: string) {
    const person = await this.findByIdPersonUseCase.execute(id);

    if(!person) return null;

    return PersonPresenter.toDetailHTTP(person);
  }
}
