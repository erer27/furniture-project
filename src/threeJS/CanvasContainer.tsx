import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Reducer";

import ObjectContainer from "./ObjectContainer";
import debugFurniture from "./DebugFurniture";
import { furnitureInfo } from "./FurnitureInfo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import html2canvas from "html2canvas";

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

type CanvasContainerProps = {
  furnitureInfo: furnitureInfo[];
  threeJSCanvasRef: React.MutableRefObject<any>;
};
const CanvasContainer = ({
  furnitureInfo,
  threeJSCanvasRef,
}: CanvasContainerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFurnitureInfo(furnitureInfo));
  }, [furnitureInfo]);

  return (
    <div
      className="flex-1 rounded-md m-1 flex justify-center items-center relative overflow-hidden outline-none border-none"
      id="controlButton"
    >
      <CorssHairDot />
      <Canvas
        ref={threeJSCanvasRef}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [-3, 1, 2] }}
        className="outline-none border-none"
      >
        <ObjectContainer />
      </Canvas>
    </div>
  );
};

const CorssHairDot = () => {
  const PointerLockControlsState = useSelector((state: RootState) => {
    //true가 활성화 false가 비활성화
    return state.pointerLockControls.controlsState;
  });

  const crossHairHidden = PointerLockControlsState ? "" : "hidden";
  return (
    <svg
      fill="#A4A4A4"
      width="40px"
      height="40px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={`fixed block z-10 ${crossHairHidden}`}
    >
      <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z" />
    </svg>
  );
};

export default CanvasContainer;
