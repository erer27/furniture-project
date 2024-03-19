import { PointerLockControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
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

export const PointerLockControlsComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    control.current?.addEventListener("lock", () => {
      dispatch({ type: "active" });
    });
    control.current?.addEventListener("unlock", () => {
      dispatch({ type: "inactive" });
    });
    return () => {
      control.current?.removeEventListener("lock", () => {
        dispatch({ type: "active" });
      });
      control.current?.removeEventListener("unlock", () => {
        dispatch({ type: "inactive" });
      });
    };
  });

  const control = useRef<any>();
  return <PointerLockControls ref={control} />;
};
