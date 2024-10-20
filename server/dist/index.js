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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./src/models/index");
require("module-alias/register");
const dotenv_1 = __importDefault(require("dotenv"));
const tabsRoutes_1 = __importDefault(require("./src/routes/tabsRoutes"));
const simpleListRoutes_1 = __importDefault(require("./src/routes/simpleListRoutes"));
const progressBarRoutes_1 = __importDefault(require("./src/routes/progressBarRoutes"));
const levelsRoutes_1 = __importDefault(require("./src/routes/levelsRoutes"));
const setsRoutes_1 = __importDefault(require("./src/routes/setsRoutes"));
dotenv_1.default.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express.json());
app.use("/api/tabs", tabsRoutes_1.default);
app.use("/api/simplelists", simpleListRoutes_1.default);
app.use("/api/progressbars", progressBarRoutes_1.default);
app.use("/api/levels", levelsRoutes_1.default);
app.use("/api/sets", setsRoutes_1.default);
(function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield index_1.sequelize.sync();
            app.listen(PORT, () => {
                console.log(`🚀 The server is running and listening on port ${PORT}!`);
            });
        }
        catch (err) {
            console.log(`😞 Something went wrong connecting to the server! ${err}`);
        }
    });
})();
exports.default = app;
//# sourceMappingURL=index.js.map