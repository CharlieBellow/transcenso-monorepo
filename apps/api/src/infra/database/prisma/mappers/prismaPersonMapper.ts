import {
  Gender as PrismaGender,
  Person as PrismaPerson,
  Sexuality as PrismaSexuality,
  Prisma,
  Pronouns as PrismaPronouns,
} from 'src/generated/prisma';
import { Person } from '../../../../domain/entities/person';
import { Pronouns } from '../../../../domain/enums/pronouns';

type PrismaPersonWithRelations = PrismaPerson & {
  gender?: PrismaGender;
  sexuality?: PrismaSexuality;
};

export class PrismaPersonMapper {
  static toPrisma(person: Person): Prisma.PersonUncheckedCreateInput {
    return {
      id: person.id,
      civilName: person.civilName,
      socialName: person.socialName ?? null,
      birthDate: person.birthDate,
      cpf: person.cpf,
      rg: person.rg,
      pronouns: person.pronouns as unknown as PrismaPronouns[],
      slug: person.slug,
      genderId: person.genderId,
      sexualityId: person.sexualityId,
    };
  }

  static toDomain(raw: PrismaPersonWithRelations): Person {
    return Person.create({
      id: raw.id,
      civilName: String(raw.civilName),
      socialName: raw.socialName,
      birthDate: raw.birthDate,
      cpf: raw.cpf,
      rg: raw.rg,
      pronouns: raw.pronouns as unknown as Pronouns[],
      slug: raw.slug,
      genderId: raw.genderId,
      sexualityId: raw.sexualityId,
    });
  }
}
