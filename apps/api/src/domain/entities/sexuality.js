"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sexuality = void 0;
var Sexuality = /** @class */ (function () {
    function Sexuality(props) {
        var _a, _b, _c;
        this._id = (_a = props.id) !== null && _a !== void 0 ? _a : crypto.randomUUID();
        if (!props.title || props.title.trim() === '') {
            throw new Error('O título é obrigatório.');
        }
        // colocar a lógica de que não pode ter duas siglas iguais, ou seja, não pode ter dois gêneros com a mesma sigla. Isso é importante para garantir a integridade dos dados e evitar confusões na hora de identificar os gêneros.
        var normalizedSigla = props.acronym.trim().toUpperCase();
        if (normalizedSigla.length < 2 || normalizedSigla.length > 5) {
            throw new Error('A sigla deve ter entre 3 e 5 caracteres.');
        }
        var generatedSlug = props.title
            .toLowerCase()
            .trim()
            .normalize('NFD') // Remove acentos
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-');
        this.props = __assign(__assign({}, props), { slug: (_b = props.slug) !== null && _b !== void 0 ? _b : generatedSlug, acronym: normalizedSigla, createdAt: (_c = props.createdAt) !== null && _c !== void 0 ? _c : new Date() });
    }
    Sexuality.prototype.updateDetails = function (props) {
        this.props.title = props.title;
        this.props.description = props.description;
        this.props.updatedAt = new Date(); // O Domínio dita quando a data muda!
    };
    Object.defineProperty(Sexuality.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sexuality.prototype, "title", {
        get: function () {
            return this.props.title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sexuality.prototype, "acronym", {
        get: function () {
            return this.props.acronym;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sexuality.prototype, "description", {
        get: function () {
            return this.props.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sexuality.prototype, "slug", {
        get: function () {
            return this.props.slug;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sexuality.prototype, "createdAt", {
        get: function () {
            return this.props.createdAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sexuality.prototype, "updatedAt", {
        get: function () {
            return this.props.updatedAt;
        },
        enumerable: false,
        configurable: true
    });
    Sexuality.prototype.toDTO = function () {
        return {
            id: this.id,
            title: this.title,
            acronym: this.acronym,
            description: this.description,
        };
    };
    return Sexuality;
}());
exports.Sexuality = Sexuality;
