"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPersonMapper = void 0;
var person_1 = require("../../../../domain/entities/person");
var PrismaPersonMapper = /** @class */ (function () {
    function PrismaPersonMapper() {
    }
    PrismaPersonMapper.toPrisma = function (person) {
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
    };
    PrismaPersonMapper.toDomain = function (raw) {
        return new person_1.Person({
            id: raw.id,
            civilName: String(raw.civilName),
            socialName: raw.socialName ? String(raw.socialName) : undefined,
            birthDate: raw.birthDate,
            cpf: raw.cpf,
            rg: raw.rg,
            pronouns: raw.pronouns,
            slug: raw.slug,
            genderId: raw.genderId,
            sexualityId: raw.sexualityId,
        });
    };
    return PrismaPersonMapper;
}());
exports.PrismaPersonMapper = PrismaPersonMapper;
