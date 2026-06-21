"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
var common_1 = require("@nestjs/common");
var createGenderUseCase_1 = require("../../application/useCases/gender/createGenderUseCase");
var deleteGenderUseCase_1 = require("../../application/useCases/gender/deleteGenderUseCase");
var findAllGendersUseCase_1 = require("../../application/useCases/gender/findAllGendersUseCase");
var findByAcronymGenderUseCase_1 = require("../../application/useCases/gender/findByAcronymGenderUseCase");
var findByIdGenderUseCase_1 = require("../../application/useCases/gender/findByIdGenderUseCase");
var findBySlugGenderUseCase_1 = require("../../application/useCases/gender/findBySlugGenderUseCase");
var updateGenderUseCase_1 = require("../../application/useCases/gender/updateGenderUseCase");
var createPersonUseCase_1 = require("../../application/useCases/person/createPersonUseCase");
var deletePersonUseCase_1 = require("../../application/useCases/person/deletePersonUseCase");
var findAllPersonUseCase_1 = require("../../application/useCases/person/findAllPersonUseCase");
var findByCpfPersonUseCase_1 = require("../../application/useCases/person/findByCpfPersonUseCase");
var findByIdPersonUseCase_1 = require("../../application/useCases/person/findByIdPersonUseCase");
var updatePersonUseCase_1 = require("../../application/useCases/person/updatePersonUseCase");
var createSexualityUseCase_1 = require("../../application/useCases/sexuality/createSexualityUseCase");
var deleteSexualityUseCase_1 = require("../../application/useCases/sexuality/deleteSexualityUseCase");
var findAllSexualityUseCase_1 = require("../../application/useCases/sexuality/findAllSexualityUseCase");
var findByAcronymSexualityUseCase_1 = require("../../application/useCases/sexuality/findByAcronymSexualityUseCase");
var findByIdSexualityUseCase_1 = require("../../application/useCases/sexuality/findByIdSexualityUseCase");
var findBySlugSexualityUseCase_1 = require("../../application/useCases/sexuality/findBySlugSexualityUseCase");
var database_module_1 = require("../database/database.module");
var createGenderController_1 = require("./controllers/gender/createGenderController");
var deleteGenderController_1 = require("./controllers/gender/deleteGenderController");
var findAllGendersController_1 = require("./controllers/gender/findAllGendersController");
var findByAcronymGenderController_1 = require("./controllers/gender/findByAcronymGenderController");
var findByIdGenderController_1 = require("./controllers/gender/findByIdGenderController");
var findBySlugGenderController_1 = require("./controllers/gender/findBySlugGenderController");
var updateGenderController_1 = require("./controllers/gender/updateGenderController");
var createPersonController_1 = require("./controllers/person/createPersonController");
var deletePersonController_1 = require("./controllers/person/deletePersonController");
var findAllPersonController_1 = require("./controllers/person/findAllPersonController");
var findByCpfPersonController_1 = require("./controllers/person/findByCpfPersonController");
var findByIdPersonController_1 = require("./controllers/person/findByIdPersonController");
var updatePersonControllrt_1 = require("./controllers/person/updatePersonControllrt");
var createSexualityController_1 = require("./controllers/sexuality/createSexualityController");
var deleteSexualityController_1 = require("./controllers/sexuality/deleteSexualityController");
var findAllSexualityController_1 = require("./controllers/sexuality/findAllSexualityController");
var findByAcronymSexualityController_1 = require("./controllers/sexuality/findByAcronymSexualityController");
var findByIdSexualityController_1 = require("./controllers/sexuality/findByIdSexualityController");
var findBySlugSexualityController_1 = require("./controllers/sexuality/findBySlugSexualityController");
var HttpModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [database_module_1.DatabaseModule], // Aqui o HTTP ganha acesso aos Repositórios
            controllers: [
                // Person
                createPersonController_1.CreatePersonController,
                findByCpfPersonController_1.FindByCpfPersonController,
                updatePersonControllrt_1.UpdatePersonController,
                deletePersonController_1.DeletePersonController,
                findAllPersonController_1.FindAllPersonController,
                findByIdPersonController_1.FindByIdPersonController,
                // Gender
                createGenderController_1.CreateGenderController,
                deleteGenderController_1.DeleteGenderController,
                findAllGendersController_1.FindAllGendersController,
                findByAcronymGenderController_1.FindByAcronymGenderController,
                findByIdGenderController_1.FindByIdGenderController,
                findBySlugGenderController_1.FindBySlugGenderController,
                updateGenderController_1.UpdateGendersController,
                // Sexuality
                createSexualityController_1.CreateSexualityController,
                deleteSexualityController_1.DeleteSexualityController,
                findAllSexualityController_1.FindAllSexualityController,
                findByAcronymSexualityController_1.FindByAcronymSexualityController,
                findByIdSexualityController_1.FindByIdSexualityController,
                findBySlugSexualityController_1.FindBySlugSexualityController,
            ], // Colocaremos os controllers aqui
            providers: [
                // Gender
                createGenderUseCase_1.CreateGenderUseCase,
                deleteGenderUseCase_1.DeleteGenderUseCase,
                findAllGendersUseCase_1.FindAllGendersUseCase,
                findByAcronymGenderUseCase_1.FindByAcronymGenderUseCase,
                findBySlugGenderUseCase_1.FindBySlugGenderUseCase,
                findByIdGenderUseCase_1.FindByIdGenderUseCase,
                updateGenderUseCase_1.UpdateGenderUseCase,
                // Person
                createPersonUseCase_1.CreatePersonUseCase,
                deletePersonUseCase_1.DeletePersonUseCase,
                findAllPersonUseCase_1.FindAllPersonUseCase,
                findByCpfPersonUseCase_1.FindByCpfPersonUseCase,
                findByIdPersonUseCase_1.FindByIdPersonUseCase,
                updatePersonUseCase_1.UpdatePersonUseCase,
                // Sexuality
                createSexualityUseCase_1.CreateSexualityUseCase,
                deleteSexualityUseCase_1.DeleteSexualityUseCase,
                findAllSexualityUseCase_1.FindAllSexualityUseCase,
                findByAcronymSexualityUseCase_1.FindByAcronymSexualityUseCase,
                findBySlugSexualityUseCase_1.FindBySlugSexualityUseCase,
                findByIdSexualityUseCase_1.FindByIdSexualityUseCase,
            ], // Colocaremos os Use Cases aqui
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HttpModule = _classThis = /** @class */ (function () {
        function HttpModule_1() {
        }
        return HttpModule_1;
    }());
    __setFunctionName(_classThis, "HttpModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpModule = _classThis;
}();
exports.HttpModule = HttpModule;
