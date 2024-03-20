import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Reducer";

import ObjectContainer from "./ObjectContainer";
import debugFurniture from "./DebugFurniture";
import { furnitureInfo } from "./FurnitureInfo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//리덕스로 가구 정보 가져오기

const initialState = {
  allFurnitureInfo: {} as furnitureInfo[],
};

const furnitureInfoSlice = createSlice({
  name: "furnitureInfo",
  initialState: initialState,
  reducers: {
    setFurnitureInfo: (
      state: typeof initialState,
      action: PayloadAction<furnitureInfo[]>
    ) => {
      state.allFurnitureInfo = action.payload;
    },
  },
});

export const { setFurnitureInfo } = furnitureInfoSlice.actions;

export const furnitureInfoReducer = furnitureInfoSlice.reducer;

const CanvasContainer = () => {
  const dispatch = useDispatch();

  const PointerLockControlsState = useSelector((state: RootState) => {
    //true가 활성화 false가 비활성화
    return state.pointerLockControls.controlsState;
  });

  const crossHairHidden = PointerLockControlsState ? "" : "hidden";

  useEffect(() => {
    console.log("rerendering");
    dispatch(setFurnitureInfo(debugFurniture));
  }, []);

  return (
    <div className="m-8 border-2 border-black w-[48rem] h-[32rem] flex justify-center items-center relative">
      <img
        className={`w-2 h-2 fixed block z-10 ${crossHairHidden}`}
        src="crosshair.png"
      />
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}>
        <ObjectContainer />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
