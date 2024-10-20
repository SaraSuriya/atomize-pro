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
const sets_1 = require("~/models/sets");
const mocks_1 = require("./mocks");
describe("Sets", () => {
    let tab;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.sync({ force: true });
        tab = yield tabs_1.Tabs.create(mocks_1.mockTab);
        mocks_1.mockSet.tab = tab.id;
        mocks_1.mockSetWithSomeTasks.forEach((task) => (task.tab = tab.id));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.drop();
        yield index_2.sequelize.close();
    }));
    it("should create a set list", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/api/sets").send(mocks_1.mockSet);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("list_name", mocks_1.mockSet.list_name);
        expect(res.body).toHaveProperty("task_name", mocks_1.mockSet.task_name);
        expect(res.body).toHaveProperty("sets", mocks_1.mockSet.sets);
        expect(res.body).toHaveProperty("completed_sets", mocks_1.mockSet.completed_sets);
        expect(res.body).toHaveProperty("reps", mocks_1.mockSet.reps);
        expect(res.body).toHaveProperty("color", mocks_1.mockSet.color);
        expect(res.body).toHaveProperty("tab", tab.id);
    }));
    it("should create a set list with multiple tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const task of mocks_1.mockSetWithSomeTasks) {
            const res = yield (0, supertest_1.default)(index_1.default).post("/api/sets").send(task);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("list_name", task.list_name);
            expect(res.body).toHaveProperty("task_name", task.task_name);
            expect(res.body).toHaveProperty("sets", task.sets);
            expect(res.body).toHaveProperty("completed_sets", task.completed_sets);
            expect(res.body).toHaveProperty("reps", task.reps);
            expect(res.body).toHaveProperty("color", task.color);
            expect(res.body).toHaveProperty("tab", tab.id);
        }
        const tasks = yield sets_1.Sets.findAll({
            where: { list_name: mocks_1.mockSetWithSomeTasks[0].list_name },
        });
        expect(tasks.length).toBe(mocks_1.mockSetWithSomeTasks.length);
        expect(tasks[0].task_name).toBe(mocks_1.mockSetWithSomeTasks[0].task_name);
        expect(tasks[1].task_name).toBe(mocks_1.mockSetWithSomeTasks[1].task_name);
    }));
    it("should delete a task from a set list", () => __awaiter(void 0, void 0, void 0, function* () {
        const task1 = yield sets_1.Sets.create(mocks_1.mockSetWithSomeTasks[0]);
        const task2 = yield sets_1.Sets.create(mocks_1.mockSetWithSomeTasks[1]);
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/api/sets/task/${task1.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Task deleted successfully");
        const deletedTask = yield sets_1.Sets.findByPk(task1.id);
        expect(deletedTask).toBeNull();
        const remainingTask = yield sets_1.Sets.findByPk(task2.id);
        expect(remainingTask).not.toBeNull();
        expect(remainingTask === null || remainingTask === void 0 ? void 0 : remainingTask.task_name).toBe(mocks_1.mockSetWithSomeTasks[1].task_name);
    }));
    it("should delete the set list", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const task of mocks_1.mockSetWithSomeTasks) {
            yield (0, supertest_1.default)(index_1.default).post("/api/sets").send(task);
        }
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/api/sets/${mocks_1.mockSetWithSomeTasks[0].list_name}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Sets list deleted successfully");
    }));
    it("should update the status of the set list", () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield (0, supertest_1.default)(index_1.default).post("/api/sets").send(mocks_1.mockSet);
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/api/sets/task/${task.body.id}/status`)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Set updated successfully");
        const updatedTask = yield sets_1.Sets.findByPk(task.body.id);
        expect(updatedTask === null || updatedTask === void 0 ? void 0 : updatedTask.completed_sets).toBe(1);
        expect(updatedTask === null || updatedTask === void 0 ? void 0 : updatedTask.complete).toBe(false);
    }));
});
//# sourceMappingURL=sets.test.js.map