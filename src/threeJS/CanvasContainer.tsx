import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import ObjectContainer from "./ObjectContainer";

const CanvasContainer = () => {
  const obj = useRef(null);
  const scene = new THREE.Scene();

  useEffect(() => {
    console.log(obj);
  }, []);

  return (
    <div className="m-8 border-2 border-black w-[48rem] h-[32rem] flex">
      <Canvas
        scene={scene}
        ref={obj}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
      >
        <ObjectContainer />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
