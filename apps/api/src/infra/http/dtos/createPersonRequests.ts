import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Pronouns } from 'src/domain/enums/pronouns';

export class CreatePersonRequests {
  @IsString()
  @IsNotEmpty()
  civilName: string;

  @IsString()
  @IsOptional()
  socialName?: string | null;

  // 🎯 O @Type força a conversão do JSON string ("1995-05-15") para Date nativo do JS
  @Type(() => Date)
  @IsDate({ message: 'Data de nascimento inválida' })
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  rg: string;

  @IsArray()
  @IsEnum(Pronouns, { each: true })
  pronouns: Pronouns[];

  @IsString()
  @IsNotEmpty()
  genderId: string;

  @IsString()
  @IsNotEmpty()
  sexualityId: string;
}

export type UpdatePersonRequests = Partial<CreatePersonRequests>;