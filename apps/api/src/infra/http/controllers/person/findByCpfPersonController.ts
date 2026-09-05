import { Controller, Get, Param } from '@nestjs/common';
import { FindByCpfPersonUseCase } from 'src/application/useCases/person/findByCpfPersonUseCase';
import { PersonPresenter } from 'src/infra/http/presenters/person.presenter';

@Controller('people')
export class FindByCpfPersonController {
  constructor(
    private readonly findByCpfPersonUseCase: FindByCpfPersonUseCase,
  ) {}

  @Get('cpf/:cpf')
  async handle(@Param('cpf') cpf: string) {
    const result = await this.findByCpfPersonUseCase.execute(cpf);

    return PersonPresenter.toDetailHTTP(result);
  }
}
