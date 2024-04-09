import { PointerLockControls } from "@react-three/drei";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useKey from "../hooks/useKey";

const initialState = {
  controlsState: false,
};

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

  const handleLock = (e: any) => {
    e.stopPropagation();
    dispatch(setActive());
  };
  const handleUnLock = (e: any) => {
    e.stopPropagation();
    dispatch(setInactive());
  };

  useEffect(() => {
    console.log(control.current?.domElement);
  });

  return (
    <PointerLockControls
      selector="#controlButton"
      ref={control}
      onLock={(e) => {
        dispatch(setActive());
      }}
      onUnlock={(e) => {
        dispatch(setInactive());
      }}
    />
  );
};
