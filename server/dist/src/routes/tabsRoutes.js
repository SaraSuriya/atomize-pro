"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const tabController_1 = require("../controllers/tabController");
const router = express.Router();
router.get("/", tabController_1.getAllTabs);
router.get("/:tabId/lists", tabController_1.getAllListsFromTab);
router.get('/lists/all', tabController_1.getAllListsForAllTabs);
router.post("/", tabController_1.createTab);
router.delete("/:id", tabController_1.deleteTab);
exports.default = router;
//# sourceMappingURL=tabsRoutes.js.map