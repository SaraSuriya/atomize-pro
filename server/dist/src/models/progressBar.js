"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const tabs_1 = require("./tabs");
class ProgressBar extends sequelize_1.Model {
}
exports.ProgressBar = ProgressBar;
ProgressBar.init({
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
    goal_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    current_number: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    units: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Progress Bar",
    },
}, {
    sequelize: index_1.sequelize,
    tableName: "progressbars",
});
ProgressBar.belongsTo(tabs_1.Tabs, { foreignKey: "tab" });
tabs_1.Tabs.hasMany(ProgressBar, { foreignKey: "tab" });
//# sourceMappingURL=progressBar.js.map