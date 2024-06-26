import { useEffect, useRef } from "react";
import { FlyControls } from "./flycontrols/FlyControls";
import FloorPlane from "./CreateRoom";
import useKey from "../hooks/useKey";
import FurnitureContainer from "./FurnitureContainer";

import { PointerLockControlsComponent } from "./PointerLockControlsComponent";
import { furnitureInfo } from "./FurnitureInfo";
import { useSelector } from "react-redux";
import { RootState } from "../Reducer";

const ObjectContainer = () => {
  const controlState = useSelector((state: RootState) => {
    //true가 활성화 false가 비활성화
    return state.pointerLockControls.controlsState;
  });
  const control = useRef<any>();

  //useKey(control.current);

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
      {controlState && (
        <FlyControls dragToLook={true} movementSpeed={10} ref={control} />
      )}
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
