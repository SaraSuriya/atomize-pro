"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const levelsController_1 = require("~/controllers/levelsController");
const router = express.Router();
router.get("/:id", levelsController_1.getLevelsFromTab);
router.post("/", levelsController_1.createLevelList);
router.put("/task/:id/status", levelsController_1.updateLevelsStatus);
router.delete("/:list_name", levelsController_1.deleteLevelsList);
router.delete("/task/:id", levelsController_1.deleteLevelsTask);
exports.default = router;
//# sourceMappingURL=levelsRoutes.js.map