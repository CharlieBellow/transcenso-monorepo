import { Controller, Get } from '@nestjs/common';
import { FindAllSexualityUseCase } from 'src/application/useCases/sexuality/findAllSexualityUseCase';
import { SexualityPresenter } from 'src/infra/http/presenters/sexuality.presenter';

@Controller('sexualities')
export class FindAllSexualityController {
  constructor(
    private readonly findAllSexualityUseCase: FindAllSexualityUseCase,
  ) {}

  @Get()
  async handle() {
    const sexuality = await this.findAllSexualityUseCase.execute();

    return sexuality.map((sexuality) => SexualityPresenter.toHTTP(sexuality));
  }
}
