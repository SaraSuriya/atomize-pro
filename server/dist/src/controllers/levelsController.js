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
exports.deleteLevelsTask = exports.deleteLevelsList = exports.updateLevelsStatus = exports.getLevelsFromTab = exports.createLevelList = void 0;
const levels_1 = require("~/models/levels");
const tabs_1 = require("~/models/tabs");
// create a level list
const createLevelList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newLevelsList = yield levels_1.Levels.create({
            list_name,
            task_name,
            tab,
            color,
        });
        res.status(201).send(newLevelsList);
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
exports.createLevelList = createLevelList;
// get all levels from tab
const getLevelsFromTab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: tabId } = req.params;
        const levels = yield levels_1.Levels.findAll({
            where: { tab: tabId },
            include: [tabs_1.Tabs],
        });
        if (levels.length === 0) {
            res.status(404).send({ message: "No tasks found for requested tab" });
            return;
        }
        res.status(200).send(levels);
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
exports.getLevelsFromTab = getLevelsFromTab;
// update progress for levels
const updateLevelsStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const level = yield levels_1.Levels.findByPk(id);
        if (!level) {
            res.status(404).send({ message: "Levels List not found" });
            return;
        }
        if (level.level > 3) {
            res
                .status(400)
                .send({ message: "Levels task is already at maximum value of 3" });
            return;
        }
        const updatedLevel = level.level + 1;
        yield level.update({ level: updatedLevel });
        res
            .status(200)
            .send({ message: "Level updated successfully", level: updatedLevel });
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
exports.updateLevelsStatus = updateLevelsStatus;
// delete a levels list
const deleteLevelsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { list_name } = req.params;
        const deletedLevels = yield levels_1.Levels.destroy({
            where: { list_name },
        });
        if (deletedLevels === 0) {
            res.status(404).send({ message: "Levels list not found" });
            return;
        }
        res.status(200).send({ message: "Levels list deleted successfully" });
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
exports.deleteLevelsList = deleteLevelsList;
// delete a levels task
const deleteLevelsTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTask = yield levels_1.Levels.destroy({ where: { id } });
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
exports.deleteLevelsTask = deleteLevelsTask;
//# sourceMappingURL=levelsController.js.map