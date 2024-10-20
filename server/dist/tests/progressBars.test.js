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
const progressBar_1 = require("~/models/progressBar");
const mocks_1 = require("./mocks");
describe("Progress Bars", () => {
    let tab;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.sync({ force: true });
        tab = yield tabs_1.Tabs.create(mocks_1.mockTab);
        mocks_1.mockProgressBar.tab = tab.id;
        mocks_1.mockProgressBarWithSomeTasks.forEach((task) => (task.tab = tab.id));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield index_2.sequelize.drop();
        yield index_2.sequelize.close();
    }));
    it("should create a progress bar", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/progressbars")
            .send(mocks_1.mockProgressBar);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("list_name", mocks_1.mockProgressBar.list_name);
        expect(res.body).toHaveProperty("task_name", mocks_1.mockProgressBar.task_name);
        expect(res.body).toHaveProperty("goal_number", mocks_1.mockProgressBar.goal_number);
        expect(res.body).toHaveProperty("current_number", mocks_1.mockProgressBar.current_number);
        expect(res.body).toHaveProperty("units", mocks_1.mockProgressBar.units);
        expect(res.body).toHaveProperty("tab", tab.id);
    }));
    it("should create a progress bar list with multiple progress bars", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const task of mocks_1.mockProgressBarWithSomeTasks) {
            const res = yield (0, supertest_1.default)(index_1.default).post("/api/progressbars").send(task);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty("list_name", task.list_name);
            expect(res.body).toHaveProperty("task_name", task.task_name);
            expect(res.body).toHaveProperty("goal_number", task.goal_number);
            expect(res.body).toHaveProperty("current_number", task.current_number);
            expect(res.body).toHaveProperty("units", task.units);
            expect(res.body).toHaveProperty("tab", tab.id);
        }
        const tasks = yield progressBar_1.ProgressBar.findAll({
            where: { list_name: mocks_1.mockProgressBarWithSomeTasks[0].list_name },
        });
        expect(tasks.length).toBe(mocks_1.mockProgressBarWithSomeTasks.length);
        expect(tasks[0].task_name).toBe(mocks_1.mockProgressBarWithSomeTasks[0].task_name);
        expect(tasks[1].task_name).toBe(mocks_1.mockProgressBarWithSomeTasks[1].task_name);
    }));
    it("should delete a progress bar from the progress bar list", () => __awaiter(void 0, void 0, void 0, function* () {
        const task1 = yield progressBar_1.ProgressBar.create(mocks_1.mockProgressBarWithSomeTasks[0]);
        const task2 = yield progressBar_1.ProgressBar.create(mocks_1.mockProgressBarWithSomeTasks[1]);
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/api/progressbars/task/${task1.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Task deleted successfully");
        const deletedTask = yield progressBar_1.ProgressBar.findByPk(task1.id);
        expect(deletedTask).toBeNull();
        const remainingTask = yield progressBar_1.ProgressBar.findByPk(task2.id);
        expect(remainingTask).not.toBeNull();
        expect(remainingTask === null || remainingTask === void 0 ? void 0 : remainingTask.task_name).toBe(mocks_1.mockProgressBarWithSomeTasks[1].task_name);
    }));
    it("should delete a progress bar list", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const task of mocks_1.mockProgressBarWithSomeTasks) {
            yield (0, supertest_1.default)(index_1.default).post("/api/progressbars").send(task);
        }
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/api/progressbars/${mocks_1.mockProgressBarWithSomeTasks[0].list_name}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Progress Bar list deleted successfully");
    }));
    it("should update the progress of a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield (0, supertest_1.default)(index_1.default)
            .post("/api/progressbars")
            .send(mocks_1.mockProgressBar);
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/api/progressbars/task/${task.body.id}/status`)
            .send({ current_number: 100 });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Progress bar updated successfully");
        const updatedTask = yield progressBar_1.ProgressBar.findByPk(task.body.id);
        expect(updatedTask === null || updatedTask === void 0 ? void 0 : updatedTask.current_number).toBe(100);
        expect(updatedTask === null || updatedTask === void 0 ? void 0 : updatedTask.complete).toBe(true);
    }));
});
//# sourceMappingURL=progressBars.test.js.map