import { Building as BaseBuilding, BuildingType, getMaxResources, getVisibleBuildings } from 'echo';
import Player from './Player';

export default class Building extends BaseBuilding {
  owner?: Player;
  resourceTimer?: NodeJS.Timeout;
  completionTimer?: NodeJS.Timeout;

  /**
   * Creates a new Player object, and added to the server state.
   */
  constructor(position: [number, number], type: BuildingType, owner?: Player, complete?: boolean) {
    super(position, type, complete);
    if (owner) {
      this.owner = owner;

      if (this.completionTime) {
        this.completionTimer = setTimeout(() => {
          this.completionTime = null;
          this.owner.socket.emit('building_complete', this.position);

          // If opponent can see this building, send complete to them as well
          if (this.owner.opponent().canSeeOpponentBuilding(this)) {
            this.owner.opponent().socket.emit('building_complete', this.position);
          }
          this.beginResourceInterval();
        }, this.completionTime - Date.now());
      } else {
        this.beginResourceInterval();
      }
    }
  }

  beginResourceInterval(): void {
    this.resourceTimer = setInterval(() => {
      switch(this.type) {
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
