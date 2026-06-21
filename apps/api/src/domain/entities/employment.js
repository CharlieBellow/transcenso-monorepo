"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employment = void 0;
var Employment = /** @class */ (function () {
    function Employment(props) {
        this.props = props;
    }
    Object.defineProperty(Employment.prototype, "title", {
        get: function () {
            return this.props.title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "typeEmployment", {
        get: function () {
            return this.props.typeEmployment;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "company", {
        get: function () {
            return this.props.company;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "worksActually", {
        get: function () {
            return this.props.worksActually;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "createdAt", {
        get: function () {
            return this.props.createdAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "updatedAt", {
        get: function () {
            return this.props.updatedAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "description", {
        get: function () {
            return this.props.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "skills", {
        get: function () {
            return this.props.skills;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "location", {
        get: function () {
            return this.props.location;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "typeJob", {
        get: function () {
            return this.props.typeJob;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "position", {
        get: function () {
            return this.props.position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "startDate", {
        get: function () {
            return this.props.startDate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employment.prototype, "endDate", {
        get: function () {
            return this.props.endDate;
        },
        enumerable: false,
        configurable: true
    });
    Employment.prototype.toDTO = function () {
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
    };
    return Employment;
}());
exports.Employment = Employment;
