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
exports.deleteSetsTask = exports.deleteSetsList = exports.updateSetsStatus = exports.getSetsFromTab = exports.createSetsList = void 0;
const sets_1 = require("~/models/sets");
const tabs_1 = require("~/models/tabs");
// create a sets list
const createSetsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { list_name, task_name, tab, color, sets, reps } = req.body;
        console.log(req.body);
        if (!list_name || !task_name || !tab || !color || !sets || !reps) {
            res.status(400).send({
                message: "List name, a task name, task color, sets, reps and a tab are required",
            });
            return;
        }
        const existingTab = yield tabs_1.Tabs.findByPk(tab);
        if (!existingTab) {
            res.status(404).send({ message: "Assigned tab doesn't exist" });
            return;
        }
        const newSetsList = yield sets_1.Sets.create({
            list_name,
            task_name,
            tab,
            color,
            sets,
            reps,
        });
        res.status(201).send(newSetsList);
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
exports.createSetsList = createSetsList;
// get all sets from a tab
const getSetsFromTab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: tabId } = req.params;
        const sets = yield sets_1.Sets.findAll({ where: { id: tabId }, include: [tabs_1.Tabs] });
        if (sets.length === 0) {
            res.status(404).send({ message: "No tasks found for requested tab" });
            return;
        }
        res.status(200).send(sets);
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
exports.getSetsFromTab = getSetsFromTab;
// update progress for sets
const updateSetsStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const set = yield sets_1.Sets.findByPk(id);
        if (!set) {
            res.status(404).send({ message: "Set List not found" });
            return;
        }
        if (set.completed_sets >= set.sets) {
            res.status(400).send({ message: "Set is already completed" });
            return;
        }
        const updatedCompletedSets = set.completed_sets + 1;
        const isComplete = updatedCompletedSets >= set.sets;
        yield set.update({
            completed_sets: updatedCompletedSets,
            complete: isComplete,
        });
        res.status(200).send({
            message: "Set updated successfully",
            completed_sets: updatedCompletedSets,
            complete: isComplete,
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
exports.updateSetsStatus = updateSetsStatus;
// delete sets list
const deleteSetsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { list_name } = req.params;
        const deletedList = yield sets_1.Sets.destroy({
            where: { list_name },
        });
        if (deletedList === 0) {
            res.status(404).send({ message: "Sets list not found" });
            return;
        }
        res.status(200).send({ message: "Sets list deleted successfully" });
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
exports.deleteSetsList = deleteSetsList;
// delete sets task
const deleteSetsTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTask = yield sets_1.Sets.destroy({
            where: { id },
        });
        if (deletedTask === 0) {
            res.status(404).send({ message: "Set task not found" });
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
exports.deleteSetsTask = deleteSetsTask;
//# sourceMappingURL=setsController.js.map