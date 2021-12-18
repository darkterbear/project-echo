import React, { useRef } from 'react';
import { PLANE_THICKNESS } from '../util';

export const BuildingType = {
  NEXUS: 'nexus',
  POWER_PLANT: 'powerPlant',
  FARM: 'farm',
  REFINERY: 'refinery',
  BARRACKS: 'barracks',
  TURRET: 'turret',
  WATCHTOWER: 'watchtower',
};

const BUILDING_HEIGHT = 1.5;

export default function Building({ type, position }) {
  const mesh = useRef()  

  switch(type) {
    case BuildingType.NEXUS:
      return (
        <mesh position={[...position, BUILDING_HEIGHT / 2]} rotation={[Math.PI / 2, Math.PI / 4, 0]} ref={mesh}>
          <coneGeometry args={[Math.sqrt(2), BUILDING_HEIGHT, 4]} />
          <meshStandardMaterial color={'white'} />
        </mesh>
      );
    default:
      return null;
  }
}