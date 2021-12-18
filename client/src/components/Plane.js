import React, { useRef, useState } from 'react';
import { DARK_GREEN, SKY_BLUE } from '../util';

export default function Plane({ dimensions, color, ...props }) {
  const mesh = useRef();
  const selectionMesh = useRef();

  const [mouseDownLocation, setMouseDownLocation] = useState(null);

  const handleDown = (e) => {
    e.stopPropagation();
    setMouseDownLocation(e.intersections[0].point);
    selectionMesh.current.scale.x = 0;
    selectionMesh.current.scale.y = 0;
    selectionMesh.current.position.z = 0.01;
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
  };

  return (
    <>
      <mesh {...props} receiveShadow ref={mesh} onPointerDown={handleDown} onPointerUp={handleUp} onPointerMove={handleMove}>
        <boxGeometry args={dimensions} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh receiveShadow position={[1,1,-1]} ref={selectionMesh}>
        <planeGeometry args={[1,1]} />
        <meshStandardMaterial color={'#264fcf'}/>
      </mesh>
    </>
  )
}