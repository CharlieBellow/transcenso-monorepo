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
exports.User = void 0;
var User = /** @class */ (function () {
    function User(props) {
        var _a, _b;
        this._id = (_a = props.id) !== null && _a !== void 0 ? _a : crypto.randomUUID();
        if (!props.name || props.name.trim() === '') {
            throw new Error('O nome é obrigatório.');
        }
        if (!props.email || props.email.trim() === '') {
            throw new Error('O email é obrigatório.');
        }
        if (!props.password || props.password.trim() === '') {
            throw new Error('A senha é obrigatória.');
        }
        this.props = __assign(__assign({}, props), { createdAt: (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date() });
    }
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this.props.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this.props.email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this.props.password;
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.toDTO = function () {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            token: this.props.token,
        };
    };
    return User;
}());
exports.User = User;
