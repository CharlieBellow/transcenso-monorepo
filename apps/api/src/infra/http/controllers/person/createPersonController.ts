import { Body, Controller, Post } from '@nestjs/common';
import { CreatePersonUseCase } from 'src/application/useCases/person/createPersonUseCase';

import { PrismaService } from 'src/infra/database/prisma/PrismaService';

import { CreatePersonRequests } from 'src/infra/http/dtos/createPersonRequests';
import { PersonPresenter } from 'src/infra/http/presenters/person.presenter';

@Controller('people')
export class CreatePersonController {
  constructor(
    private createPersonUseCase: CreatePersonUseCase,
    private prisma: PrismaService,
  ) {}
  @Post()
  async handle(@Body() input: CreatePersonRequests) {
    const person = await this.createPersonUseCase.execute(input);

    // Padroniza a resposta HTTP usando o Presenter
    return PersonPresenter.toDetailHTTP(person);
  }
}
