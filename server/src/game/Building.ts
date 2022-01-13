import { Socket } from 'socket.io';
import Game from './Game';
import { Building as BaseBuilding, BuildingType, getMaxResources } from 'echo';
import Player from './Player';

export default class Building extends BaseBuilding {
  owner?: Player;
  resourceTimer?: NodeJS.Timeout;

  /**
   * Creates a new Player object, and added to the server state.
   */
  constructor(position: [number, number], type: BuildingType, owner?: Player) {
    super(position, type);
    if (owner) {
      this.owner = owner;

      this.resourceTimer = setInterval(() => {
        switch(type) {
        case BuildingType.NEXUS:
          this.owner.resources.energy += 1;
          this.owner.resources.food += 1;
          this.owner.resources.steel += 1;
          break;
        case BuildingType.POWER_PLANT:
          this.owner.resources.energy += 2;
          break;
        case BuildingType.FARM:
          this.owner.resources.food += 2;
          break;
        case BuildingType.REFINERY:
          this.owner.resources.steel += 2;
          break;
        default: return;
        }
        
        this.owner.resources.capMax(getMaxResources(this.owner.buildings));
        this.owner.socket.emit('update_resources', this.owner.resources);
      }, 3000);
    }
  }
}
