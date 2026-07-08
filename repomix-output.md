This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/domain, src/infrastructure, apps/web/app, apps/web/src, apps/api/src
- Files matching these patterns are excluded: **/.next/**, **/node_modules/**, node_modules/, **/dist/**, **/build/**, **/*.pcss, package-lock.json, yarn.lock, pnpm-lock.yaml, apps/api/src/generated/prisma/, apps/api/src/infra/database/database.module.js, apps/api/src/infra/http/http.module.js, apps/api/src/app.module.js, apps/api/src/main.js, apps/api/src/application/useCases/gender/createGenderUseCase.js, **.js, **/**.js
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
apps/
  api/
    src/
      application/
        useCases/
          gender/
            createGenderUseCase.ts
            deleteGenderUseCase.ts
            findAllGendersUseCase.ts
            findByAcronymGenderUseCase.ts
            findByIdGenderUseCase.ts
            findBySlugGenderUseCase.ts
            updateGenderUseCase.ts
          person/
            createPersonUseCase.ts
            deletePersonUseCase.ts
            findAllPersonUseCase.ts
            findByCpfPersonUseCase.ts
            findByIdPersonUseCase.ts
            updatePersonUseCase.ts
          sexuality/
            createSexualityUseCase.ts
            deleteSexualityUseCase.ts
            findAllSexualityUseCase.ts
            findByAcronymSexualityUseCase.ts
            findByIdSexualityUseCase.ts
            findBySlugSexualityUseCase.ts
            updateSexualityUseCase.ts
      domain/
        dtos/
          employmentDto.ts
          genderDto.ts
          personDto.ts
          sexualityDto.ts
          userDto.ts
        entities/
          address.ts
          employment.ts
          gender.ts
          person.ts
          sexuality.ts
          user.ts
        enums/
          pronouns.ts
        repositories/
          genderRepository.ts
          personRepository.ts
          sexualityRepository.ts
      infra/
        database/
          prisma/
            mappers/
              prismaGenderMapper.ts
              prismaPersonMapper.ts
              prismaSexualityMapper.ts
            repositories/
              primaPersonRepository.ts
              prismaGenderRepository.ts
              prismaSexualityRepository.ts
            PrismaService.ts
          database.module.ts
        http/
          controllers/
            gender/
              createGenderController.ts
              deleteGenderController.ts
              findAllGendersController.ts
              findByAcronymGenderController.ts
              findByIdGenderController.ts
              findBySlugGenderController.ts
              updateGenderController.ts
            person/
              createPersonController.ts
              deletePersonController.ts
              findAllPersonController.ts
              findByCpfPersonController.ts
              findByIdPersonController.ts
              updatePersonControllrt.ts
            sexuality/
              createSexualityController.ts
              deleteSexualityController.ts
              findAllSexualityController.ts
              findByAcronymSexualityController.ts
              findByIdSexualityController.ts
              findBySlugSexualityController.ts
              updateSexualityController.ts
          dtos/
            createGenderRequests.ts
            createPersonRequests.ts
            createSexualityRequests.ts
          http.module.ts
      app.module.ts
      main.ts
  web/
    app/
      form/
        page.tsx
      favicon.ico
      globals.css
      layout.tsx
      page.tsx
    src/
      application/
        hooks/
          useRegisterPerson.ts
      components/
        forms/
          PersonRegistrationForm.tsx
          SecureCivilName.tsx
          SocialNameInput.tsx
        ui/
          Card/
            CardContent.tsx
            CardHeader.tsx
            CardHeaderDescription.tsx
            CardHeaderTitle.tsx
            CardRoot.tsx
            index.tsx
          custom/
            Button.tsx
            Input.tsx
            Select.tsx
          button.tsx
          form.tsx
          input.tsx
          label.tsx
          select.tsx
        data-collection-form.tsx
        data-visualization.tsx
        glass-card.tsx
        PageBase.tsx
        secure-header.tsx
        theme-toggle.tsx
        utilComponent.tsx
      domain/
        enums/
          pronouns.ts
        repositories/
          person-repository.ts
        schemas/
          personSchema.ts
      infra/
        http/
          api-client.ts
          api.ts
          personRepository.ts
        mocks/
          identityMocks.ts
        repositories/
          person-http-repository.ts
      lib/
        utils.ts
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="apps/api/src/application/useCases/gender/createGenderUseCase.ts">
import { Gender } from 'src/domain/entities/gender';
import { GenderDTO } from '../../../domain/dtos/genderDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';
import { Injectable } from '@nestjs/common';

// 1. O Contrato de entrada (O que o formulário do Front vai enviar)
interface CreateGenderInput {
  title: string;
  acronym: string;
  description: string;
}
@Injectable()
export class CreateGenderUseCase {
  // 2. O Use Case recebe o repositório pelo construtor (Injeção de Dependência)
  constructor(
    private readonly genderRepository: GenderRepository,
    private readonly sexualityRepository: SexualityRepository,
  ) {}

  // 3. O método principal que executa a ação
  async execute(input: CreateGenderInput): Promise<GenderDTO> {
    // REGRA DE NEGÓCIO: Não permitir siglas duplicadas
    const alreadyExists = await this.genderRepository.findByAcronym(
      input.acronym,
    );

    const existsInSexuality = await this.sexualityRepository.findByAcronym(
      input.acronym,
    );

    if (alreadyExists || existsInSexuality) {
      throw new Error(`A sigla "${input.acronym}" já está cadastrada.`);
    }

    // 4. Criar a instância da Entidade (onde as validações internas rodam)
    const gender = new Gender({
      title: input.title,
      acronym: input.acronym,
      description: input.description,
      createdAt: new Date(),
      updatedAt: null,
    });

    // 5. Mandar o "porteiro" salvar no banco de dados
    await this.genderRepository.create(gender);

    // 6. Retornar o DTO (os dados prontos para o Front exibir)
    return gender.toDTO();
  }
}
</file>

<file path="apps/api/src/application/useCases/gender/deleteGenderUseCase.ts">
import { Injectable } from '@nestjs/common';
import { GenderRepository } from 'src/domain/repositories/genderRepository';

@Injectable()
export class DeleteGenderUseCase {
  constructor(private readonly genderRepository: GenderRepository) {}
  async execute(id: string): Promise<void> {
    await this.genderRepository.delete(id);
  }
}
</file>

<file path="apps/api/src/application/useCases/gender/findAllGendersUseCase.ts">
import { Injectable } from '@nestjs/common';
import { GenderDTO } from 'src/domain/dtos/genderDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';

@Injectable()
export class FindAllGendersUseCase {
  constructor(private readonly genderRepository: GenderRepository) {}
  async execute(): Promise<GenderDTO[]> {
    const genders = await this.genderRepository.listAll();

    return genders.map((gender) => gender.toDTO());
  }
}
</file>

<file path="apps/api/src/application/useCases/gender/findByAcronymGenderUseCase.ts">
import { Injectable } from '@nestjs/common';
import { GenderDTO } from 'src/domain/dtos/genderDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';

@Injectable()
export class FindByAcronymGenderUseCase {
  constructor(private readonly genderRepository: GenderRepository) {}
  async execute(acronym: string): Promise<GenderDTO> {
    const gender = await this.genderRepository.findByAcronym(acronym);
    if (!gender) {
      throw new Error('Gênero não encontrado');
    }
    return gender.toDTO();
  }
}
</file>

<file path="apps/api/src/application/useCases/gender/findByIdGenderUseCase.ts">
import { Injectable } from '@nestjs/common';
import { GenderDTO } from 'src/domain/dtos/genderDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';

@Injectable()
export class FindByIdGenderUseCase {
  constructor(private readonly genderRepository: GenderRepository) {}
  async execute(id: string): Promise<GenderDTO> {
    const gender = await this.genderRepository.findById(id);
    if (!gender) {
      throw new Error('Gênero não encontrado');
    }
    return gender.toDTO();
  }
}
</file>

<file path="apps/api/src/application/useCases/gender/findBySlugGenderUseCase.ts">
import { Injectable } from '@nestjs/common';
import { GenderDTO } from 'src/domain/dtos/genderDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';

@Injectable()
export class FindBySlugGenderUseCase {
  constructor(private readonly genderRepository: GenderRepository) {}
  async execute(slug: string): Promise<GenderDTO> {
    const gender = await this.genderRepository.findBySlug(slug);
    if (!gender) {
      throw new Error('Gênero não encontrado');
    }
    return gender.toDTO();
  }
}
</file>

<file path="apps/api/src/application/useCases/gender/updateGenderUseCase.ts">
import { Injectable } from '@nestjs/common';
import { GenderDTO } from 'src/domain/dtos/genderDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';
import { UpdateGenderRequests } from 'src/infra/http/dtos/createGenderRequests';

@Injectable()
export class UpdateGenderUseCase {
  constructor(private readonly genderRepository: GenderRepository) {}

  async execute(id: string, input: UpdateGenderRequests): Promise<GenderDTO> {
    const gender = await this.genderRepository.findById(id);
    if (!gender) {
      throw new Error('Gênero não encontrado');
    }
    gender.updateDetails({
      title: input.title,
      description: input.description,
    });
    await this.genderRepository.update(gender);

    return gender.toDTO();
  }
}
</file>

<file path="apps/api/src/application/useCases/person/createPersonUseCase.ts">
import { Injectable } from '@nestjs/common';
import { PersonDTO } from 'src/domain/dtos/personDto';
import { Person } from 'src/domain/entities/person';
import { Pronouns } from 'src/domain/enums/pronouns';
import { GenderRepository } from 'src/domain/repositories/genderRepository';
import { PersonRepository } from 'src/domain/repositories/personRepository';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

interface CreatePersonInput {
  civilName: string;
  socialName: string;
  slug: string;
  cpf: string;
  rg: string;
  genderId: string;
  sexualityId: string;
  birthDate: Date;
  pronouns: Pronouns;
}

@Injectable()
export class CreatePersonUseCase {
  constructor(
    private personRepository: PersonRepository,
    private genderRepository: GenderRepository,
    private sexualityRepository: SexualityRepository,
  ) {}

  async execute(input: CreatePersonInput): Promise<PersonDTO> {
    const gender = await this.genderRepository.findById(input.genderId);
    const sexuality = await this.sexualityRepository.findById(
      input.sexualityId,
    );

    if (!gender) throw new Error(`Gender not found`);
    if (!sexuality) throw new Error(`Sexuality not found`);
    const existingPersonCpf = await this.personRepository.findByCpf(input.cpf);
    if (existingPersonCpf) {
      throw new Error(`Cpf already exists`);
    }

    const existingPersonRg = await this.personRepository.findByRg(input.rg);
    if (existingPersonRg) {
      throw new Error(`Rg already exists`);
    }

    const existingSlug = await this.personRepository.findBySlug(input.slug);
    if (existingSlug) {
      throw new Error(`Slug already exists`);
    }

    const person = new Person({
      ...input,
      genderId: gender.id,
      sexualityId: sexuality.id,
    });
    await this.personRepository.create(person);

    return person.toDTO({
      gender: gender.toDTO(),
      sexuality: sexuality.toDTO(),
    });
  }
}
</file>

<file path="apps/api/src/application/useCases/person/deletePersonUseCase.ts">
import { Injectable } from '@nestjs/common';
import { PersonRepository } from 'src/domain/repositories/personRepository';

@Injectable()
export class DeletePersonUseCase {
  constructor(private readonly personRepository: PersonRepository) {}
  async execute(id: string): Promise<void> {
    await this.personRepository.delete(id);
  }
}
</file>

<file path="apps/api/src/application/useCases/person/findAllPersonUseCase.ts">
import { Injectable } from '@nestjs/common';
import { PersonDTO } from 'src/domain/dtos/personDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';
import { PersonRepository } from 'src/domain/repositories/personRepository';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

@Injectable()
export class FindAllPersonUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly genderRepository: GenderRepository,
    private readonly sexualityRepository: SexualityRepository,
  ) {}
  async execute(): Promise<PersonDTO[]> {
    const people = await this.personRepository.listAll();

    const peopleDTOs = await Promise.all(
      people.map(async (person) => {
        const genderEntity = await this.genderRepository.findById(
          person.genderId,
        );
        const sexualityEntity = await this.sexualityRepository.findById(
          person.sexualityId,
        );

        if (!genderEntity || !sexualityEntity) {
          throw new Error(
            `Relações não encontradas para a pessoa: ${person.id}`,
          );
        }

        return person.toDTO({
          gender: genderEntity.toDTO(),
          sexuality: sexualityEntity.toDTO(),
        });
      }),
    );
    return peopleDTOs;
  }
}
</file>

<file path="apps/api/src/application/useCases/person/findByCpfPersonUseCase.ts">
import { Injectable } from '@nestjs/common';
import { PersonDTO } from 'src/domain/dtos/personDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';
import { PersonRepository } from 'src/domain/repositories/personRepository';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

@Injectable()
export class FindByCpfPersonUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly genderRepository: GenderRepository,
    private readonly sexualityRepository: SexualityRepository,
  ) {}
  async execute(cpf: string): Promise<PersonDTO> {
    const person = await this.personRepository.findByCpf(cpf);

    if (!person) {
      throw new Error(`Pessoa com CPF "${cpf}" não encontrada.`);
    }
    const gender = await this.genderRepository.findById(person.genderId);
    const sexuality = await this.sexualityRepository.findById(
      person.sexualityId,
    );

    if (!gender || !sexuality) {
      throw new Error(
        `Relacionamentos de Gênero ou Sexualidade não encontrados para esta pessoa.`,
      );
    }

    return person.toDTO({
      gender: gender.toDTO(),
      sexuality: sexuality.toDTO(),
    });
  }
}
</file>

<file path="apps/api/src/application/useCases/person/findByIdPersonUseCase.ts">
import { Injectable } from '@nestjs/common';
import { PersonDTO } from 'src/domain/dtos/personDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';
import { PersonRepository } from 'src/domain/repositories/personRepository';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

@Injectable()
export class FindByIdPersonUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly genderRepository: GenderRepository,
    private readonly sexualityRepository: SexualityRepository,
  ) {}
  async execute(id: string): Promise<PersonDTO> {
    const person = await this.personRepository.findById(id);

    if (!person) {
      throw new Error(`Pessoa com ID "${id}" não encontrada.`);
    }
    const gender = await this.genderRepository.findById(person.genderId);
    const sexuality = await this.sexualityRepository.findById(
      person.sexualityId,
    );

    if (!gender || !sexuality) {
      throw new Error(
        `Relacionamentos de Gênero ou Sexualidade não encontrados para esta pessoa.`,
      );
    }

    return person.toDTO({
      gender: gender.toDTO(),
      sexuality: sexuality.toDTO(),
    });
  }
}
</file>

<file path="apps/api/src/application/useCases/person/updatePersonUseCase.ts">
import { Injectable } from '@nestjs/common';
import { PersonDTO } from 'src/domain/dtos/personDto';
import { GenderRepository } from 'src/domain/repositories/genderRepository';
import { PersonRepository } from 'src/domain/repositories/personRepository';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';
import { UpdatePersonRequests } from 'src/infra/http/dtos/createPersonRequests';

@Injectable()
export class UpdatePersonUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly genderRepository: GenderRepository,
    private readonly sexualityRepository: SexualityRepository,
  ) {}

  async execute(id: string, input: UpdatePersonRequests): Promise<PersonDTO> {
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error('Pessoa não encontrada');
    }

    const genderExistis = await this.genderRepository.findById(input.genderId);
    if (!genderExistis) {
      throw new Error('Gênero não encontrado');
    }

    const sexualityExists = await this.sexualityRepository.findById(
      input.sexualityId,
    );
    if (!sexualityExists) {
      throw new Error('Sexualidade não encontrada');
    }

    person.updateDetails({
      civilName: input.civilName,
      socialName: input.socialName,
      genderId: input.genderId,
      sexualityId: input.sexualityId,
    });

    await this.personRepository.update(person);

    return person.toDTO({
      gender: genderExistis.toDTO(),
      sexuality: sexualityExists.toDTO(),
    });
  }
}
</file>

<file path="apps/api/src/application/useCases/sexuality/createSexualityUseCase.ts">
import { Injectable } from '@nestjs/common';
import { SexualityDTO } from 'src/domain/dtos/sexualityDto';
import { Sexuality } from 'src/domain/entities/sexuality';
import { GenderRepository } from 'src/domain/repositories/genderRepository';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

interface CreateSexualityInput {
  title: string;
  acronym: string;
  description: string;
}

@Injectable()
export class CreateSexualityUseCase {
  constructor(
    private readonly sexualityRepository: SexualityRepository,
    private readonly genderRepository: GenderRepository,
  ) {}

  async execute(input: CreateSexualityInput): Promise<SexualityDTO> {
    const alreadyExists = await this.genderRepository.findByAcronym(
      input.acronym,
    );

    const existsInGender = await this.genderRepository.findByAcronym(
      input.acronym,
    );

    if (alreadyExists || existsInGender) {
      throw new Error(`A sigla "${input.acronym}" já está cadastrada.`);
    }

    const sexuality = new Sexuality({
      title: input.title,
      acronym: input.acronym,
      description: input.description,
      createdAt: new Date(),
      updatedAt: null,
    });

    await this.sexualityRepository.create(sexuality);

    // 6. Retornar o DTO (os dados prontos para o Front exibir)
    return sexuality.toDTO();
  }
}
</file>

<file path="apps/api/src/application/useCases/sexuality/deleteSexualityUseCase.ts">
import { Injectable } from '@nestjs/common';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

@Injectable()
export class DeleteSexualityUseCase {
  constructor(private readonly sexualityRepository: SexualityRepository) {}
  async execute(id: string): Promise<void> {
    await this.sexualityRepository.delete(id);
  }
}
</file>

<file path="apps/api/src/application/useCases/sexuality/findAllSexualityUseCase.ts">
import { Injectable } from '@nestjs/common';
import { SexualityDTO } from 'src/domain/dtos/sexualityDto';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

@Injectable()
export class FindAllSexualityUseCase {
  constructor(private readonly sexualityRepository: SexualityRepository) {}
  async execute(): Promise<SexualityDTO[]> {
    const sexualities = await this.sexualityRepository.listAll();

    return sexualities.map((sexuality) => sexuality.toDTO());
  }
}
</file>

<file path="apps/api/src/application/useCases/sexuality/findByAcronymSexualityUseCase.ts">
import { Injectable } from '@nestjs/common';
import { SexualityDTO } from 'src/domain/dtos/sexualityDto';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

@Injectable()
export class FindByAcronymSexualityUseCase {
  constructor(private readonly sexualityRepository: SexualityRepository) {}

  async execute(acronym: string): Promise<SexualityDTO> {
    const sexuality = await this.sexualityRepository.findByAcronym(acronym);

    if (!sexuality) {
      throw new Error(`Sexualidade com acrônimo "${acronym}" não encontrada.`);
    }

    return sexuality.toDTO();
  }
}
</file>

<file path="apps/api/src/application/useCases/sexuality/findByIdSexualityUseCase.ts">
import { Injectable } from '@nestjs/common';
import { SexualityDTO } from 'src/domain/dtos/sexualityDto';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

@Injectable()
export class FindByIdSexualityUseCase {
  constructor(private readonly sexualityRepository: SexualityRepository) {}

  async execute(id: string): Promise<SexualityDTO> {
    const sexuality = await this.sexualityRepository.findById(id);

    if (!sexuality) {
      throw new Error(`Sexualidade com ID "${id}" não encontrada.`);
    }

    return sexuality.toDTO();
  }
}
</file>

<file path="apps/api/src/application/useCases/sexuality/findBySlugSexualityUseCase.ts">
import { Injectable } from '@nestjs/common';
import { SexualityDTO } from 'src/domain/dtos/sexualityDto';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';

@Injectable()
export class FindBySlugSexualityUseCase {
  constructor(private readonly sexualityRepository: SexualityRepository) {}

  async execute(slug: string): Promise<SexualityDTO> {
    const sexuality = await this.sexualityRepository.findBySlug(slug);

    if (!sexuality) {
      throw new Error(`Sexualidade com slug "${slug}" não encontrada.`);
    }

    return sexuality.toDTO();
  }
}
</file>

<file path="apps/api/src/application/useCases/sexuality/updateSexualityUseCase.ts">
import { Injectable } from '@nestjs/common';
import { SexualityDTO } from 'src/domain/dtos/sexualityDto';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';
import { UpdateSexualityRequests } from 'src/infra/http/dtos/createSexualityRequests';

@Injectable()
export class UpdateSexualityUseCase {
  constructor(private readonly sexualityRepository: SexualityRepository) {}
  async execute(
    id: string,
    input: UpdateSexualityRequests,
  ): Promise<SexualityDTO> {
    const sexuality = await this.sexualityRepository.findById(id);

    if (!sexuality) {
      throw new Error('Sexualidade não encontrada');
    }

    sexuality.updateDetails({
      title: input.title,
      description: input.description,
    });

    await this.sexualityRepository.update(sexuality);

    return sexuality.toDTO();
  }
}
</file>

<file path="apps/api/src/domain/dtos/employmentDto.ts">
export enum TypeJob {
  online = 'online',
  presencial = 'presencial',
  hybrid = 'híbrido',
}
export interface EmploymentDTO {
  title: string;
  typeEmployment: string;
  company: string;
  worksActually: boolean;
  createdAt: Date;
  updatedAt?: Date;
  description: string;
  skills: string[];
  location: string;
  typeJob: TypeJob;
  position: string;
  startDate: Date;
  endDate?: Date;
}
</file>

<file path="apps/api/src/domain/dtos/genderDto.ts">
export interface GenderDTO {
  id: string;
  title: string;
  description: string;
  acronym: string;
}
</file>

<file path="apps/api/src/domain/dtos/personDto.ts">
import { GenderDTO } from 'src/domain/dtos/genderDto';
import { SexualityDTO } from 'src/domain/dtos/sexualityDto';
import { Pronouns } from 'src/domain/enums/pronouns';

export interface PersonDTO {
  id: string;
  // civilName: string; não é necessário, pois o nome Social deve ser utilizado para identificação da pessoa em todas as telas do sistema, e o nome civil deve ser utilizado apenas para fins jurídicos, de registro e documentação.
  socialName: string;
  slug: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  gender: GenderDTO;
  sexuality: SexualityDTO;
  pronouns: Pronouns;
}
</file>

<file path="apps/api/src/domain/dtos/sexualityDto.ts">
export interface SexualityDTO {
  id: string;
  title: string;
  description: string;
  acronym: string;
}
</file>

<file path="apps/api/src/domain/dtos/userDto.ts">
export interface UserDTO {
  id: string;
  name: string;
  email: string;
  token: string;
}
</file>

<file path="apps/api/src/domain/entities/address.ts">
interface AddressProps {
  id?: string;
  street: string;
  number?: string;
  hasNumber: boolean;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  cellPhone: string;
  email: string;
}

export class Address {
  private props: AddressProps;
  private _id: string;

  constructor(props: AddressProps) {
    this._id = props.id ?? crypto.randomUUID();

    if (props.hasNumber && (!props.number || props.number.trim() === '')) {
      throw new Error(
        'O número é obrigatório quando Sem Número não estiver marcado.',
      );
    }

    if (!props.street || props.street.trim() === '') {
      throw new Error('A rua é obrigatória.');
    }

    if (!props.neighborhood || props.neighborhood.trim() === '') {
      throw new Error('O bairro é obrigatório.');
    }

    if (!props.city || props.city.trim() === '') {
      throw new Error('A cidade é obrigatória.');
    }

    if (!props.state || props.state.trim() === '') {
      throw new Error('O estado é obrigatório.');
    }

    if (!props.zipCode || props.zipCode.trim() === '') {
      throw new Error('O CEP é obrigatório.');
    }

    if (!props.country || props.country.trim() === '') {
      throw new Error('O país é obrigatório.');
    }
  }

  get id() {
    return this._id;
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get hasNumber() {
    return this.props.hasNumber;
  }

  get complement() {
    return this.props.complement;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }
  get zipCode() {
    return this.props.zipCode;
  }
  get country() {
    return this.props.country;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get cellPhone() {
    return this.props.cellPhone;
  }
  get email() {
    return this.props.email;
  }

  toDTO(): AddressProps {
    return {
      id: this._id,
      street: this.street,
      number: this.number,
      hasNumber: this.hasNumber,
      complement: this.complement,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      country: this.country,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      cellPhone: this.cellPhone,
      email: this.email,
    };
  }
}
</file>

<file path="apps/api/src/domain/entities/employment.ts">
import { EmploymentDTO, TypeJob } from 'src/domain/dtos/employmentDto';

interface EmploymentProps {
  title: string;
  typeEmployment: string;
  company: string;
  worksActually: boolean;
  createdAt: Date;
  updatedAt?: Date;
  description: string;
  skills: string[];
  location: string;
  typeJob: TypeJob;
  position: string;
  startDate: Date;
  endDate?: Date;
}

export class Employment {
  private props: EmploymentProps;

  constructor(props: EmploymentProps) {
    this.props = props;
  }

  get title(): string {
    return this.props.title;
  }

  get typeEmployment(): string {
    return this.props.typeEmployment;
  }

  get company(): string {
    return this.props.company;
  }

  get worksActually(): boolean {
    return this.props.worksActually;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get description(): string {
    return this.props.description;
  }

  get skills(): string[] {
    return this.props.skills;
  }

  get location(): string {
    return this.props.location;
  }

  get typeJob(): TypeJob {
    return this.props.typeJob;
  }

  get position(): string {
    return this.props.position;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date | undefined {
    return this.props.endDate;
  }

  toDTO(): EmploymentDTO {
    return {
      title: this.title,
      typeEmployment: this.typeEmployment,
      company: this.company,
      worksActually: this.worksActually,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      description: this.description,
      skills: this.skills,
      location: this.location,
      typeJob: this.typeJob,
      position: this.position,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}
</file>

<file path="apps/api/src/domain/entities/gender.ts">
import { GenderDTO } from 'src/domain/dtos/genderDto';

export interface GenderProps {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  acronym: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Gender {
  private props: GenderProps;
  private _id: string;

  constructor(props: GenderProps) {
    this._id = props.id ?? crypto.randomUUID();
    if (!props.title || props.title.trim() === '') {
      throw new Error('O título é obrigatório.');
    }

    if (props.acronym.length !== 3) {
      throw new Error('A sigla deve ter exatamente 3 caracteres.');
    }

    // colocar a lógica de que não pode ter duas siglas iguais, ou seja, não pode ter dois gêneros com a mesma sigla. Isso é importante para garantir a integridade dos dados e evitar confusões na hora de identificar os gêneros.
    const normalizedSigla = props.acronym.trim().toUpperCase();

    if (normalizedSigla.length < 2 || normalizedSigla.length > 5) {
      throw new Error('A sigla deve ter entre 3 e 5 caracteres.');
    }

    const generatedSlug = props.title
      .toLowerCase()
      .trim()
      .normalize('NFD') // Remove acentos
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');

    this.props = {
      ...props,
      slug: props.slug ?? generatedSlug,
      acronym: normalizedSigla,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public updateDetails(props: { title: string; description: string }) {
    this.props.title = props.title;
    this.props.description = props.description;
    this.props.updatedAt = new Date(); // O Domínio dita quando a data muda!
  }

  get id() {
    return this._id;
  }

  get title() {
    return this.props.title;
  }

  get acronym() {
    return this.props.acronym;
  }
  get description() {
    return this.props.description;
  }
  get slug() {
    return this.props.slug;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  toDTO(): GenderDTO {
    return {
      id: this.id,
      title: this.title,
      acronym: this.acronym,
      description: this.description,
    };
  }
}
</file>

<file path="apps/api/src/domain/entities/person.ts">
import { GenderDTO } from 'src/domain/dtos/genderDto';
import { PersonDTO } from 'src/domain/dtos/personDto';
import { SexualityDTO } from 'src/domain/dtos/sexualityDto';
import { Pronouns } from 'src/domain/enums/pronouns';

// a interface é para definir o que vamos receber no formulário, ou seja, os dados que vamos usar para criar uma pessoa no banco.
export interface PersonProps {
  id?: string;
  civilName: string;
  slug?: string;
  genderId: string;
  sexualityId: string;
  socialName: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  pronouns: Pronouns;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Person {
  // encapsulamento: a classe Person tem uma propriedade privada props, que é do tipo PersonProps. Isso significa que só podemos acessar os dados da pessoa através dos métodos da classe, e não diretamente. Significa que ninguém de fora pode chegar e mudar o nome da pessoa sem passar pelas regras da classe.
  private props: PersonProps;
  private _id: string;

  // O constructor:  É o guarda da porta. Quando você der um new Person(...), o código dentro do construtor roda imediatamente.
  constructor(props: PersonProps) {
    this._id = props.id ?? crypto.randomUUID();
    if (!props.civilName || props.civilName.trim() === '') {
      throw new Error('O nome civil é obrigatório.');
    }

    if (props.birthDate > new Date()) {
      throw new Error('A data de nascimento não pode ser no futuro.');
    }

    const generatedSlug = props.civilName
      .toLowerCase()
      .trim()
      .normalize('NFD') // Remove acentos
      .replace(/[\u0300-\u036f]/g, '') // Remove caracteres de acentos"")
      .replace(/\s+/g, '-');

    this.props = {
      ...props,
      slug: props.slug ?? generatedSlug,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id() {
    return this._id;
  }
  get civilName() {
    return this.props.civilName;
  }

  get socialName() {
    return this.props.socialName;
  }

  get slug() {
    return this.props.slug;
  }

  get cpf() {
    return this.props.cpf;
  }

  get rg() {
    return this.props.rg;
  }

  get birthDate() {
    return this.props.birthDate;
  }

  get pronouns() {
    return this.props.pronouns;
  }
  get genderId() {
    return this.props.genderId;
  }
  get sexualityId() {
    return this.props.sexualityId;
  }

  public updateDetails(props: {
    civilName: string;
    socialName?: string;
    genderId: string;
    sexualityId: string;
  }) {
    this.props.civilName = props.civilName;
    this.props.socialName = props.socialName;
    this.props.genderId = props.genderId;
    this.props.sexualityId = props.sexualityId;
    this.props.updatedAt = new Date(); // O Domínio dita a alteração
  }

  // Os getters :  Como as propriedades são privadas (private), os getters funcionam como uma janela. Você pode ver o nome (person.civilName), mas não pode alterá-lo diretamente (person.civilName = "Outro") sem criar um método específico para isso.

  public toDTO(relations: {
    gender: GenderDTO;
    sexuality: SexualityDTO;
  }): PersonDTO {
    return {
      id: this._id,
      // civilName: this.civilName, não é necessário, pois o nome Social deve ser utilizado para identificação da pessoa em todas as telas do sistema, e o nome civil deve ser utilizado apenas para fins jurídicos, de registro e documentação.
      socialName: this.socialName || this.civilName,
      slug: this.slug,
      cpf: this.cpf,
      rg: this.rg,
      birthDate: this.birthDate,
      pronouns: this.props.pronouns,
      gender: relations.gender,
      sexuality: relations.sexuality,
    };
  }

  // Se um dia o módulo administrativo precisar do nome civil estrito:
  public getCivilNameForLegalPurposes(): string {
    return this.civilName;
  }
}
</file>

<file path="apps/api/src/domain/entities/sexuality.ts">
import { SexualityDTO } from 'src/domain/dtos/sexualityDto';

export interface SexualityProps {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  acronym: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Sexuality {
  private props: SexualityProps;
  private _id: string;

  constructor(props: SexualityProps) {
    this._id = props.id ?? crypto.randomUUID();

    if (!props.title || props.title.trim() === '') {
      throw new Error('O título é obrigatório.');
    }

    // colocar a lógica de que não pode ter duas siglas iguais, ou seja, não pode ter dois gêneros com a mesma sigla. Isso é importante para garantir a integridade dos dados e evitar confusões na hora de identificar os gêneros.
    const normalizedSigla = props.acronym.trim().toUpperCase();

    if (normalizedSigla.length < 2 || normalizedSigla.length > 5) {
      throw new Error('A sigla deve ter entre 3 e 5 caracteres.');
    }

    const generatedSlug = props.title
      .toLowerCase()
      .trim()
      .normalize('NFD') // Remove acentos
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');

    this.props = {
      ...props,
      slug: props.slug ?? generatedSlug,
      acronym: normalizedSigla,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public updateDetails(props: { title: string; description: string }) {
    this.props.title = props.title;
    this.props.description = props.description;
    this.props.updatedAt = new Date(); // O Domínio dita quando a data muda!
  }

  get id() {
    return this._id;
  }

  get title() {
    return this.props.title;
  }

  get acronym() {
    return this.props.acronym;
  }
  get description() {
    return this.props.description;
  }
  get slug() {
    return this.props.slug;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  toDTO(): SexualityDTO {
    return {
      id: this.id,
      title: this.title,
      acronym: this.acronym,
      description: this.description,
    };
  }
}
</file>

<file path="apps/api/src/domain/entities/user.ts">
import { UserDTO } from 'src/domain/dtos/userDto';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserProps;
  private _id: string;

  constructor(props: UserProps) {
    this._id = props.id ?? crypto.randomUUID();
    if (!props.name || props.name.trim() === '') {
      throw new Error('O nome é obrigatório.');
    }
    if (!props.email || props.email.trim() === '') {
      throw new Error('O email é obrigatório.');
    }
    if (!props.password || props.password.trim() === '') {
      throw new Error('A senha é obrigatória.');
    }

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  toDTO(): UserDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      token: this.props.token,
    };
  }
}
</file>

<file path="apps/api/src/domain/enums/pronouns.ts">
export enum Pronouns {
  ELE_DELE = 'Ele/Dele',
  ELA_DELA = 'Ela/Dela',
  ELU_DELU = 'Elu/Delu',
  NEUTRO = 'Neutro',
  OUTROS = 'Outros/Neutro',
}
</file>

<file path="apps/api/src/domain/repositories/genderRepository.ts">
import { Gender } from 'src/domain/entities/gender';

export abstract class GenderRepository {
  abstract create(gender: Gender): Promise<void>;
  abstract findById(id: string): Promise<Gender | null>;
  abstract findBySlug(slug: string): Promise<Gender | null>;
  abstract findByAcronym(acronym: string): Promise<Gender | null>;
  abstract listAll(): Promise<Gender[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(gender: Gender): Promise<void>;
}
</file>

<file path="apps/api/src/domain/repositories/personRepository.ts">
import { Person } from 'src/domain/entities/person';

// O Repositório é o Porteiro do seu Banco de Dados.

// O seu Banco de Dados (Prisma, Postgres, etc.) é um lugar cheio de tabelas e dados brutos.

// A sua Entidade (a classe Person que você criou) é um objeto inteligente com regras.

// O Repositório é quem faz a ponte entre esses dois. Ele pega o "dado bruto" do banco e transforma na sua "Entidade" (e vice-versa).

// "Olha, eu ainda não decidi qual banco de dados vou usar. Mas eu aviso que, seja qual for o banco, o meu 'Porteiro de Pessoas' precisa saber fazer essas buscas (CPF, RG, ID) e saber salvar (Create).";
// import { Person } from 'src/domain/entities/Person';

export abstract class PersonRepository {
  abstract create(person: Person): Promise<void>;
  abstract findById(id: string): Promise<Person | null>;
  abstract findBySlug(slug: string): Promise<Person | null>;
  abstract findByCpf(cpf: string): Promise<Person | null>;
  abstract findByRg(rg: string): Promise<Person | null>;
  abstract listAll(): Promise<Person[]>;
  abstract update(person: Person): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
</file>

<file path="apps/api/src/domain/repositories/sexualityRepository.ts">
import { Sexuality } from 'src/domain/entities/sexuality';

export abstract class SexualityRepository {
  abstract create(sexuality: Sexuality): Promise<void>;
  abstract findById(id: string): Promise<Sexuality | null>;
  abstract findBySlug(slug: string): Promise<Sexuality | null>;
  abstract findByAcronym(acronym: string): Promise<Sexuality | null>;
  abstract listAll(): Promise<Sexuality[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(sexuality: Sexuality): Promise<void>;
}
</file>

<file path="apps/api/src/infra/database/prisma/mappers/prismaGenderMapper.ts">
import { Gender } from '../../../../domain/entities/gender';
import { Gender as PrismaGender } from '../../../../generated/prisma/client';

export class PrismaGenderMapper {
  static toPrisma(gender: Gender) {
    return {
      id: gender.id,
      title: gender.title,
      acronym: gender.acronym,
      description: gender.description,
      slug: gender.slug,
      createdAt: gender.createdAt,
      updatedAt: gender.updatedAt,
    };
  }

  static toDomain(raw: PrismaGender): Gender {
    return new Gender({
      id: raw.id,
      title: raw.title,
      acronym: raw.acronym,
      description: raw.description,
      slug: raw.slug,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? undefined,
    });
  }
}
</file>

<file path="apps/api/src/infra/database/prisma/mappers/prismaPersonMapper.ts">
import { Person } from '../../../../domain/entities/person';
import { Pronouns } from '../../../../domain/enums/pronouns';
import {
  Gender as PrismaGender,
  Person as PrismaPerson,
  Sexuality as PrismaSexuality,
} from 'src/generated/prisma';

type PrismaPersonWithRelations = PrismaPerson & {
  gender?: PrismaGender;
  sexuality?: PrismaSexuality;
};

export class PrismaPersonMapper {
  static toPrisma(person: Person) {
    return {
      id: person.id,
      civilName: person.civilName,
      socialName: person.socialName,
      birthDate: person.birthDate,
      cpf: person.cpf,
      rg: person.rg,
      pronouns: person.pronouns,
      slug: person.slug,
      genderId: person.genderId,
      sexualityId: person.sexualityId,
    };
  }

  static toDomain(raw: PrismaPersonWithRelations): Person {
    return new Person({
      id: raw.id,
      civilName: String(raw.civilName),
      socialName: raw.socialName ? String(raw.socialName) : undefined,
      birthDate: raw.birthDate,
      cpf: raw.cpf,
      rg: raw.rg,
      pronouns: raw.pronouns as Pronouns,
      slug: raw.slug,
      genderId: raw.genderId,
      sexualityId: raw.sexualityId,
    });
  }
}
</file>

<file path="apps/api/src/infra/database/prisma/mappers/prismaSexualityMapper.ts">
import { Sexuality } from '../../../../domain/entities/sexuality';
import { Sexuality as PrismaSexuality } from '../../../../generated/prisma/client';

export class PrismaSexualityMapper {
  static toPrisma(sexuality: Sexuality) {
    return {
      id: sexuality.id,
      title: sexuality.title,
      acronym: sexuality.acronym,
      description: sexuality.description,
      slug: sexuality.slug,
      createdAt: sexuality.createdAt,
      updatedAt: sexuality.updatedAt,
    };
  }

  static toDomain(raw: PrismaSexuality): Sexuality {
    return new Sexuality({
      id: raw.id,
      title: raw.title,
      acronym: raw.acronym,
      description: raw.description ?? '',
      slug: raw.slug,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? undefined,
    });
  }
}
</file>

<file path="apps/api/src/infra/database/prisma/repositories/primaPersonRepository.ts">
import { Injectable } from '@nestjs/common';

import { Person } from '../../../../domain/entities/person';

import { PersonRepository } from 'src/domain/repositories/personRepository';
import { PrismaPersonMapper } from '../../../../infra/database/prisma/mappers/prismaPersonMapper';
import { PrismaService } from '../PrismaService';

@Injectable()
export class PrismaPersonRepository implements PersonRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: { id },
      include: {
        gender: true, // Traz os dados da tabela Gender
        sexuality: true, // Traz os dados da tabela Sexuality
      },
    });

    if (!person) return null;

    return PrismaPersonMapper.toDomain(person);
  }

  async findBySlug(slug: string): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: { slug },
    });

    if (!person) return null;

    return PrismaPersonMapper.toDomain(person);
  }
  async findByCpf(cpf: string): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: { cpf },
    });

    if (!person) return null;

    return PrismaPersonMapper.toDomain(person);
  }
  async findByRg(rg: string): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: { rg },
    });

    if (!person) return null;

    return PrismaPersonMapper.toDomain(person);
  }
  async listAll(): Promise<Person[]> {
    const people = await this.prisma.person.findMany();

    return people.map((person) => PrismaPersonMapper.toDomain(person));
  }

  async create(person: Person): Promise<void> {
    const data = PrismaPersonMapper.toPrisma(person);

    await this.prisma.person.create({
      data,
    });
  }
  async update(person: Person): Promise<void> {
    const data = PrismaPersonMapper.toPrisma(person);
    await this.prisma.person.update({
      where: { id: person.id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.person.delete({
      where: { id },
    });
  }
}
</file>

<file path="apps/api/src/infra/database/prisma/repositories/prismaGenderRepository.ts">
import { Injectable } from '@nestjs/common';
import { Gender } from '../../../../domain/entities/gender';
import { GenderRepository } from '../../../../domain/repositories/genderRepository';
import { PrismaGenderMapper } from '../mappers/prismaGenderMapper';
import { PrismaService } from '../PrismaService';

@Injectable()
export class PrismaGenderRepository implements GenderRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Gender | null> {
    const gender = await this.prisma.gender.findUnique({
      where: { id },
    });

    if (!gender) return null;

    return PrismaGenderMapper.toDomain(gender);
  }

  async findBySlug(slug: string): Promise<Gender | null> {
    const gender = await this.prisma.gender.findUnique({
      where: { slug },
    });

    if (!gender) return null;

    return PrismaGenderMapper.toDomain(gender);
  }

  async listAll(): Promise<Gender[]> {
    const genders = await this.prisma.gender.findMany();

    return genders.map((g) => PrismaGenderMapper.toDomain(g));
  }

  async findByAcronym(acronym: string): Promise<Gender | null> {
    const gender = await this.prisma.gender.findUnique({
      where: { acronym },
    });

    if (!gender) return null;

    return PrismaGenderMapper.toDomain(gender);
  }

  async create(gender: Gender): Promise<void> {
    const data = PrismaGenderMapper.toPrisma(gender);

    await this.prisma.gender.create({
      data: {
        ...data,
        updatedAt: data.updatedAt ?? undefined,
      },
    });
  }

  async update(gender: Gender): Promise<void> {
    const data = PrismaGenderMapper.toPrisma(gender);
    await this.prisma.gender.update({
      where: { id: gender.id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.gender.delete({
      where: { id },
    });
  }
}
</file>

<file path="apps/api/src/infra/database/prisma/repositories/prismaSexualityRepository.ts">
import { Injectable } from '@nestjs/common';
import { Sexuality } from '../../../../domain/entities/sexuality';

import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';
import { PrismaSexualityMapper } from '../../../../infra/database/prisma/mappers/prismaSexualityMapper';
import { PrismaService } from '../../../../infra/database/prisma/PrismaService';

@Injectable()
export class PrismaSexualityRepository implements SexualityRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Sexuality | null> {
    const sexuality = await this.prisma.sexuality.findUnique({
      where: { id },
    });

    if (!sexuality) return null;

    return PrismaSexualityMapper.toDomain(sexuality);
  }

  async findBySlug(slug: string): Promise<Sexuality | null> {
    const sexuality = await this.prisma.sexuality.findUnique({
      where: { slug },
    });

    if (!sexuality) return null;

    return PrismaSexualityMapper.toDomain(sexuality);
  }

  async listAll(): Promise<Sexuality[]> {
    const sexualities = await this.prisma.sexuality.findMany();

    return sexualities.map((s) => PrismaSexualityMapper.toDomain(s));
  }

  async findByAcronym(acronym: string): Promise<Sexuality | null> {
    const sexuality = await this.prisma.sexuality.findUnique({
      where: { acronym },
    });

    if (!sexuality) return null;

    return PrismaSexualityMapper.toDomain(sexuality);
  }

  async create(sexuality: Sexuality): Promise<void> {
    const data = PrismaSexualityMapper.toPrisma(sexuality);
    await this.prisma.sexuality.create({
      data: {
        ...data,
        updatedAt: data.updatedAt ?? undefined,
      },
    });
  }

  async update(sexuality: Sexuality): Promise<void> {
    const data = PrismaSexualityMapper.toPrisma(sexuality);
    await this.prisma.sexuality.update({
      where: { id: sexuality.id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.sexuality.delete({
      where: { id },
    });
  }
}
</file>

<file path="apps/api/src/infra/database/prisma/PrismaService.ts">
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client.js';

import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
}
</file>

<file path="apps/api/src/infra/database/database.module.ts">
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/PrismaService';
import { PrismaPersonRepository } from 'src/infra/database/prisma/repositories/primaPersonRepository';
import { PrismaGenderRepository } from 'src/infra/database/prisma/repositories/prismaGenderRepository';
import { PrismaSexualityRepository } from 'src/infra/database/prisma/repositories/prismaSexualityRepository';
import { GenderRepository } from 'src/domain/repositories/genderRepository';
import { SexualityRepository } from 'src/domain/repositories/sexualityRepository';
import { PersonRepository } from 'src/domain/repositories/personRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: GenderRepository,
      useClass: PrismaGenderRepository,
    },
    {
      provide: SexualityRepository,
      useClass: PrismaSexualityRepository,
    },
    {
      provide: PersonRepository,
      useClass: PrismaPersonRepository,
    },
  ],
  exports: [
    PrismaService,
    GenderRepository,
    SexualityRepository,
    PersonRepository,
  ],
})
export class DatabaseModule {}
</file>

<file path="apps/api/src/infra/http/controllers/gender/createGenderController.ts">
import { Body, Controller, Post } from '@nestjs/common';
import { CreateGenderUseCase } from 'src/application/useCases/gender/createGenderUseCase';
import { CreateGenderRequests } from 'src/infra/http/dtos/createGenderRequests';

@Controller('genders')
export class CreateGenderController {
  constructor(private readonly createGenderUseCase: CreateGenderUseCase) {}

  @Post()
  async handle(@Body() input: CreateGenderRequests) {
    const result = await this.createGenderUseCase.execute(input);

    return result;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/gender/deleteGenderController.ts">
import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteGenderUseCase } from 'src/application/useCases/gender/deleteGenderUseCase';

@Controller('genders')
export class DeleteGenderController {
  constructor(private readonly deleteGenderUseCase: DeleteGenderUseCase) {}
  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.deleteGenderUseCase.execute(id);

    return 'Deletado com sucesso';
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/gender/findAllGendersController.ts">
import { Controller, Get } from '@nestjs/common';
import { FindAllGendersUseCase } from 'src/application/useCases/gender/findAllGendersUseCase';

@Controller('genders')
export class FindAllGendersController {
  constructor(private readonly findAllGendersUseCase: FindAllGendersUseCase) {}

  @Get()
  async handle() {
    const genders = await this.findAllGendersUseCase.execute();

    return genders;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/gender/findByAcronymGenderController.ts">
import { Controller, Get, Param } from '@nestjs/common';
import { FindByAcronymGenderUseCase } from 'src/application/useCases/gender/findByAcronymGenderUseCase';

@Controller('genders')
export class FindByAcronymGenderController {
  constructor(
    private readonly findByAcronymGenderUseCase: FindByAcronymGenderUseCase,
  ) {}
  /* tem que colocar um nome fixo antes porque vai buscar por id, acronum e acronym, se não ele vai se perder e não vai saber qual rota buscar. */
  @Get('acronym/:acronym')
  async handle(@Param('acronym') slug: string) {
    const gender = await this.findByAcronymGenderUseCase.execute(slug);

    return gender;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/gender/findByIdGenderController.ts">
import { Controller, Get, Param } from '@nestjs/common';
import { FindByIdGenderUseCase } from 'src/application/useCases/gender/findByIdGenderUseCase';

@Controller('genders')
export class FindByIdGenderController {
  constructor(private readonly findByIdGenderUseCase: FindByIdGenderUseCase) {}
  /* tem que colocar um nome fixo antes porque vai buscar por id, acronum e slug, se não ele vai se perder e não vai saber qual rota buscar. */
  @Get('id/:id')
  async handle(@Param('id') id: string) {
    const gender = await this.findByIdGenderUseCase.execute(id);

    return gender;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/gender/findBySlugGenderController.ts">
import { Controller, Get, Param } from '@nestjs/common';
import { FindBySlugGenderUseCase } from 'src/application/useCases/gender/findBySlugGenderUseCase';

@Controller('genders')
export class FindBySlugGenderController {
  constructor(
    private readonly findBySlugGenderUseCase: FindBySlugGenderUseCase,
  ) {}
  /* tem que colocar um nome fixo antes porque vai buscar por id, acronum e slug, se não ele vai se perder e não vai saber qual rota buscar. */
  @Get('slug/:slug')
  async handle(@Param('slug') slug: string) {
    const gender = await this.findBySlugGenderUseCase.execute(slug);

    return gender;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/gender/updateGenderController.ts">
import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateGenderUseCase } from 'src/application/useCases/gender/updateGenderUseCase';
import { UpdateGenderRequests } from 'src/infra/http/dtos/createGenderRequests';

@Controller('genders')
export class UpdateGendersController {
  constructor(private readonly updateGenderUseCase: UpdateGenderUseCase) {}

  @Put(':id')
  async handle(@Param('id') id: string, @Body() input: UpdateGenderRequests) {
    const gender = await this.updateGenderUseCase.execute(id, input);
    return gender;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/person/createPersonController.ts">
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePersonUseCase } from 'src/application/useCases/person/createPersonUseCase';

import { PrismaService } from 'src/infra/database/prisma/PrismaService';

import { CreatePersonRequests } from 'src/infra/http/dtos/createPersonRequests';

@Controller('people')
export class CreatePersonController {
  constructor(
    private createPersonUseCase: CreatePersonUseCase,
    private prisma: PrismaService,
  ) {}
  @Post()
  async handle(@Body() input: CreatePersonRequests) {
    const result = await this.createPersonUseCase.execute(input);

    return result;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/person/deletePersonController.ts">
import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePersonUseCase } from 'src/application/useCases/person/deletePersonUseCase';

@Controller('people')
export class DeletePersonController {
  constructor(private readonly deletePersonUseCase: DeletePersonUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.deletePersonUseCase.execute(id);

    return 'Deletado com sucesso';
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/person/findAllPersonController.ts">
import { Controller, Get } from '@nestjs/common';
import { FindAllPersonUseCase } from 'src/application/useCases/person/findAllPersonUseCase';

@Controller('people')
export class FindAllPersonController {
  constructor(private readonly findAllPersonUseCase: FindAllPersonUseCase) {}

  @Get()
  async handle() {
    const result = await this.findAllPersonUseCase.execute();

    return result;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/person/findByCpfPersonController.ts">
import { Controller, Get, Param } from '@nestjs/common';
import { FindByCpfPersonUseCase } from 'src/application/useCases/person/findByCpfPersonUseCase';

@Controller('people')
export class FindByCpfPersonController {
  constructor(
    private readonly findByCpfPersonUseCase: FindByCpfPersonUseCase,
  ) {}

  @Get('cpf/:cpf')
  async handle(@Param('cpf') cpf: string) {
    const result = await this.findByCpfPersonUseCase.execute(cpf);

    return result;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/person/findByIdPersonController.ts">
import { Controller, Get, Param } from '@nestjs/common';
import { FindByIdPersonUseCase } from 'src/application/useCases/person/findByIdPersonUseCase';

@Controller('people')
export class FindByIdPersonController {
  constructor(private readonly findByIdPersonUseCase: FindByIdPersonUseCase) {}

  @Get('id/:id')
  async handle(@Param('id') id: string) {
    const result = await this.findByIdPersonUseCase.execute(id);

    return result;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/person/updatePersonControllrt.ts">
import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdatePersonUseCase } from 'src/application/useCases/person/updatePersonUseCase';
import { UpdatePersonRequests } from 'src/infra/http/dtos/createPersonRequests';

@Controller('people')
export class UpdatePersonController {
  constructor(private readonly updatePersonUseCase: UpdatePersonUseCase) {}
  @Put(':id')
  async handle(@Param('id') id: string, @Body() input: UpdatePersonRequests) {
    const person = await this.updatePersonUseCase.execute(id, input);
    return person;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/sexuality/createSexualityController.ts">
import { Body, Controller, Post } from '@nestjs/common';
import { CreateSexualityUseCase } from 'src/application/useCases/sexuality/createSexualityUseCase';

import { CreateSexualityRequests } from 'src/infra/http/dtos/createSexualityRequests';

@Controller('sexualities')
export class CreateSexualityController {
  constructor(
    private readonly createSexualityUseCase: CreateSexualityUseCase,
  ) {}

  @Post()
  async handle(@Body() input: CreateSexualityRequests) {
    const result = await this.createSexualityUseCase.execute(input);
    return result;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/sexuality/deleteSexualityController.ts">
import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteSexualityUseCase } from 'src/application/useCases/sexuality/deleteSexualityUseCase';

@Controller('sexualities')
export class DeleteSexualityController {
  constructor(
    private readonly deleteSexualityUseCase: DeleteSexualityUseCase,
  ) {}
  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.deleteSexualityUseCase.execute(id);

    return 'Deletado com sucesso';
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/sexuality/findAllSexualityController.ts">
import { Controller, Get } from '@nestjs/common';
import { FindAllSexualityUseCase } from 'src/application/useCases/sexuality/findAllSexualityUseCase';

@Controller('sexualities')
export class FindAllSexualityController {
  constructor(
    private readonly findAllSexualityUseCase: FindAllSexualityUseCase,
  ) {}

  @Get()
  async handle() {
    const result = await this.findAllSexualityUseCase.execute();

    return result;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/sexuality/findByAcronymSexualityController.ts">
import { Controller, Get, Param } from '@nestjs/common';
import { FindByAcronymSexualityUseCase } from 'src/application/useCases/sexuality/findByAcronymSexualityUseCase';

@Controller('sexualities')
export class FindByAcronymSexualityController {
  constructor(
    private readonly findByAcronymSexualityUseCase: FindByAcronymSexualityUseCase,
  ) {}

  @Get('acronym/:acronym')
  async handle(@Param('acronym') acronym: string) {
    const sexuality = await this.findByAcronymSexualityUseCase.execute(acronym);
    return sexuality;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/sexuality/findByIdSexualityController.ts">
import { Controller, Get, Param } from '@nestjs/common';
import { FindByIdSexualityUseCase } from 'src/application/useCases/sexuality/findByIdSexualityUseCase';

@Controller('sexualities')
export class FindByIdSexualityController {
  constructor(
    private readonly findByIdSexualityUseCase: FindByIdSexualityUseCase,
  ) {}

  @Get('id/:id')
  async handle(@Param('id') id: string) {
    const sexuality = await this.findByIdSexualityUseCase.execute(id);
    return sexuality;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/sexuality/findBySlugSexualityController.ts">
import { Controller, Get, Param } from '@nestjs/common';
import { FindBySlugSexualityUseCase } from 'src/application/useCases/sexuality/findBySlugSexualityUseCase';

@Controller('sexualities')
export class FindBySlugSexualityController {
  constructor(
    private readonly findBySlugSexualityUseCase: FindBySlugSexualityUseCase,
  ) {}

  @Get('slug/:slug')
  async handle(@Param('slug') slug: string) {
    const sexuality = await this.findBySlugSexualityUseCase.execute(slug);
    return sexuality;
  }
}
</file>

<file path="apps/api/src/infra/http/controllers/sexuality/updateSexualityController.ts">
import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateSexualityUseCase } from 'src/application/useCases/sexuality/updateSexualityUseCase';
import { UpdateSexualityRequests } from 'src/infra/http/dtos/createSexualityRequests';

@Controller('sexualities')
export class UpdateSexualityController {
  constructor(
    private readonly updateSexualityUseCase: UpdateSexualityUseCase,
  ) {}
  @Put(':id')
  async handle(
    @Param('id') id: string,
    @Body() input: UpdateSexualityRequests,
  ) {
    const sexuality = await this.updateSexualityUseCase.execute(id, input);
    return sexuality;
  }
}
</file>

<file path="apps/api/src/infra/http/dtos/createGenderRequests.ts">
export interface CreateGenderRequests {
  id: string;
  title: string;
  description: string;
  acronym: string;
}

export type UpdateGenderRequests = Partial<CreateGenderRequests>;
</file>

<file path="apps/api/src/infra/http/dtos/createPersonRequests.ts">
import { Pronouns } from 'src/domain/enums/pronouns';

export interface CreatePersonRequests {
  civilName: string;
  socialName: string;
  birthDate: Date;
  cpf: string;
  rg: string;
  slug: string;
  pronouns: Pronouns;
  genderId: string;
  sexualityId: string;
}

export type UpdatePersonRequests = Partial<CreatePersonRequests>;
</file>

<file path="apps/api/src/infra/http/dtos/createSexualityRequests.ts">
export interface CreateSexualityRequests {
  id: string;
  title: string;
  description: string;
  acronym: string;
}
export type UpdateSexualityRequests = Partial<CreateSexualityRequests>;
</file>

<file path="apps/api/src/infra/http/http.module.ts">
import { Module } from '@nestjs/common';
import { CreateGenderUseCase } from 'src/application/useCases/gender/createGenderUseCase';
import { DeleteGenderUseCase } from 'src/application/useCases/gender/deleteGenderUseCase';
import { FindAllGendersUseCase } from 'src/application/useCases/gender/findAllGendersUseCase';
import { FindByAcronymGenderUseCase } from 'src/application/useCases/gender/findByAcronymGenderUseCase';
import { FindByIdGenderUseCase } from 'src/application/useCases/gender/findByIdGenderUseCase';
import { FindBySlugGenderUseCase } from 'src/application/useCases/gender/findBySlugGenderUseCase';
import { UpdateGenderUseCase } from 'src/application/useCases/gender/updateGenderUseCase';
import { CreatePersonUseCase } from 'src/application/useCases/person/createPersonUseCase';
import { DeletePersonUseCase } from 'src/application/useCases/person/deletePersonUseCase';
import { FindAllPersonUseCase } from 'src/application/useCases/person/findAllPersonUseCase';
import { FindByCpfPersonUseCase } from 'src/application/useCases/person/findByCpfPersonUseCase';
import { FindByIdPersonUseCase } from 'src/application/useCases/person/findByIdPersonUseCase';
import { UpdatePersonUseCase } from 'src/application/useCases/person/updatePersonUseCase';
import { CreateSexualityUseCase } from 'src/application/useCases/sexuality/createSexualityUseCase';
import { DeleteSexualityUseCase } from 'src/application/useCases/sexuality/deleteSexualityUseCase';
import { FindAllSexualityUseCase } from 'src/application/useCases/sexuality/findAllSexualityUseCase';
import { FindByAcronymSexualityUseCase } from 'src/application/useCases/sexuality/findByAcronymSexualityUseCase';
import { FindByIdSexualityUseCase } from 'src/application/useCases/sexuality/findByIdSexualityUseCase';
import { FindBySlugSexualityUseCase } from 'src/application/useCases/sexuality/findBySlugSexualityUseCase';

import { DatabaseModule } from 'src/infra/database/database.module';

import { CreateGenderController } from 'src/infra/http/controllers/gender/createGenderController';
import { DeleteGenderController } from 'src/infra/http/controllers/gender/deleteGenderController';
import { FindAllGendersController } from 'src/infra/http/controllers/gender/findAllGendersController';
import { FindByAcronymGenderController } from 'src/infra/http/controllers/gender/findByAcronymGenderController';
import { FindByIdGenderController } from 'src/infra/http/controllers/gender/findByIdGenderController';
import { FindBySlugGenderController } from 'src/infra/http/controllers/gender/findBySlugGenderController';
import { UpdateGendersController } from 'src/infra/http/controllers/gender/updateGenderController';
import { CreatePersonController } from 'src/infra/http/controllers/person/createPersonController';
import { DeletePersonController } from 'src/infra/http/controllers/person/deletePersonController';
import { FindAllPersonController } from 'src/infra/http/controllers/person/findAllPersonController';
import { FindByCpfPersonController } from 'src/infra/http/controllers/person/findByCpfPersonController';
import { FindByIdPersonController } from 'src/infra/http/controllers/person/findByIdPersonController';
import { UpdatePersonController } from 'src/infra/http/controllers/person/updatePersonControllrt';
import { CreateSexualityController } from 'src/infra/http/controllers/sexuality/createSexualityController';
import { DeleteSexualityController } from 'src/infra/http/controllers/sexuality/deleteSexualityController';
import { FindAllSexualityController } from 'src/infra/http/controllers/sexuality/findAllSexualityController';
import { FindByAcronymSexualityController } from 'src/infra/http/controllers/sexuality/findByAcronymSexualityController';
import { FindByIdSexualityController } from 'src/infra/http/controllers/sexuality/findByIdSexualityController';
import { FindBySlugSexualityController } from 'src/infra/http/controllers/sexuality/findBySlugSexualityController';

@Module({
  imports: [DatabaseModule], // Aqui o HTTP ganha acesso aos Repositórios
  controllers: [
    // Person
    CreatePersonController,
    FindByCpfPersonController,
    UpdatePersonController,
    DeletePersonController,
    FindAllPersonController,
    FindByIdPersonController,

    // Gender
    CreateGenderController,
    DeleteGenderController,
    FindAllGendersController,
    FindByAcronymGenderController,
    FindByIdGenderController,
    FindBySlugGenderController,
    UpdateGendersController,
    // Sexuality
    CreateSexualityController,
    DeleteSexualityController,
    FindAllSexualityController,
    FindByAcronymSexualityController,
    FindByIdSexualityController,
    FindBySlugSexualityController,
  ], // Colocaremos os controllers aqui
  providers: [
    // Gender
    CreateGenderUseCase,
    DeleteGenderUseCase,
    FindAllGendersUseCase,
    FindByAcronymGenderUseCase,
    FindBySlugGenderUseCase,
    FindByIdGenderUseCase,
    UpdateGenderUseCase,
    // Person
    CreatePersonUseCase,
    DeletePersonUseCase,
    FindAllPersonUseCase,
    FindByCpfPersonUseCase,
    FindByIdPersonUseCase,
    UpdatePersonUseCase,
    // Sexuality
    CreateSexualityUseCase,
    DeleteSexualityUseCase,
    FindAllSexualityUseCase,
    FindByAcronymSexualityUseCase,
    FindBySlugSexualityUseCase,
    FindByIdSexualityUseCase,
  ], // Colocaremos os Use Cases aqui
})
export class HttpModule {}
</file>

<file path="apps/api/src/app.module.ts">
import { Module } from '@nestjs/common';

import { HttpModule } from 'src/infra/http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
</file>

<file path="apps/api/src/main.ts">
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
</file>

<file path="apps/web/app/form/page.tsx">
import { PersonRegistrationForm } from "@/components/forms/PersonRegistrationForm"
import PageBase from "@/components/PageBase"

export default function FormPage() {
  return (
    <PageBase>
      <div className="mx-auto mt-12 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <PersonRegistrationForm />
      </div>
    </PageBase>
  )
}
</file>

<file path="apps/web/app/globals.css">
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-heading: var(--font-inter), "Inter Fallback";
  --font-sans: var(--font-inter), "Inter Fallback";
  --font-mono: var(--font-inter), "Inter Fallback";
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  color-scheme: light;
  /* Tema claro: off-white levemente azulado, texto grafite */
  --background: #f4f6fb;
  --foreground: oklch(0.28 0.02 260);
  --card: oklch(1 0 0 / 62%);
  --card-foreground: oklch(0.28 0.02 260);
  --popover: #ffffff;
  --popover-foreground: oklch(0.28 0.02 260);
  /* Azul-bebê como primária (mais saturado p/ contraste no claro) */
  --primary: #5b9be8;
  --primary-foreground: #ffffff;
  --secondary: oklch(0.92 0.01 260 / 70%);
  --secondary-foreground: oklch(0.28 0.02 260);
  --muted: oklch(0.9 0.01 260 / 60%);
  --muted-foreground: oklch(0.48 0.02 260);
  /* Rosa-bebê como acento */
  --accent: #e87bb8;
  --accent-foreground: #ffffff;
  --destructive: oklch(0.58 0.21 18);
  --border: oklch(0.3 0.04 260 / 12%);
  --input: oklch(0.3 0.04 260 / 8%);
  --ring: #5b9be8;
  --chart-1: #5b9be8;
  --chart-2: #e87bb8;
  --chart-3: oklch(0.66 0.12 220);
  --chart-4: oklch(0.68 0.14 330);
  --chart-5: oklch(0.55 0.04 260);
  --radius: 1rem;
  --sidebar: #ffffff;
  --sidebar-foreground: oklch(0.28 0.02 260);
  --sidebar-primary: #5b9be8;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: oklch(0.92 0.01 260 / 70%);
  --sidebar-accent-foreground: oklch(0.28 0.02 260);
  --sidebar-border: oklch(0.3 0.04 260 / 12%);
  --sidebar-ring: #5b9be8;
  /* Gradiente de marca: azul-bebê -> rosa-bebê */
  --brand-gradient: linear-gradient(120deg, #5b9be8, #e87bb8);
  /* Tokens de superfície de vidro (variam por tema) */
  --glass-bg: oklch(1 0 0 / 38%);
  --glass-highlight: rgba(255, 255, 255, 0.28);
  --glass-inset: rgba(255, 255, 255, 0.7);
  --glass-glow-blue: rgba(91, 155, 232, 0.22);
  --glass-glow-pink: rgba(232, 123, 184, 0.2);
  --bg-glow-blue: rgba(91, 155, 232, 0.22);
  --bg-glow-pink: rgba(232, 123, 184, 0.2);
}

.dark {
  color-scheme: dark;
  /* Grafite profundo / cinzas escuros neutros */
  --background: #0b0f19;
  --foreground: oklch(0.97 0.005 260);
  --card: oklch(0.22 0.01 260 / 12%);
  --card-foreground: oklch(0.97 0.005 260);
  --popover: #11161f;
  --popover-foreground: oklch(0.97 0.005 260);
  /* Azul-bebê como primária */
  --primary: #a5ccf9;
  --primary-foreground: #0b0f19;
  --secondary: oklch(0.3 0.01 260 / 40%);
  --secondary-foreground: oklch(0.97 0.005 260);
  --muted: oklch(0.3 0.01 260 / 30%);
  --muted-foreground: oklch(0.72 0.01 260);
  /* Rosa-bebê como acento */
  --accent: #f9a5d6;
  --accent-foreground: #0b0f19;
  --destructive: oklch(0.62 0.2 18);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 8%);
  --ring: #a5ccf9;
  --chart-1: #a5ccf9;
  --chart-2: #f9a5d6;
  --chart-3: oklch(0.78 0.09 220);
  --chart-4: oklch(0.78 0.1 330);
  --chart-5: oklch(0.6 0.04 260);
  --sidebar: #0d121d;
  --sidebar-foreground: oklch(0.97 0.005 260);
  --sidebar-primary: #a5ccf9;
  --sidebar-primary-foreground: #0b0f19;
  --sidebar-accent: oklch(0.3 0.01 260 / 40%);
  --sidebar-accent-foreground: oklch(0.97 0.005 260);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: #a5ccf9;
  --brand-gradient: linear-gradient(120deg, #a5ccf9, #f9a5d6);
  /* Tokens de superfície de vidro no modo escuro */
  --glass-bg: oklch(0.7 0.02 260 / 9%);
  --glass-highlight: rgba(255, 255, 255, 0.08);
  --glass-inset: rgba(255, 255, 255, 0.08);
  --glass-glow-blue: rgba(165, 204, 249, 0.22);
  --glass-glow-pink: rgba(249, 165, 214, 0.2);
  --bg-glow-blue: rgba(165, 204, 249, 0.16);
  --bg-glow-pink: rgba(249, 165, 214, 0.14);

  /* add */
  --shadow-glass:
    0 20px 60px -20px rgba(165, 204, 249, 0.25),
    0 8px 30px -10px rgba(249, 165, 214, 0.18);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    /* Brilhos radiais suaves rosa/azul, adaptáveis ao tema */
    background-image:
      radial-gradient(
        45rem 38rem at 6% -2%,
        var(--bg-glow-blue),
        transparent 70%
      ),
      radial-gradient(
        35rem 42rem at 84% 36%,
        var(--bg-glow-pink),
        transparent 95%
      );
    background-attachment: fixed;
  }
  html {
    @apply font-sans;
  }
}

@layer components {
  /* Cartão de vidro fosco semi-transparente */
  .glass {
    background:
      linear-gradient(145deg, var(--glass-highlight), transparent 45%),
      var(--glass-bg);
    backdrop-filter: blur(20px) saturate(200%);
    -webkit-backdrop-filter: blur(20px) saturate(200%);
    box-shadow:
      0 16px 48px -16px var(--glass-glow-blue),
      0 16px 48px -16px var(--glass-glow-pink),
      inset 0 1px 0 0 var(--glass-inset);
  }

  /* Borda de 1px em gradiente azul-bebê -> rosa-bebê */
  .glass-border {
    position: relative;
    border: 1px solid transparent;
    background-clip: padding-box;
  }
  .glass-border::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: var(--brand-gradient);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.65;
  }

  /* Texto com preenchimento em gradiente de marca */
  .text-gradient {
    background: var(--brand-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

/*   --shadow-glass: 0 20px 60px -20px rgba(165, 204, 249, 0.25), 0 8px 30px -10px rgba(249, 165, 214, 0.18); */
/* --card-foreground: oklch(0.97 0.005 250);
   */
/* dark: --card: oklch(0.208 0.042 265.755); */

/* Glassmorphism utilities */
@utility glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(140%);
  border-radius: var(--radius);
  box-shadow: var(--shadow-glass);
  border: 1px solid transparent;
  background-clip: padding-box;
}

@utility glass-card-bordered {
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(140%);
  border-radius: var(--radius);
  box-shadow: var(--shadow-glass);
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, #a5ccf9, #f9a5d6);
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}
</file>

<file path="apps/web/app/layout.tsx">
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TransCenso — Dados demográficos com privacidade por design',
  description:
    'Plataforma que coleta e publica dados demográficos da população trans com foco extremo em segurança, anonimização e privacidade por design.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F6FB' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F19' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
</file>

<file path="apps/web/src/application/hooks/useRegisterPerson.ts">
import { useState } from "react"
import { PersonHttpRepository } from "@/infra/repositories/person-http-repository"
import { PersonRegistrationFormData } from "@/domain/schemas/personSchema"

export function useRegisterPerson() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  // Inversão de Dependência na prática: instanciamos o repositório que assina o contrato.
  // Se amanhã mudarmos para GraphQL ou Firebase, mudamos apenas essa linha.
  const personRepository = new PersonHttpRepository()

  async function register(data: PersonRegistrationFormData) {
    setIsLoading(true)
    setError(null)
    setIsSuccess(false)

    try {
      // Clímax do fluxo: a aplicação envia o comando para a infraestrutura
      await personRepository.save(data)
      setIsSuccess(true)
    } catch (err: unknown) {
      // Captura o erro tratado pelo Axios lá no repositório e injeta no estado do React
      setError((err as Error).message || "Ocorreu um erro ao registrar a pessoa.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    register,
    isLoading,
    error,
    isSuccess,
  }
}
</file>

<file path="apps/web/src/components/forms/SecureCivilName.tsx">
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

export function SecureCivilName() {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="civilName" // Padronizado em camelCase
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
      >
        <Lock className="h-3.5 w-3.5 text-accent" />
        Nome Civil
      </Label>

      <div
        id="civilName" // Padronizado em camelCase
        className="flex items-center gap-3 rounded-xl border border-dashed border-accent/30 bg-secondary/20 px-4 py-3.5"
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15"
          aria-hidden="true"
        >
          <Lock className="h-4 w-4 text-accent" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-medium tracking-widest text-foreground/70">
            ••••••••••••••
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
            Dado protegido por criptografia no Backend — Ocultado por
            privacidade
          </p>
        </div>
      </div>
    </div>
  )
}
</file>

<file path="apps/web/src/components/forms/SocialNameInput.tsx">
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SocialNameInputProps {
  socialName: string
  onChange: (socialName: string) => void
}

export function SocialNameInput({
  socialName,
  onChange
}: SocialNameInputProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="socialName"
        className="flex items-center gap-2 text-sm font-medium"
      >
        Nome Social
        <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          Destaque
        </span>
      </Label>

      <Input
        id="socialName"
        name="socialName"
        type="text"
        placeholder="Seu nome social será respeitado em todas as interações com a plataforma"
        className="bg-secondary/30 px-4 py-6 text-base glass-border"
        value={socialName}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
</file>

<file path="apps/web/src/components/ui/Card/CardContent.tsx">
import { cn } from "@/lib/utils"

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)
CardContent.displayName = "Card.Content"
</file>

<file path="apps/web/src/components/ui/Card/CardHeader.tsx">
import { cn } from "@/lib/utils"

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
)
CardHeader.displayName = "Card.Header"
</file>

<file path="apps/web/src/components/ui/Card/CardHeaderDescription.tsx">
import { cn } from "@/lib/utils"

export const CardHeaderDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-muted-foreground text-pretty", className)}
    {...props}
  />
)
CardHeaderDescription.displayName = "Card.HeaderDescription"
</file>

<file path="apps/web/src/components/ui/Card/CardHeaderTitle.tsx">
import { cn } from "@/lib/utils"

// Tipagem para aceitar dinamicamente as tags de cabeçalho
interface CardHeaderTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const CardHeaderTitle = ({
  className,
  tag = "h2",
  ...props
}: CardHeaderTitleProps) => {
  const Component = tag // O React exige letra maiúscula para componentes dinâmicos
  return (
    <Component
      className={cn(
        "text-xl font-semibold tracking-tight text-white",
        className,
      )}
      {...props}
    />
  )
}
CardHeaderTitle.displayName = "Card.HeaderTitle"
</file>

<file path="apps/web/src/components/ui/Card/CardRoot.tsx">
import { cn } from "@/lib/utils"
import React from "react"

export const CardRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("glass-card glass-card-bordered", className)}
    {...props}
  />
))
CardRoot.displayName = "Card.Root"
</file>

<file path="apps/web/src/components/ui/Card/index.tsx">
import { CardContent } from "@/components/ui/Card/CardContent"
import { CardHeader } from "@/components/ui/Card/CardHeader"
import { CardHeaderDescription } from "@/components/ui/Card/CardHeaderDescription"
import { CardHeaderTitle } from "@/components/ui/Card/CardHeaderTitle"
import { CardRoot } from "@/components/ui/Card/CardRoot"

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Content: CardContent,
  HeaderTitle: CardHeaderTitle,
  HeaderDescription: CardHeaderDescription,
}
</file>

<file path="apps/web/src/components/ui/custom/Button.tsx">
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Centralização das variantes de estilo e temas
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      theme: {
        brand: "text-[#0b0f19] focus:ring-primary/60 hover:opacity-90",
        white: "bg-white text-black focus:ring-white/40 hover:bg-white/90",
        pink: "bg-pink-600 text-white focus:ring-pink-500/40 hover:bg-pink-700",
        blue: "bg-blue-600 text-white focus:ring-blue-500/40 hover:bg-blue-700",
        transparent:
          "bg-transparent border border-white/10 text-white focus:ring-white/10 hover:bg-white/5",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-5 py-3.5",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      theme: "brand",
      size: "md",
    },
  },
)

interface CustomButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const CustomButton = React.forwardRef<
  HTMLButtonElement,
  CustomButtonProps
>(({ className, theme, size, isLoading, children, style, ...props }, ref) => {
  // Injeta o gradiente automaticamente se o tema selecionado for o da sua marca ('brand')
  const inlineStyle =
    theme === "brand"
      ? { background: "var(--brand-gradient)", ...style }
      : style

  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ theme, size }), className)}
      style={inlineStyle}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Processando...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
})
CustomButton.displayName = "CustomButton"
</file>

<file path="apps/web/src/components/ui/custom/Input.tsx">
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Centralização das variantes de cores e bordas
const inputVariants = cva(
  "w-full rounded-xl outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#a5ccf9]/60",
  {
    variants: {
      theme: {
        default: "glass-border bg-secondary/30 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/50",
        white: "border border-white/10 bg-input px-4 py-3 text-sm text-white focus:border-white/40 focus:ring-white/10 placeholder:text-muted-foreground/70",
        pink: "border border-pink-500/30 bg-input px-4 py-3 text-sm text-pink-100 focus:border-pink-500 focus:ring-pink-500/20 placeholder:text-muted-foreground/70",
        blue: "border border-blue-500/30 bg-input px-4 py-3 text-sm text-blue-100 focus:border-blue-500 focus:ring-blue-500/20 placeholder:text-muted-foreground/70",
        transparent: "border-transparent bg-transparent px-4 py-3 text-sm text-white focus:border-white/20 placeholder:text-muted-foreground/70",
      },
    },
    defaultVariants: {
      theme: "default",
    },
  },
)

interface CustomInputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label: string
  errorMessage?: string
}

// Usamos o forwardRef para que o react-hook-form consiga registrar o input nativo
export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, theme, label, errorMessage, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-foreground/90">
          {label}
        </label>

        <input
          type={type}
          className={cn(
            inputVariants({ theme }),
            errorMessage && "border-destructive focus:ring-destructive/20",
            className,
          )}
          ref={ref}
          {...props}
        />

        {errorMessage && (
          <span className="text-xs font-medium text-destructive/90 mt-0.5 animate-fade-in">
            {errorMessage}
          </span>
        )}
      </div>
    )
  },
)
CustomInput.displayName = "CustomInput"
</file>

<file path="apps/web/src/components/ui/button.tsx">
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
</file>

<file path="apps/web/src/components/ui/form.tsx">
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField deve ser usado dentro de <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField
}
</file>

<file path="apps/web/src/components/ui/input.tsx">
import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
</file>

<file path="apps/web/src/components/ui/label.tsx">
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
</file>

<file path="apps/web/src/components/ui/select.tsx">
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
</file>

<file path="apps/web/src/components/data-collection-form.tsx">
'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { Lock, Sparkles, ChevronDown, Send } from 'lucide-react'

const fieldBase =
  'w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#a5ccf9]/60'

const pronounOptions = ['Ela/Dela', 'Ele/Dele', 'Elu/Delu', 'Prefiro não dizer']

export function DataCollectionForm() {
  const [pronoun, setPronoun] = useState<string>('Ela/Dela')

  return (
    <GlassCard className="p-6 sm:p-8" aria-labelledby="form-title">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 id="form-title" className="text-xl font-semibold tracking-tight">
            Coleta de dados
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Suas informações são anonimizadas antes da publicação. Nada que
            identifique você é exibido publicamente.
          </p>
        </div>
        <span
          className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground/90 sm:flex"
          aria-hidden="true"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#f9a5d6]" />
          Privacidade por design
        </span>
      </div>

      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        {/* Nome Social — em destaque */}
        <div>
          <label
            htmlFor="nome-social"
            className="mb-2 flex items-center gap-2 text-sm font-medium"
          >
            Nome Social
            <span className="rounded-md bg-[#a5ccf9]/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#a5ccf9]">
              Destaque
            </span>
          </label>
          <input
            id="nome-social"
            name="nome-social"
            type="text"
            placeholder="Como você gostaria de ser chamada(o)"
            className={`${fieldBase} glass-border bg-secondary/30 px-4 py-3.5 text-base`}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Pronomes */}
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Pronomes</legend>
            <div className="flex flex-wrap gap-2">
              {pronounOptions.map((option) => {
                const active = pronoun === option
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPronoun(option)}
                    aria-pressed={active}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                      active
                        ? 'border-transparent bg-[#a5ccf9] font-medium text-[#0b0f19]'
                        : 'border-border bg-secondary/30 text-foreground/80 hover:border-[#a5ccf9]/50'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Identidade de Gênero */}
          <div>
            <label
              htmlFor="identidade"
              className="mb-2 block text-sm font-medium"
            >
              Identidade de Gênero
            </label>
            <div className="relative">
              <select
                id="identidade"
                name="identidade"
                className={`${fieldBase} appearance-none pr-10`}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option>Mulher trans</option>
                <option>Homem trans</option>
                <option>Pessoa não-binária</option>
                <option>Travesti</option>
                <option>Gênero fluido</option>
                <option>Outra / Autodeclarada</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Orientação Sexual */}
        <div>
          <label htmlFor="orientacao" className="mb-2 block text-sm font-medium">
            Orientação Sexual
          </label>
          <div className="relative">
            <select
              id="orientacao"
              name="orientacao"
              className={`${fieldBase} appearance-none pr-10`}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione
              </option>
              <option>Heterossexual</option>
              <option>Homossexual</option>
              <option>Bissexual</option>
              <option>Pansexual</option>
              <option>Assexual</option>
              <option>Prefiro não dizer</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Nome Civil — protegido / criptografado */}
        <div>
          <label
            htmlFor="nome-civil"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <Lock className="h-3.5 w-3.5 text-[#f9a5d6]" />
            Nome Civil
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#f9a5d6]/30 bg-secondary/20 px-4 py-3.5">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f9a5d6]/15"
              aria-hidden="true"
            >
              <Lock className="h-4 w-4 text-[#f9a5d6]" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium tracking-widest text-foreground/70">
                ••••••••••••••
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
                Dado protegido por criptografia no Backend — Ocultado por
                privacidade
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-[#0b0f19] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#a5ccf9]/60"
          style={{ background: 'var(--brand-gradient)' }}
        >
          <Send className="h-4 w-4" />
          Enviar com segurança
        </button>
      </form>
    </GlassCard>
  )
}
</file>

<file path="apps/web/src/components/data-visualization.tsx">
import { GlassCard } from '@/components/glass-card'
import { Users, EyeOff, TrendingUp, Globe } from 'lucide-react'

const metrics = [
  {
    label: 'Respostas anônimas',
    value: '48.392',
    delta: '+12,4%',
    icon: Users,
    tint: '#a5ccf9',
  },
  {
    label: 'Campos anonimizados',
    value: '100%',
    delta: 'criptografado',
    icon: EyeOff,
    tint: '#f9a5d6',
  },
  {
    label: 'Crescimento mensal',
    value: '+5.108',
    delta: 'este mês',
    icon: TrendingUp,
    tint: '#a5ccf9',
  },
  {
    label: 'Regiões cobertas',
    value: '27',
    delta: 'estados',
    icon: Globe,
    tint: '#f9a5d6',
  },
]

const identityData = [
  { label: 'Mulheres trans', value: 38, tint: '#f9a5d6' },
  { label: 'Homens trans', value: 27, tint: '#a5ccf9' },
  { label: 'Não-binárias', value: 21, tint: '#f9a5d6' },
  { label: 'Travestis', value: 9, tint: '#a5ccf9' },
  { label: 'Outras', value: 5, tint: '#f9a5d6' },
]

const ageData = [
  { label: '16–24', value: 64 },
  { label: '25–34', value: 88 },
  { label: '35–44', value: 52 },
  { label: '45–59', value: 34 },
  { label: '60+', value: 18 },
]

export function DataVisualization() {
  const maxAge = Math.max(...ageData.map((d) => d.value))

  return (
    <div className="flex flex-col gap-6">
      {/* Cartões de métricas */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <GlassCard key={m.label} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: `${m.tint}26` }}
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" style={{ color: m.tint }} />
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {m.delta}
                </span>
              </div>
              <p className="text-2xl font-semibold tracking-tight">{m.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
                {m.label}
              </p>
            </GlassCard>
          )
        })}
      </div>

      {/* Distribuição por identidade */}
      <GlassCard className="p-6" aria-labelledby="identity-title">
        <div className="mb-5 flex items-center justify-between">
          <h3 id="identity-title" className="text-base font-semibold tracking-tight">
            Identidade de gênero
          </h3>
          <span className="text-xs text-muted-foreground">% do total</span>
        </div>
        <ul className="flex flex-col gap-4">
          {identityData.map((d) => (
            <li key={d.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-foreground/85">{d.label}</span>
                <span className="font-medium text-foreground/70">{d.value}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary/40">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${d.value}%`,
                    background: d.tint,
                    boxShadow: `0 0 12px ${d.tint}80`,
                  }}
                  role="img"
                  aria-label={`${d.label}: ${d.value}%`}
                />
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>

      {/* Faixa etária */}
      <GlassCard className="p-6" aria-labelledby="age-title">
        <div className="mb-5 flex items-center justify-between">
          <h3 id="age-title" className="text-base font-semibold tracking-tight">
            Faixa etária
          </h3>
          <span className="text-xs text-muted-foreground">respostas (mil)</span>
        </div>
        <div className="flex h-44 items-end justify-between gap-3">
          {ageData.map((d) => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-lg rounded-b-sm transition-all"
                  style={{
                    height: `${(d.value / maxAge) * 100}%`,
                    background: 'var(--brand-gradient)',
                    boxShadow: '0 0 16px rgba(165,204,249,0.35)',
                  }}
                  role="img"
                  aria-label={`${d.label} anos: ${d.value} mil respostas`}
                />
              </div>
              <span className="text-[11px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <p className="px-1 text-center text-xs text-muted-foreground text-pretty">
        Todos os dados acima são agregados e anonimizados. Nenhuma informação
        individual identificável é publicada.
      </p>
      
    </div>
  )
}
</file>

<file path="apps/web/src/components/glass-card.tsx">
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function GlassCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("glass-card glass-card-bordered ", className)}
      {...props}
    >
      {children}
    </div>
  )
}
/* glass glass-border rounded-3xl */
</file>

<file path="apps/web/src/components/PageBase.tsx">
import { SecureHeader } from '@/components/secure-header'
import { HTMLAttributes } from 'react'

export default function PageBase({children, hasSecureHeader = true}: {children: React.ReactNode, hasSecureHeader?: boolean} & HTMLAttributes<HTMLDivElement>) {
  return (
    <main className="min-h-svh pb-16">
      {hasSecureHeader && <SecureHeader />}
      {children}
    </main>
  )
}
</file>

<file path="apps/web/src/components/secure-header.tsx">
import { ThemeToggle } from "@/components/theme-toggle"
import { Lock, ShieldCheck } from "lucide-react"

export function SecureHeader() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-popover/95 shadow-sm shadow-black/5 backdrop-blur-md supports-[backdrop-filter]:bg-popover/85">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: "var(--brand-gradient)" }}
            aria-hidden="true"
          >
            <Lock
              className="h-4 w-4 text-[#0b0f19]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-semibold tracking-tight">
              Trans<span className="text-gradient">Censo</span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              Trans-parência de dados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5"
            role="status"
            aria-live="polite"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <ShieldCheck
              className="h-3.5 w-3.5 text-primary"
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-foreground/90">
              Conexão segura
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              · Dados criptografados
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
</file>

<file path="apps/web/src/components/theme-toggle.tsx">
'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/40 text-foreground/90 transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Evita mismatch de hidratação mostrando ícone só após montar */}
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <span className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
</file>

<file path="apps/web/src/components/utilComponent.tsx">
import { CheckCircle2, Globe2, Heart, Shield, ShieldCheck, TrendingUp, Users } from "lucide-react"

export function PrivacyCard() {
  const items = [
    "Criptografia ponta a ponta (AES-256)",
    "Anonimização por k-anonimato ≥ 50",
    "Sem cookies, sem fingerprint",
    "Código aberto e auditável"
  ]
  return (
    <div className="glass-card-bordered p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10">
          <Shield className="h-5 w-5 text-[#f9a5d6]" />
        </div>
        <h3 className="text-base font-semibold">Privacidade por design</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a5ccf9]" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MethodologyCard() {
  return (
    <div className="glass-card-bordered p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10">
          <Globe2 className="h-5 w-5 text-[#a5ccf9]" />
        </div>
        <h3 className="text-base font-semibold">Metodologia aberta</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Todo o pipeline de coleta, anonimização e agregação é público.
        Pesquisadoras podem reproduzir, auditar e contestar.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Schema
          </p>
          <p className="font-mono text-[#a5ccf9]">v2.4.0</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Licença
          </p>
          <p className="font-mono text-[#f9a5d6]">ODbL 1.0</p>
        </div>
      </div>
    </div>
  )
}

export function MetricsGrid() {
  const metrics = [
    {
      label: "Pessoas participantes",
      value: "184.392",
      delta: "+2,3%",
      icon: Users,
      tone: "blue" as const
    },
    {
      label: "Cidades cobertas",
      value: "1.247",
      delta: "+18",
      icon: Globe2,
      tone: "pink" as const
    },
    {
      label: "Identidades declaradas",
      value: "27",
      delta: "novo: agênero",
      icon: Heart,
      tone: "blue" as const
    },
    {
      label: "Consultas à API/mês",
      value: "3.1M",
      delta: "+12%",
      icon: TrendingUp,
      tone: "pink" as const
    }
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="glass-card-bordered p-5">
          <div className="flex items-start justify-between gap-3">
            <div
              className={`grid h-9 w-9 place-items-center rounded-lg border border-white/10 ${
                m.tone === "blue" ? "bg-[#a5ccf9]/10" : "bg-[#f9a5d6]/10"
              }`}
            >
              <m.icon
                className={`h-4 w-4 ${m.tone === "blue" ? "text-[#a5ccf9]" : "text-[#f9a5d6]"}`}
              />
            </div>
            <span
              className={`text-[11px] font-medium ${
                m.tone === "blue" ? "text-[#a5ccf9]" : "text-[#f9a5d6]"
              }`}
            >
              {m.delta}
            </span>
          </div>
          <p className="mt-4 text-3xl font-extrabold tracking-tight">
            {m.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
        </div>
      ))}
    </div>
  )
}

