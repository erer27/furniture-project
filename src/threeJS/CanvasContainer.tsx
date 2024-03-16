import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import ObjectContainer from "./ObjectContainer";

const CanvasContainer = () => {
  useEffect(() => {}, []);

  return (
    <div className="m-8 border-2 border-black w-[48rem] h-[32rem] flex">
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}>
        <ObjectContainer />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
