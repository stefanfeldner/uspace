"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
let server;
(0, globals_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    server = yield app_1.default.listen(3001);
}));
(0, globals_1.afterEach)(() => {
    server.close();
});
(0, globals_1.it)('simple test', () => {
    (0, globals_1.expect)(1 + 1).toBe(2);
});
(0, globals_1.describe)('GET/', () => {
    (0, globals_1.describe)('when the user login in GET/users/:sub', () => {
        (0, globals_1.it)('Get User Request', () => __awaiter(void 0, void 0, void 0, function* () {
            const output = yield (0, supertest_1.default)(app_1.default).get('/users');
            console.log(output.body);
            (0, globals_1.expect)(output.statusCode).toEqual(200);
        }));
    });
});
(0, globals_1.describe)('GET/', () => {
    (0, globals_1.describe)('when the user login in GET/users/:sub', () => {
        (0, globals_1.it)('Get User Request', () => __awaiter(void 0, void 0, void 0, function* () {
            const output = yield (0, supertest_1.default)(app_1.default).get('/users');
            (0, globals_1.expect)(output.statusCode).toEqual(200);
        }));
    });
});
(0, globals_1.describe)('GET/', () => {
    (0, globals_1.describe)('when the user login in GET/users/:sub', () => {
        (0, globals_1.it)('Get User Request', () => __awaiter(void 0, void 0, void 0, function* () {
            const output = yield (0, supertest_1.default)(app_1.default).get('/users');
            (0, globals_1.expect)(output.statusCode).toEqual(200);
            console.log(output.body);
            (0, globals_1.expect)(output.body).toEqual(200);
        }));
    });
});