export function ChartsGrid() {
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="glass-card-bordered p-6 lg:col-span-2">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-5">
          <div className="min-w-0">
            <h4 className="text-sm font-semibold">
              Distribuição por identidade de gênero
            </h4>
            <p className="text-xs text-muted-foreground">
              Agregado nacional · n = 184.392
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground glass-card-bordered px-2 py-1">
            anonimizado
          </span>
        </div>
        <BarChart />
      </div>

      <div className="glass-card-bordered p-6">
        <h4 className="text-sm font-semibold">Por região</h4>
        <p className="text-xs text-muted-foreground mb-5">
          Participação relativa
        </p>
        <RegionBars />
      </div>
    </div>
  )
}

export function BarChart() {
  const data = [
    { label: "Mulher trans", value: 38 },
    { label: "Homem trans", value: 24 },
    { label: "Não-binárie", value: 19 },
    { label: "Travesti", value: 11 },
    { label: "Gênero fluido", value: 5 },
    { label: "Agênero", value: 3 }
  ]
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div
          key={d.label}
          className="grid grid-cols-[120px_minmax(0,1fr)_44px] sm:grid-cols-[140px_minmax(0,1fr)_48px] items-center gap-3"
        >
          <span className="truncate text-xs text-muted-foreground">
            {d.label}
          </span>
          <div className="relative h-2.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${(d.value / max) * 100}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(90deg, #a5ccf9, #f9a5d6)"
                    : "linear-gradient(90deg, #f9a5d6, #a5ccf9)",
                boxShadow: "0 0 20px -2px rgba(249,165,214,0.4)"
              }}
            />
          </div>
          <span className="text-right text-xs font-mono tabular-nums">
            {d.value}%
          </span>
        </div>
      ))}
    </div>
  )
}

