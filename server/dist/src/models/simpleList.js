"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleList = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const tabs_1 = require("./tabs");
class SimpleList extends sequelize_1.Model {
}
exports.SimpleList = SimpleList;
SimpleList.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    list_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    task_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    complete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Simple List",
    },
}, {
    sequelize: index_1.sequelize,
    tableName: "simplelists",
});
SimpleList.belongsTo(tabs_1.Tabs, { foreignKey: "tab" });
tabs_1.Tabs.hasMany(SimpleList, { foreignKey: "tab" });
//# sourceMappingURL=simpleList.js.map