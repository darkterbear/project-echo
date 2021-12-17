import React, { useRef } from 'react';

export default function Plane(props) {
  const mesh = useRef()  
  return (
    <mesh {...props} ref={mesh}>
    <boxGeometry args={[100, 100, 1]} />
    <meshStandardMaterial color={'#383842'} />
    </mesh>
  )
}