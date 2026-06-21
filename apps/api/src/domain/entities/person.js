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
exports.Person = void 0;
var Person = /** @class */ (function () {
    // O constructor:  É o guarda da porta. Quando você der um new Person(...), o código dentro do construtor roda imediatamente.
    function Person(props) {
        var _a, _b, _c;
        this._id = (_a = props.id) !== null && _a !== void 0 ? _a : crypto.randomUUID();
        if (!props.civilName || props.civilName.trim() === '') {
            throw new Error('O nome civil é obrigatório.');
        }
        if (props.birthDate > new Date()) {
            throw new Error('A data de nascimento não pode ser no futuro.');
        }
        var generatedSlug = props.civilName
            .toLowerCase()
            .trim()
            .normalize('NFD') // Remove acentos
            .replace(/[\u0300-\u036f]/g, '') // Remove caracteres de acentos"")
            .replace(/\s+/g, '-');
        this.props = __assign(__assign({}, props), { slug: (_b = props.slug) !== null && _b !== void 0 ? _b : generatedSlug, createdAt: (_c = props.createdAt) !== null && _c !== void 0 ? _c : new Date() });
    }
    Object.defineProperty(Person.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "civilName", {
        get: function () {
            return this.props.civilName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "socialName", {
        get: function () {
            return this.props.socialName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "slug", {
        get: function () {
            return this.props.slug;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "cpf", {
        get: function () {
            return this.props.cpf;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "rg", {
        get: function () {
            return this.props.rg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "birthDate", {
        get: function () {
            return this.props.birthDate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "pronouns", {
        get: function () {
            return this.props.pronouns;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "genderId", {
        get: function () {
            return this.props.genderId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "sexualityId", {
        get: function () {
            return this.props.sexualityId;
        },
        enumerable: false,
        configurable: true
    });
    Person.prototype.updateDetails = function (props) {
        this.props.civilName = props.civilName;
        this.props.socialName = props.socialName;
        this.props.genderId = props.genderId;
        this.props.sexualityId = props.sexualityId;
        this.props.updatedAt = new Date(); // O Domínio dita a alteração
    };
    // Os getters :  Como as propriedades são privadas (private), os getters funcionam como uma janela. Você pode ver o nome (person.civilName), mas não pode alterá-lo diretamente (person.civilName = "Outro") sem criar um método específico para isso.
    Person.prototype.toDTO = function (relations) {
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
    };
    // Se um dia o módulo administrativo precisar do nome civil estrito:
    Person.prototype.getCivilNameForLegalPurposes = function () {
        return this.civilName;
    };
    return Person;
}());
exports.Person = Person;
