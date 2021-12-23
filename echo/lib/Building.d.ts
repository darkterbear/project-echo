export default class Building {
    position: [number, number];
    type: BuildingType;
    constructor(position: [number, number], type: BuildingType);
}
export declare enum BuildingType {
    NEXUS = "nexus",
    POWER_PLANT = "powerPlant",
    FARM = "farm",
    REFINERY = "refinery",
    BARRACKS = "barracks",
    TURRET = "turret",
    WATCHTOWER = "watchtower",
    TERRAIN = "terrain"
}
