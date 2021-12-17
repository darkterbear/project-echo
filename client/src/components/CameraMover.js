import { useFrame } from '@react-three/fiber';

export default function CameraMover({ panDown, panUp, panLeft, panRight }) {
  useFrame((state) => {
    if (panRight) {
      state.camera.position.x += 0.3;
    }
    if (panLeft) {
      state.camera.position.x -= 0.3;
    }
    if (panUp) {
      state.camera.position.y += 0.3;
    }
    if (panDown) {
      state.camera.position.y -= 0.3;
    }
  });

  return null;
}