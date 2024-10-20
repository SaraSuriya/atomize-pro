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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.removeSimpleList = exports.removeTaskInSimpleList = exports.editTaskInSimpleList = exports.editListNameInSimpleList = exports.getSimpleLists = exports.createSimpleList = void 0;
const simpleList_1 = require("~/models/simpleList");
const tabs_1 = require("~/models/tabs");
// create simple list
const createSimpleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { list_name, task_name, tab, color } = req.body;
        if (!list_name || !task_name || !tab || !color) {
            res.status(400).send({
                message: "List name, a task name, task color and a tab are required",
            });
            return;
        }
        const existingTab = yield tabs_1.Tabs.findByPk(tab);
        if (!existingTab) {
            res.status(404).send({ message: "Assigned tab doesn't exist" });
            return;
        }
        const newSimpleList = yield simpleList_1.SimpleList.create({
            list_name,
            task_name,
            tab,
            color,
        });
        res.status(201).json({
            id: newSimpleList.id, // Assuming Sequelize auto-generates this
            list_name: newSimpleList.list_name,
            task_name: newSimpleList.task_name,
            tab: newSimpleList.tab,
            color: newSimpleList.color,
            message: "Simple list created successfully",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ error: "An unknown error occurred" });
        return;
    }
});
exports.createSimpleList = createSimpleList;
// get simple list with tasks
const getSimpleLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: tabId } = req.params;
        const simpleLists = yield simpleList_1.SimpleList.findAll({
            where: { tab: tabId },
            include: [tabs_1.Tabs],
        });
        if (simpleLists.length === 0) {
            res.status(404).send({ message: "No tasks found for requested tab" });
            return;
        }
        res.status(200).send(simpleLists);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ error: "An unknown error occurred" });
        return;
    }
});
exports.getSimpleLists = getSimpleLists;
// edit the list name
const editListNameInSimpleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { new_list_name } = req.body;
        const { old_list_name } = req.params;
        if (!new_list_name) {
            res.status(400).send({ message: "New list name is required" });
            return;
        }
        const updateTheListNames = yield simpleList_1.SimpleList.update({ list_name: new_list_name }, { where: { list_name: old_list_name } });
        if (updateTheListNames[0] === 0) {
            res
                .status(404)
                .send({ message: "Nothing to update, check entered list name" });
            return;
        }
        res.status(200).send({ message: "List names updated successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ error: "An unknown error occurred" });
        return;
    }
});
exports.editListNameInSimpleList = editListNameInSimpleList;
// edit task in a simple list
const editTaskInSimpleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { task_name } = req.body;
        const { id } = req.params;
        if (!task_name) {
            res.status(400).send({ message: "Task name is required" });
            return;
        }
        const updatedTask = yield simpleList_1.SimpleList.update({ task_name }, { where: { id } });
        if (updatedTask[0] === 0) {
            res.status(404).send({ message: "Task with such id not found" });
            return;
        }
        res.status(200).send("Task name updated successfully");
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ error: "An unknown error occurred" });
        return;
    }
});
exports.editTaskInSimpleList = editTaskInSimpleList;
// delete task from simple list
const removeTaskInSimpleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTask = yield simpleList_1.SimpleList.destroy({ where: { id } });
        if (deletedTask === 0) {
            res.status(404).send({ message: "Task not found" });
            return;
        }
        res.status(200).send({ message: "Task deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ error: "An unknown error occurred" });
        return;
    }
});
exports.removeTaskInSimpleList = removeTaskInSimpleList;
// delete entire simple list
const removeSimpleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { list_name } = req.params;
        const deletedSimpleList = yield simpleList_1.SimpleList.destroy({
            where: { list_name },
        });
        if (deletedSimpleList === 0) {
            res
                .status(404)
                .send({ message: "Simple list with such list name not found" });
            return;
        }
        res.status(200).send({ message: "Simple list deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ error: "An unknown error occurred" });
        return;
    }
});
exports.removeSimpleList = removeSimpleList;
// update simple list task status
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        console.log(`ID received: ${id}, type: ${typeof id}`);
        console.log(`ID received: ${id}`);
        const task = yield simpleList_1.SimpleList.findByPk(id);
        console.log(`Task fetched: ${task}`);
        if (!task) {
            res.status(404).send({ message: "Task not found" });
            return;
        }
        if (task.complete === true) {
            res.status(400).send({ message: "Task is already completed" });
            return;
        }
        yield task.update({ complete: true });
        res
            .status(200)
            .send({ message: "Task status updated to completed successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ error: "An unknown error occurred" });
        return;
    }
});
exports.updateTaskStatus = updateTaskStatus;
//# sourceMappingURL=simpleListController.js.map