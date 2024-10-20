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
const levels_1 = require("~/models/levels");
const mocks_1 = require("./mocks");
describe("Levels", () => {
    let tab;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.sync({ force: true });
        tab = yield tabs_1.Tabs.create(mocks_1.mockTab);
        mocks_1.mockLevel.tab = tab.id;
        mocks_1.mockLevelWithSomeTasks.forEach((task) => (task.tab = tab.id));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.drop();
        yield index_2.sequelize.close();
    }));
    it("should create a levels list", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/api/levels").send(mocks_1.mockLevel);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("list_name", mocks_1.mockLevel.list_name);
        expect(res.body).toHaveProperty("task_name", mocks_1.mockLevel.task_name);
        expect(res.body).toHaveProperty("color", mocks_1.mockLevel.color);
        expect(res.body).toHaveProperty("level", mocks_1.mockLevel.level);
        expect(res.body).toHaveProperty("tab", tab.id);
    }));
    it("should create a levels list with multiple tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const task of mocks_1.mockLevelWithSomeTasks) {
            const res = yield (0, supertest_1.default)(index_1.default).post("/api/levels").send(task);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("list_name", task.list_name);
            expect(res.body).toHaveProperty("task_name", task.task_name);
            expect(res.body).toHaveProperty("color", task.color);
            expect(res.body).toHaveProperty("level", task.level);
            expect(res.body).toHaveProperty("tab", tab.id);
        }
        const tasks = yield levels_1.Levels.findAll({
            where: { list_name: mocks_1.mockLevelWithSomeTasks[0].list_name },
        });
        expect(tasks.length).toBe(mocks_1.mockLevelWithSomeTasks.length);
        expect(tasks[0].task_name).toBe(mocks_1.mockLevelWithSomeTasks[0].task_name);
        expect(tasks[1].task_name).toBe(mocks_1.mockLevelWithSomeTasks[1].task_name);
    }));
    it("should delete a task from levels list", () => __awaiter(void 0, void 0, void 0, function* () {
        const task1 = yield levels_1.Levels.create(mocks_1.mockLevelWithSomeTasks[0]);
        const task2 = yield levels_1.Levels.create(mocks_1.mockLevelWithSomeTasks[1]);
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/api/levels/task/${task1.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Task deleted successfully");
        const deletedTask = yield levels_1.Levels.findByPk(task1.id);
        expect(deletedTask).toBeNull();
        const remainingTask = yield levels_1.Levels.findByPk(task2.id);
        expect(remainingTask).not.toBeNull();
        expect(remainingTask === null || remainingTask === void 0 ? void 0 : remainingTask.task_name).toBe(mocks_1.mockLevelWithSomeTasks[1].task_name);
    }));
    it("should delete the levels list", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const task of mocks_1.mockLevelWithSomeTasks) {
            yield (0, supertest_1.default)(index_1.default).post("/api/levels").send(task);
        }
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/api/levels/${mocks_1.mockLevelWithSomeTasks[0].list_name}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Levels list deleted successfully");
    }));
    it("should update the status of levels list", () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield (0, supertest_1.default)(index_1.default).post("/api/levels").send(mocks_1.mockLevel);
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/api/levels/task/${task.body.id}/status`)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Level updated successfully");
        const updatedTask = yield levels_1.Levels.findByPk(task.body.id);
        expect(updatedTask === null || updatedTask === void 0 ? void 0 : updatedTask.level).toBe(1);
        expect(updatedTask === null || updatedTask === void 0 ? void 0 : updatedTask.complete).toBe(false);
    }));
});
//# sourceMappingURL=levels.test.js.map