export function RegionBars() {
  const data = [
    { label: "Sudeste", value: 42 },
    { label: "Nordeste", value: 22 },
    { label: "Sul", value: 16 },
    { label: "Norte", value: 11 },
    { label: "C.-Oeste", value: 9 }
  ]
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="flex items-end gap-3 h-44">
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
          <div className="relative w-full flex-1 flex items-end">
            <div
              className="w-full rounded-md"
              style={{
                height: `${(d.value / max) * 100}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg, rgba(165,204,249,0.9), rgba(165,204,249,0.2))"
                    : "linear-gradient(180deg, rgba(249,165,214,0.9), rgba(249,165,214,0.2))",
                boxShadow: "0 0 25px -8px rgba(165,204,249,0.6)"
              }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">{d.label}</span>
          <span className="text-[10px] font-mono text-foreground/80">
            {d.value}%
          </span>
        </div>
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <p className="text-xs text-muted-foreground min-w-0">
          © {new Date().getFullYear()} TransCenso · construído com privacidade
          por design.
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-[#a5ccf9]" /> API status:
          operacional
        </div>
      </div>
    </footer>
  )
}
</file>

<file path="apps/web/src/domain/enums/pronouns.ts">
export enum Pronouns {
  ELA_DELA = "ELA_DELA",
  ELE_DELE = "ELE_DELE",
  ELU_DELU = "ELU_DELU",
  PREFIRO_NAO_DIZER = "PREFIRO_NAO_DIZER"
}
</file>

<file path="apps/web/src/domain/repositories/person-repository.ts">
import { PersonRegistrationFormData } from "../schemas/personSchema"

export interface PersonRepository {
  /**
   * Envia os dados validados do formulário de registro para persistência (API).
   * @param data Dados da pessoa validados pelo Zod.
   * @returns Uma Promise que resolve quando o envio é bem-sucedido.
   * @throws {DomainError} Caso o backend retorne um erro de negócio.
   */
  save(data: PersonRegistrationFormData): Promise<void>
}
</file>

<file path="apps/web/src/domain/schemas/personSchema.ts">
import { Pronouns } from "@/domain/enums/pronouns"
import { z } from "zod"

// Definimos o Schema (a regra de negócio) puramente no Domínio




export const PRONOUN_LABELS: Record<Pronouns, string> = {
  [Pronouns.ELA_DELA]: "Ela / Dela",
  [Pronouns.ELE_DELE]: "Ele / Dele",
  [Pronouns.ELU_DELU]: "Elu / Delu",
  [Pronouns.PREFIRO_NAO_DIZER]: "Prefiro não dizer"
}
export const personRegistrationSchema = z.object({
  socialName: z
    .string()
    .min(2, { message: "O nome social deve ter pelo menos 2 caracteres." })
    .max(70, { message: "O nome social não pode passar de 70 caracteres." }),
  civilName: z
    .string()
    .max(70, { message: "O nome civil não pode passar de 70 caracteres." })
    .min(2, { message: "O nome civil é obrigatório." }),
  pronouns: z.enum(PRONOUN_LABELS, {
     message: "Por favor, selecione um pronome válido." }),
  genderId: z
    .string()
    .min(1, { message: "A identidade de gênero é obrigatória." }),
  sexualityId: z
    .string()
    .min(1, { message: "A orientação sexual é obrigatória." })
})

// Extraímos a tipagem do TypeScript gerada automaticamente pelo Zod
export type PersonRegistrationFormData = z.infer<
  typeof personRegistrationSchema
>
</file>

<file path="apps/web/src/infra/http/api-client.ts">
import axios, { AxiosInstance } from "axios"

// 1. Criamos uma instância isolada.
// Isso evita sujar o escopo global do Axios caso você precise se conectar a outra API no futuro.
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000, // 10 segundos de limite. Se a API travar, o Axios corta a requisição.
  headers: {
    "Content-Type": "application/json"
  }
})

// 2. Interceptor de Requisição (Request)
// Funciona como um Middleware: tudo o que sai do front passa por aqui antes de ir para a internet.
apiClient.interceptors.request.use(
  (config) => {
    // Excelente lugar para capturar um Token de autenticação do localStorage/Cookies
    // e injetar automaticamente no Header Authorization.
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3. Interceptor de Resposta (Response)
// Intercepta o dado que chegou do NestJS antes dele chegar no seu Repositório.
apiClient.interceptors.response.use(
  (response) => response, // Se der status 2xx, passa direto sem alterar nada
  (error) => {
    // Se o backend der erro (4xx ou 5xx), nós centralizamos o tratamento aqui
    if (error.response) {
      // Exemplo: Se o NestJS retornar 401 (Não autorizado), podemos deslogar o usuário direto
      if (error.response.status === 401) {
        console.warn("Usuário não autorizado! Redirecionando...")
      }
    }
    return Promise.reject(error)
  }
)
</file>

<file path="apps/web/src/infra/http/api.ts">
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Erro ao processar requisição")
  }

  return response.json()
}
</file>

<file path="apps/web/src/infra/http/personRepository.ts">
import { apiFetch } from "./api"
import { Pronouns } from "@/domain/enums/pronouns"

// Este é o nosso DTO do Front-end espelhando o Back-end
export interface CreatePersonPayload {
  civilName: string
  socialName: string
  birthDate: Date | string // Aceita string porque o fetch converte a data
  cpf: string
  rg: string
  slug: string
  pronouns: Pronouns
  genderId: string
  sexualityId: string
}

export const personRepository = {
  createPerson: async (data: CreatePersonPayload) => {
    // O TypeScript garante que 'data' tem exatamente as chaves em camelCase
    // que o NestJS está esperando no Body da requisição.
    return apiFetch("/persons", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }
}
</file>

<file path="apps/web/src/infra/repositories/person-http-repository.ts">
import { PersonRepository } from "@/domain/repositories/person-repository"
import { PersonRegistrationFormData } from "@/domain/schemas/personSchema"
import { apiClient } from "../http/api-client" // Nossa instância global

export class PersonHttpRepository implements PersonRepository {
  async save(data: PersonRegistrationFormData): Promise<void> {
    try {
      // O Axios faz o JSON.stringify automaticamente nos bastidores!
      await apiClient.post("/people", {
        social_name: data.socialName,
        civil_name: data.civilName,
        pronouns: data.pronouns,
        gender_id: data.genderId,
        sexuality_id: data.sexualityId
      })
    } catch (error: any) {
      // O Axios encapsula o erro do NestJS dentro de 'error.response.data'
      const apiMessage = error.response?.data?.message

      // Lançamos um erro limpo para a camada de Aplicação capturar
      throw new Error(apiMessage || "Falha na comunicação com o servidor.")
    }
  }
}
</file>

<file path="apps/web/src/lib/utils.ts">
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
</file>

<file path="apps/web/app/page.tsx">
import { DataCollectionForm } from "@/components/data-collection-form"
import { DataVisualization } from "@/components/data-visualization"
import { SecureHeader } from "@/components/secure-header"
import {
  BarChart,
  ChartsGrid,
  Footer,
  MethodologyCard,
  MetricsGrid,
  PrivacyCard,
  RegionBars,
} from "@/components/utilComponent"
import { ShieldCheck } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-svh pb-16">
      <SecureHeader />

      <section className="mx-auto mt-12 w-full max-w-6xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-4 py-1.5 text-xs text-foreground/80">
          <ShieldCheck className="h-3.5 w-3.5 text-[#a5ccf9]" />
          Privacidade por design · Anonimização total
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Dados demográficos da população{" "}
          <span className="text-gradient">trans</span>, com total{" "}
          <span className="text-gradient">trans-parência</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          Coletamos e publicamos estatísticas com foco extremo em segurança e
          anonimização. Você contribui em segurança — a comunidade enxerga os
          dados de forma transparente.
        </p>
      </section>

      <div className="mx-auto mt-12 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <DataCollectionForm />
        <DataVisualization />
        <PrivacyCard />
        <MethodologyCard />
        <MetricsGrid />
        <ChartsGrid />
        <BarChart />
        <RegionBars />
        <Footer />
      </div>
    </main>
  )
}
</file>

<file path="apps/web/src/components/ui/custom/Select.tsx">
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SelectOption {
  value: string | number
  label: string
}

interface CustomSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  placeholder?: string
  options: SelectOption[]
  errorMessage?: string
}

export function CustomSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  errorMessage,
}: CustomSelectProps<TFieldValues>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-muted-foreground/90">
        {label}
      </label>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={
                field.value !== undefined && field.value !== null
                  ? String(field.value)
                  : ""
              }
            >
              <SelectTrigger
                className={cn(
                  // 1. CSS EXATO DO INPUT: Remove o estilo do Card e aplica o visual Cyberpunk Clean
                  "w-full rounded-xl outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#a5ccf9]/60 glass-border bg-secondary/30 px-4 py-3.5 text-base text-foreground text-left flex justify-between items-center h-auto font-normal",
                  errorMessage &&
                    "border-destructive focus:ring-destructive/20",
                )}
              >
                <SelectValue placeholder={placeholder || "Selecione..."} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {errorMessage && (
        <span className="text-xs font-medium text-destructive/90 mt-0.5 animate-fade-in">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
</file>

<file path="apps/web/src/infra/mocks/identityMocks.ts">
export const MOCK_GENDERS = [
  { id: "g-1", title: "Cisgênero", acronym: "CIS" },
  { id: "g-2", title: "Transgênero", acronym: "TRANS" },
  { id: "g-3", title: "Não-binário", acronym: "NBI" },
  { id: "g-4", title: "Outra identidade", acronym: "OUT" }
]

// Simulando exatamente a estrutura do CreateSexualityRequests do seu Backend
export const MOCK_SEXUALITIES = [
  { id: "s-1", title: "Heterossexual", acronym: "HET" },
  { id: "s-2", title: "Homossexual", acronym: "HOM" },
  { id: "s-3", title: "Bissexual", acronym: "BIS" },
  { id: "s-4", title: "Assexual", acronym: "ACE" },
  { id: "s-5", title: "Pansexual", acronym: "PAN" }
]
</file>

<file path="apps/web/src/components/forms/PersonRegistrationForm.tsx">
"use client"

import { Send, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"

import { Card } from "@/components/ui/Card"
import { CustomButton } from "@/components/ui/custom/Button"
import { CustomInput } from "@/components/ui/custom/Input"
import { CustomSelect } from "@/components/ui/custom/Select"

import { useRegisterPerson } from "@/application/hooks/useRegisterPerson"
import {
  PersonRegistrationFormData,
  personRegistrationSchema,
} from "@/domain/schemas/personSchema"
import { MOCK_GENDERS, MOCK_SEXUALITIES } from "@/infra/mocks/identityMocks"
import { zodResolver } from "@hookform/resolvers/zod"

export function PersonRegistrationForm() {
  const {
    register: savePerson,
    isLoading,
    error,
    isSuccess,
  } = useRegisterPerson()
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<PersonRegistrationFormData>({
    resolver: zodResolver(personRegistrationSchema),
  })

  const onSubmit = (data: PersonRegistrationFormData) => {
    console.log("Dados do formulário:", data)
  }

  return (
    <Card.Root className="p-6 sm:p-8">
      {/* Cabeçalho do Formulário (Apresentação) */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <Card.Header>
          <h2 className="text-xl font-semibold tracking-tight">
            Coleta de dados
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Suas informações são anonimizadas antes da publicação.
          </p>
        </Card.Header>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground/90 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Privacidade por design
        </span>
      </div>

      {/* 2. O Provedor do Shadcn (<Form>) que distribui o estado do Hook */}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* CAMPO: Nome Social */}
        <CustomInput
          {...register("socialName")}
          label="Nome Social"
          theme="white"
          errorMessage={errors.socialName?.message}
        />

        <CustomInput
          {...register("civilName")}
          label="Nome Civil"
          theme="default"
          errorMessage={errors.civilName?.message}
        />

        <CustomSelect
          name="pronouns"
          control={control}
          label="Pronomes"
          placeholder="Selecione seus pronomes"
          options={[
            { value: "ELE_DELE", label: "Ele / Dele" },
            { value: "ELA_DELA", label: "Ela / Dela" },
          ]}
          errorMessage={errors.pronouns?.message}
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-1">
          <CustomSelect
            name="genderId"
            control={control}
            label="Identidade de Gênero"
            placeholder="Selecione sua identidade de gênero"
            options={MOCK_GENDERS.map((gender) => ({
              value: gender.id,
              label: gender.title,
            }))}
            errorMessage={errors.genderId?.message}
          />
          <CustomSelect
            name="sexualityId"
            control={control}
            label="Orientação Sexual"
            placeholder="Selecione sua orientação sexual"
            options={MOCK_SEXUALITIES.map((sexuality) => ({
              value: sexuality.id,
              label: sexuality.title,
            }))}
            errorMessage={errors.sexualityId?.message}
          />
        </div>

        {/* Botão de Submissão */}
        <CustomButton
          type="submit"
          theme="brand"
          isLoading={isLoading}
          className="mt-2"
        >
          <Send className="h-4 w-4" />
          Enviar com segurança
        </CustomButton>
      </form>
    </Card.Root>
  )
}
</file>

</files>
