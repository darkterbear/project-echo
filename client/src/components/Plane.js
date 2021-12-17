import React, { useRef } from 'react';

export default function Plane({ dimensions, color, ...props }) {
  const mesh = useRef()  
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={dimensions} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}