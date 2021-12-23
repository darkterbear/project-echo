"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingType = void 0;
class Building {
    constructor(position, type) {
        this.position = position;
        this.type = type;
    }
}
exports.default = Building;
var BuildingType;
(function (BuildingType) {
    BuildingType["NEXUS"] = "nexus";
    BuildingType["POWER_PLANT"] = "powerPlant";
    BuildingType["FARM"] = "farm";
    BuildingType["REFINERY"] = "refinery";
    BuildingType["BARRACKS"] = "barracks";
    BuildingType["TURRET"] = "turret";
    BuildingType["WATCHTOWER"] = "watchtower";
    BuildingType["TERRAIN"] = "terrain";
})(BuildingType = exports.BuildingType || (exports.BuildingType = {}));
//# sourceMappingURL=Building.js.map