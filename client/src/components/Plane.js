import React, { useRef, useState } from 'react';
import { idToLoc } from '../util';

const SELECTION_COLOR = '#264fcf';
export const VISIBLE_TILE_COLOR = '#52a523';
export const HIDDEN_TILE_COLOR = '#333333';

export default function Plane({ dimensions, visibility, onCellHover, selectionEnabled, onClick, ...props }) {
  const mesh = useRef();
  const selectionMesh = useRef();

  const [mouseDownLocation, setMouseDownLocation] = useState(null);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  }

  const handleDown = (e) => {
    e.stopPropagation();
    setMouseDownLocation(e.intersections[0].point);
    selectionMesh.current.scale.x = 0;
    selectionMesh.current.scale.y = 0;
    selectionMesh.current.position.z = 0.02;
  };

  const handleUp = (e) => {
    e.stopPropagation();
    setMouseDownLocation(null);
    selectionMesh.current.position.x = 1;
    selectionMesh.current.position.y = 1;
    selectionMesh.current.position.z = -1;

    selectionMesh.current.scale.x = 0;
    selectionMesh.current.scale.y = 0;
  }

  const handleMove = (e) => {
    e.stopPropagation();
    if (mouseDownLocation) {
      console.log(selectionMesh.current);

      selectionMesh.current.position.x = (e.intersections[0].point.x + mouseDownLocation.x) / 2;
      selectionMesh.current.position.y = (e.intersections[0].point.y + mouseDownLocation.y) / 2;

      selectionMesh.current.scale.x = e.intersections[0].point.x - mouseDownLocation.x;
      selectionMesh.current.scale.y = e.intersections[0].point.y - mouseDownLocation.y;
    }

    if (onCellHover) {
      onCellHover(Math.round(e.intersections[0].point.x), Math.round(e.intersections[0].point.y));
    }
  };

  return (
    <>
      <mesh {...props} receiveShadow ref={mesh} onClick={handleClick} onPointerDown={handleDown} onPointerUp={handleUp} onPointerMove={handleMove}>
        <boxGeometry args={dimensions} />
        <meshStandardMaterial color={HIDDEN_TILE_COLOR} />
      </mesh>
      { selectionEnabled && <mesh receiveShadow position={[1,1,-1]} ref={selectionMesh}>
        <planeGeometry args={[1,1]} />
        <meshStandardMaterial color={SELECTION_COLOR}/>
      </mesh>}
      {Array.from(visibility).filter(id => id >= 0).map((id) => <mesh receiveShadow position={[...idToLoc(id), 0.005]}>
        <planeGeometry args={[1,1]} />
        <meshStandardMaterial color={VISIBLE_TILE_COLOR}/>
      </mesh>)}
    </>
  )
}