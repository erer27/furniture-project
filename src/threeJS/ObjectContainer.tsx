import { useEffect, useRef } from "react";
import { FlyControls, Html, PointerLockControls } from "@react-three/drei";
import FloorPlane from "./Floor";
import { useFrame, useThree } from "@react-three/fiber";
import useKey from "../hooks/useKey";
import FurnitureContainer from "./FurnitureContainer";
import { useDispatch } from "react-redux";

const initialState = {
  controlsState: false,
};

export function PointerLockControlsReducer(
  controlsState = initialState,
  action: any
) {
  switch (action.type) {
    case "active": {
      return {
        ...controlsState,
        controlsState: true,
      };
    }
    case "inactive": {
      return {
        ...controlsState,
        controlsState: false,
      };
    }
    default:
      return controlsState;
  }
}

const ObjectContainer = () => {
  const three = useThree();
  const control = useRef<any>();
  const dispatch = useDispatch();

  useKey(control);

  useEffect(() => {
    control.current?.addEventListener("lock", () => {
      dispatch({ type: "active" });
      // console.log("lock");
    });
    control.current?.addEventListener("unlock", () => {
      dispatch({ type: "inactive" });
      // console.log("unlock");
    });
  });

  return (
    <group>
      <FlyControls dragToLook={true} movementSpeed={10} />
      <PointerLockControls ref={control} />
      <ambientLight intensity={1} />
      <directionalLight position={[-1, 0, 1]} />
      <axesHelper args={[10]} />
      <FloorPlane />
      <FurnitureContainer />
    </group>
  );
};

export default ObjectContainer;
