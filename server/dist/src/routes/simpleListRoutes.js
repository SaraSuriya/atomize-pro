"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simpleListController_1 = require("~/controllers/simpleListController");
const express = require("express");
const router = express.Router();
router.get("/:id", simpleListController_1.getSimpleLists);
router.post("/", simpleListController_1.createSimpleList);
router.put("/:old_list_name", simpleListController_1.editListNameInSimpleList);
router.put("/task/:id", simpleListController_1.editTaskInSimpleList);
router.put('/task/:id/status', simpleListController_1.updateTaskStatus);
router.delete("/:list_name", simpleListController_1.removeSimpleList);
router.delete("/task/:id", simpleListController_1.removeTaskInSimpleList);
exports.default = router;
//# sourceMappingURL=simpleListRoutes.js.map