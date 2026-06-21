"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
var Address = /** @class */ (function () {
    function Address(props) {
        var _a;
        this._id = (_a = props.id) !== null && _a !== void 0 ? _a : crypto.randomUUID();
        if (props.hasNumber && (!props.number || props.number.trim() === '')) {
            throw new Error('O número é obrigatório quando Sem Número não estiver marcado.');
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
    Object.defineProperty(Address.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "street", {
        get: function () {
            return this.props.street;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "number", {
        get: function () {
            return this.props.number;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "hasNumber", {
        get: function () {
            return this.props.hasNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "complement", {
        get: function () {
            return this.props.complement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "neighborhood", {
        get: function () {
            return this.props.neighborhood;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "city", {
        get: function () {
            return this.props.city;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "state", {
        get: function () {
            return this.props.state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "zipCode", {
        get: function () {
            return this.props.zipCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "country", {
        get: function () {
            return this.props.country;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "createdAt", {
        get: function () {
            return this.props.createdAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "updatedAt", {
        get: function () {
            return this.props.updatedAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "cellPhone", {
        get: function () {
            return this.props.cellPhone;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "email", {
        get: function () {
            return this.props.email;
        },
        enumerable: false,
        configurable: true
    });
    Address.prototype.toDTO = function () {
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
    };
    return Address;
}());
exports.Address = Address;
