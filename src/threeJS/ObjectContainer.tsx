import { useEffect, useRef } from "react";
import { FlyControls } from "./flycontrols/FlyControls";
import FloorPlane from "./Floor";
import useKey from "../hooks/useKey";
import FurnitureContainer from "./FurnitureContainer";

import { PointerLockControlsComponent } from "./PointerLockControlsComponent";
import { furnitureInfo } from "./FurnitureInfo";

const ObjectContainer = () => {
  const control = useRef<any>();

  useKey(control.current);

  useEffect(() => {
    control.current?.addEventListener("keydown", (e: any) => {
      console.log(e);
    });

    // window.removeEventListener("keydown");
    return () => {
      control.current?.removeEventListener("change", () => {
        console.log("right");
      });
    };
  });

  return (
    <group>
      <FlyControls dragToLook={true} movementSpeed={10} ref={control} />
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
