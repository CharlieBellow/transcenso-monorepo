"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaGenderMapper = void 0;
var gender_1 = require("../../../../domain/entities/gender");
var PrismaGenderMapper = /** @class */ (function () {
    function PrismaGenderMapper() {
    }
    PrismaGenderMapper.toPrisma = function (gender) {
        return {
            id: gender.id,
            title: gender.title,
            acronym: gender.acronym,
            description: gender.description,
            slug: gender.slug,
            createdAt: gender.createdAt,
            updatedAt: gender.updatedAt,
        };
    };
    PrismaGenderMapper.toDomain = function (raw) {
        var _a;
        return new gender_1.Gender({
            id: raw.id,
            title: raw.title,
            acronym: raw.acronym,
            description: raw.description,
            slug: raw.slug,
            createdAt: raw.createdAt,
            updatedAt: (_a = raw.updatedAt) !== null && _a !== void 0 ? _a : undefined,
        });
    };
    return PrismaGenderMapper;
}());
exports.PrismaGenderMapper = PrismaGenderMapper;
