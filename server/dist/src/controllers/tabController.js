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
exports.getAllListsForAllTabs = exports.getAllListsFromTab = exports.deleteTab = exports.createTab = exports.getAllTabs = void 0;
const simpleList_1 = require("~/models/simpleList");
const tabs_1 = require("../models/tabs");
const progressBar_1 = require("~/models/progressBar");
const levels_1 = require("~/models/levels");
const sets_1 = require("~/models/sets");
// get all tabs
const getAllTabs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTabs = yield tabs_1.Tabs.findAll();
        res.status(200).send(allTabs);
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
        res.status(500).send({ error: "An unknown error occurred" });
    }
});
exports.getAllTabs = getAllTabs;
// create tab
const createTab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, icon_name } = req.body;
        if (!name || !icon_name) {
            res.status(400).send({ message: "Name and icon name are required" });
            return;
        }
        const newTab = yield tabs_1.Tabs.create({ name, icon_name });
        res.status(201).send(newTab);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
        res.status(500).send({ error: "An unknown error occurred" });
    }
});
exports.createTab = createTab;
// delete tab by id
const deleteTab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tab = yield tabs_1.Tabs.findByPk(id);
        if (!tab) {
            res.status(404).send({ message: "Tab with such id not found" });
            return;
        }
        yield tab.destroy();
        res.status(200).send({ message: "Tab deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
        res.status(500).send({ error: "An unknown error occurred" });
    }
});
exports.deleteTab = deleteTab;
// get all types of lists from a tab
const getAllListsFromTab = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tabId } = req.params;
        const tab = yield tabs_1.Tabs.findByPk(tabId);
        if (!tab) {
            res.status(404).send({ message: "Tab not found" });
            return;
        }
        const simpleLists = yield simpleList_1.SimpleList.findAll({
            where: { tab: tabId },
        });
        const progressBar = yield progressBar_1.ProgressBar.findAll({
            where: { tab: tabId },
        });
        const levels = yield levels_1.Levels.findAll({
            where: { tab: tabId },
        });
        const sets = yield sets_1.Sets.findAll({
            where: { tab: tabId },
        });
        const allListTypes = { simpleLists, progressBar, levels, sets };
        res.status(200).send(allListTypes);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ message: "An unknown error occurred" });
        return;
    }
});
exports.getAllListsFromTab = getAllListsFromTab;
// get all lists from all tabs
const getAllListsForAllTabs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const simpleLists = yield simpleList_1.SimpleList.findAll({
            include: [tabs_1.Tabs],
        });
        const progressBars = yield progressBar_1.ProgressBar.findAll({
            include: [tabs_1.Tabs],
        });
        const levels = yield levels_1.Levels.findAll({
            include: [tabs_1.Tabs],
        });
        const sets = yield sets_1.Sets.findAll({
            include: [tabs_1.Tabs],
        });
        const allListTypes = { simpleLists, progressBars, levels, sets };
        res.status(200).send(allListTypes);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        res.status(500).send({ message: "An unknown error occurred" });
    }
});
exports.getAllListsForAllTabs = getAllListsForAllTabs;
//# sourceMappingURL=tabController.js.map