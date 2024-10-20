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
exports.deleteProgressBarTask = exports.deleteProgressBarList = exports.updateProgressBarStatus = exports.createProgressBar = exports.getProgressBarsInTab = void 0;
const progressBar_1 = require("~/models/progressBar");
const tabs_1 = require("~/models/tabs");
// get progress bars from the tab
const getProgressBarsInTab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: tabId } = req.params;
        const progressBars = yield progressBar_1.ProgressBar.findAll({
            where: { tab: tabId },
            include: [tabs_1.Tabs],
        });
        if (progressBars.length === 0) {
            res.status(404).send({ message: "No tasks found for requested tab" });
            return;
        }
        res.status(200).send(progressBars);
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
exports.getProgressBarsInTab = getProgressBarsInTab;
// create a new progress bar
const createProgressBar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { list_name, task_name, goal_number, units, tab } = req.body;
        if (!list_name || !task_name || !goal_number || !units || !tab) {
            res.status(400).send({
                message: "List name, a task name, goal number, units, and a tab are required",
            });
            return;
        }
        const existingTab = yield tabs_1.Tabs.findByPk(tab); // Note: Added `await`
        if (!existingTab) {
            res.status(404).send({ message: "Assigned tab does not exist" });
            return;
        }
        const newProgressBar = yield progressBar_1.ProgressBar.create({
            list_name,
            task_name,
            goal_number,
            units,
            tab,
        });
        // Explicitly return the `id` like in createSimpleList
        res.status(201).json({
            id: newProgressBar.id, // Make sure the `id` is returned here
            list_name: newProgressBar.list_name,
            task_name: newProgressBar.task_name,
            goal_number: newProgressBar.goal_number,
            current_number: newProgressBar.current_number,
            units: newProgressBar.units,
            tab: newProgressBar.tab,
            message: "Progress bar created successfully",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ error: "An unknown error occurred" });
    }
});
exports.createProgressBar = createProgressBar;
// update progress bar status
const updateProgressBarStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { current_number } = req.body;
        // Find the progress bar by its ID
        const progressBar = yield progressBar_1.ProgressBar.findByPk(id);
        // Log the received current_number
        console.log(current_number);
        // Validate the current_number: It must be a number, and it can't be NaN or below 0
        if (typeof current_number !== "number" || isNaN(current_number)) {
            res.status(400).send({
                message: "The current number must be a valid number.",
            });
            return;
        }
        if (!progressBar) {
            res.status(404).send({ message: "Progress bar not found" });
            return;
        }
        const updatedCurrentNumber = Math.max(0, current_number);
        const isComplete = updatedCurrentNumber >= progressBar.goal_number;
        yield progressBar.update({
            current_number: updatedCurrentNumber,
            complete: isComplete,
        });
        res.status(200).send({
            message: "Progress bar updated successfully",
            complete: isComplete,
            current_number: updatedCurrentNumber,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ error: "An unknown error occurred" });
    }
});
exports.updateProgressBarStatus = updateProgressBarStatus;
// delete a progress bar list
const deleteProgressBarList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { list_name } = req.params;
        const deletedProgressBar = yield progressBar_1.ProgressBar.destroy({
            where: { list_name },
        });
        if (deletedProgressBar === 0) {
            res.status(404).send({ message: "Progress bar list not found" });
            return;
        }
        res.status(200).send({ message: "Progress Bar list deleted successfully" });
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
exports.deleteProgressBarList = deleteProgressBarList;
// delete a progress bar task
const deleteProgressBarTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTask = yield progressBar_1.ProgressBar.destroy({ where: { id } });
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
exports.deleteProgressBarTask = deleteProgressBarTask;
//# sourceMappingURL=progressBarController.js.map