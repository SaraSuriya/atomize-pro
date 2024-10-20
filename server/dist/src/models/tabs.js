"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Tabs extends sequelize_1.Model {
}
exports.Tabs = Tabs;
Tabs.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    icon_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: index_1.sequelize,
    tableName: "tabs",
});
//# sourceMappingURL=tabs.js.map