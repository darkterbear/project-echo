import './css/GamePage.scss';
import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Plane from './components/Plane';
import CameraMover from './components/CameraMover';

function GamePage() {

  const canvasRef = useRef();
  const [panRight, setPanRight] = React.useState(false);
  const [panLeft, setPanLeft] = React.useState(false);
  const [panUp, setPanUp] = React.useState(false);
  const [panDown, setPanDown] = React.useState(false);

  useEffect(() => {
    window.addEventListener('mousemove', (pos) => {
      const { clientX: x, clientY: y } = pos;

      setPanRight(x / window.innerWidth > 0.9);
      setPanLeft(x / window.innerWidth < 0.1);

      setPanUp(y / window.innerHeight < 0.1);
      setPanDown(y / window.innerHeight > 0.9);
    })
  }, []);

  return (
    <React.Fragment>
      <Canvas ref={canvasRef} shadows style={{ height: '100vh'}} camera={{ rotation: [Math.PI / 6, 0, 0], position: [-40, -40 - (50 / Math.sqrt(3)), 50]}}>
        <CameraMover canvasRef={canvasRef} panUp={panUp} panDown={panDown} panLeft={panLeft} panRight={panRight} />
        <color attach="background" args={['#17171b']} />

        <ambientLight intensity={1} />
        <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}>
          <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
        </directionalLight>

        <Plane position={[0, 0, 0]}/>
      </Canvas>
    </React.Fragment>
  );
}

export default GamePage;
