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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const index_2 = require("../src/models/index");
const tabs_1 = require("../src/models/tabs");
const mocks_1 = require("./mocks");
describe("Tabs", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.sync({ force: true });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.drop();
        yield index_2.sequelize.close();
    }));
    it("should create a new tab", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/api/tabs").send(mocks_1.mockTab);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("name", mocks_1.mockTab.name);
        expect(res.body).toHaveProperty("icon_name", mocks_1.mockTab.icon_name);
    }));
    it("should get all tabs", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const tab of mocks_1.mockTabs) {
            yield tabs_1.Tabs.create(tab);
        }
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/tabs");
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(mocks_1.mockTabs.length);
    }));
    it("should delete a tab", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTab = yield tabs_1.Tabs.create(mocks_1.mockTabToDelete);
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/api/tabs/${newTab.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Tab deleted successfully");
        const deletedTab = yield tabs_1.Tabs.findByPk(newTab.id);
        expect(deletedTab).toBeNull();
    }));
});
//# sourceMappingURL=tabs.test.js.map