"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Levels = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const tabs_1 = require("./tabs");
class Levels extends sequelize_1.Model {
}
exports.Levels = Levels;
Levels.init({
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
    level: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            max: 3,
            min: 0,
        },
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Levels",
    },
}, {
    sequelize: index_1.sequelize,
    tableName: "levels",
});
Levels.belongsTo(tabs_1.Tabs, { foreignKey: "tab" });
tabs_1.Tabs.hasMany(Levels, { foreignKey: "tab" });
//# sourceMappingURL=levels.js.map