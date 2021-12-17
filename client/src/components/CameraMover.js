import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export default function CameraMover({ mouseThreshold = 0.1, speed = 0.8 }) {

  const [panRight, setPanRight] = useState(false);
  const [panLeft, setPanLeft] = useState(false);
  const [panUp, setPanUp] = useState(false);
  const [panDown, setPanDown] = useState(false);

  useEffect(() => {
    window.addEventListener('mousemove', (pos) => {
      const { clientX: x, clientY: y } = pos;

      setPanRight(x / window.innerWidth > 1 - mouseThreshold);
      setPanLeft(x / window.innerWidth < mouseThreshold);

      setPanUp(y / window.innerHeight < mouseThreshold);
      setPanDown(y / window.innerHeight > 1 - mouseThreshold);
    })
  }, []);

  useFrame((state) => {
    if (panRight) {
      state.camera.position.x += speed;
    }
    if (panLeft) {
      state.camera.position.x -= speed;
    }
    if (panUp) {
      state.camera.position.y += speed;
    }
    if (panDown) {
      state.camera.position.y -= speed;
    }
  });

  return null;
}