import { PointerLockControls } from "@react-three/drei";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useKey from "../hooks/useKey";

const initialState = {
  controlsState: false,
};

// export function PointerLockControlsReducer(
//   controlsState = initialState,
//   action: any
// ) {
//   switch (action.type) {
//     case "active": {
//       return {
//         ...controlsState,
//         controlsState: true,
//       };
//     }
//     case "inactive": {
//       return {
//         ...controlsState,
//         controlsState: false,
//       };
//     }
//     default:
//       return controlsState;
//   }
// }

const PointerLockControlsSlice = createSlice({
  name: "pointerLockControls",
  initialState: initialState,
  reducers: {
    setActive: (state: typeof initialState) => {
      state.controlsState = true;
    },
    setInactive: (state: typeof initialState) => {
      state.controlsState = false;
    },
  },
});

const { setActive, setInactive } = PointerLockControlsSlice.actions;

export const pointerLockControlsReducer = PointerLockControlsSlice.reducer;

export const PointerLockControlsComponent = () => {
  const dispatch = useDispatch();

  const control = useRef<any>();

  useKey(control);

  useEffect(() => {
    control.current?.addEventListener("lock", () => {
      dispatch(setActive());
    });
    control.current?.addEventListener("unlock", () => {
      dispatch(setInactive());
    });
    return () => {
      control.current?.removeEventListener("lock", () => {
        dispatch(setActive());
      });
      control.current?.removeEventListener("unlock", () => {
        dispatch(setInactive());
      });
    };
  });

  return <PointerLockControls ref={control} />;
};
