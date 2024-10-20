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
const simpleList_1 = require("~/models/simpleList");
describe("Simple Lists", () => {
    let tab;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.sync({ force: true });
        tab = yield tabs_1.Tabs.create(mocks_1.mockTab);
        mocks_1.mockSimpleList.tab = tab.id;
        mocks_1.mockSimpleListWithSomeTasks.forEach((task) => (task.tab = tab.id));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.drop();
        yield index_2.sequelize.close();
    }));
    it("should create a simple list", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/simplelists")
            .send(mocks_1.mockSimpleList);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("list_name", mocks_1.mockSimpleList.list_name);
        expect(res.body).toHaveProperty("task_name", mocks_1.mockSimpleList.task_name);
        expect(res.body).toHaveProperty("tab", tab.id);
        expect(res.body).toHaveProperty("color", mocks_1.mockSimpleList.color);
    }));
    it("should create a simple list with multiple tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const task of mocks_1.mockSimpleListWithSomeTasks) {
            const res = yield (0, supertest_1.default)(index_1.default).post("/api/simplelists").send(task);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("list_name", task.list_name);
            expect(res.body).toHaveProperty("task_name", task.task_name);
            expect(res.body).toHaveProperty("color", task.color);
            expect(res.body).toHaveProperty("tab", tab.id);
        }
        const tasks = yield simpleList_1.SimpleList.findAll({
            where: { list_name: mocks_1.mockSimpleListWithSomeTasks[0].list_name },
        });
        expect(tasks.length).toBe(mocks_1.mockSimpleListWithSomeTasks.length);
        expect(tasks[0].task_name).toBe(mocks_1.mockSimpleListWithSomeTasks[0].task_name);
        expect(tasks[1].task_name).toBe(mocks_1.mockSimpleListWithSomeTasks[1].task_name);
    }));
    it("should delete a task from a simple list", () => __awaiter(void 0, void 0, void 0, function* () {
        const task1 = yield simpleList_1.SimpleList.create(mocks_1.mockSimpleListWithSomeTasks[0]);
        const task2 = yield simpleList_1.SimpleList.create(mocks_1.mockSimpleListWithSomeTasks[1]);
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/api/simplelists/task/${task1.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Task deleted successfully");
        const deletedTask = yield simpleList_1.SimpleList.findByPk(task1.id);
        expect(deletedTask).toBeNull();
        const remainingTask = yield simpleList_1.SimpleList.findByPk(task2.id);
        expect(remainingTask).not.toBeNull();
        expect(remainingTask === null || remainingTask === void 0 ? void 0 : remainingTask.task_name).toBe(mocks_1.mockSimpleListWithSomeTasks[1].task_name);
    }));
    it("should delete an entire simple list", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const task of mocks_1.mockSimpleListWithSomeTasks) {
            yield (0, supertest_1.default)(index_1.default).post("/api/simplelists").send(task);
        }
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/api/simplelists/${mocks_1.mockSimpleListWithSomeTasks[0].list_name}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Simple list deleted successfully");
    }));
    it("should update the status of the task to completed", () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield (0, supertest_1.default)(index_1.default)
            .post("/api/simplelists")
            .send(mocks_1.mockSimpleList);
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/api/simplelists/task/${task.body.id}/status`)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Task status updated to completed successfully");
        const updatedTask1 = yield simpleList_1.SimpleList.findByPk(task.body.id);
        expect(updatedTask1 === null || updatedTask1 === void 0 ? void 0 : updatedTask1.complete).toBe(true);
    }));
});
//# sourceMappingURL=simpleList.test.js.map