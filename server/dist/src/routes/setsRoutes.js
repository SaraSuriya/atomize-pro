"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const setsController_1 = require("~/controllers/setsController");
const router = express.Router();
router.post("/", setsController_1.createSetsList);
router.get("/:id", setsController_1.getSetsFromTab);
router.put("/task/:id/status", setsController_1.updateSetsStatus);
router.delete("/:list_name", setsController_1.deleteSetsList);
router.delete("/task/:id", setsController_1.deleteSetsTask);
exports.default = router;
//# sourceMappingURL=setsRoutes.js.map