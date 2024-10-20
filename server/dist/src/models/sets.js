"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sets = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const tabs_1 = require("./tabs");
class Sets extends sequelize_1.Model {
}
exports.Sets = Sets;
Sets.init({
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
    completed_sets: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    sets: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reps: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sets",
    },
}, {
    sequelize: index_1.sequelize,
    tableName: "sets",
});
Sets.belongsTo(tabs_1.Tabs, { foreignKey: "tab" });
tabs_1.Tabs.hasMany(Sets, { foreignKey: "tab" });
//# sourceMappingURL=sets.js.map