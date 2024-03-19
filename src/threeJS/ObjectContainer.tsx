import { useEffect, useRef } from "react";
import { FlyControls } from "@react-three/drei";
import FloorPlane from "./Floor";
import useKey from "../hooks/useKey";
import FurnitureContainer from "./FurnitureContainer";

import { PointerLockControlsComponent } from "./PointerLockControlsComponent";

const ObjectContainer = () => {
  const control = useRef<any>();

  useKey(control);

  return (
    <group>
      <FlyControls dragToLook={true} movementSpeed={10} />
      <PointerLockControlsComponent />
      <ambientLight intensity={1} />
      <directionalLight position={[-1, 0, 1]} />
      <axesHelper args={[10]} />
      <FloorPlane />
      <FurnitureContainer />
    </group>
  );
};

export default ObjectContainer;
