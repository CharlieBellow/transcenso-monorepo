"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSexualityMapper = void 0;
var sexuality_1 = require("../../../../domain/entities/sexuality");
var PrismaSexualityMapper = /** @class */ (function () {
    function PrismaSexualityMapper() {
    }
    PrismaSexualityMapper.toPrisma = function (sexuality) {
        return {
            id: sexuality.id,
            title: sexuality.title,
            acronym: sexuality.acronym,
            description: sexuality.description,
            slug: sexuality.slug,
            createdAt: sexuality.createdAt,
            updatedAt: sexuality.updatedAt,
        };
    };
    PrismaSexualityMapper.toDomain = function (raw) {
        var _a, _b;
        return new sexuality_1.Sexuality({
            id: raw.id,
            title: raw.title,
            acronym: raw.acronym,
            description: (_a = raw.description) !== null && _a !== void 0 ? _a : '',
            slug: raw.slug,
            createdAt: raw.createdAt,
            updatedAt: (_b = raw.updatedAt) !== null && _b !== void 0 ? _b : undefined,
        });
    };
    return PrismaSexualityMapper;
}());
exports.PrismaSexualityMapper = PrismaSexualityMapper;
