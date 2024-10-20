"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const progressBarController_1 = require("~/controllers/progressBarController");
const router = express.Router();
router.get("/:id", progressBarController_1.getProgressBarsInTab);
router.post("/", progressBarController_1.createProgressBar);
router.put("/task/:id/status", progressBarController_1.updateProgressBarStatus);
router.delete("/:list_name", progressBarController_1.deleteProgressBarList);
router.delete("/task/:id", progressBarController_1.deleteProgressBarTask);
exports.default = router;
//# sourceMappingURL=progressBarRoutes.js.map