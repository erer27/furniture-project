import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import CanvasContainer from "../threeJS/CanvasContainer";

const initialState = {
  isFurnitureModalOpen: false,
};

const furnitureModalSlice = createSlice({
  name: "furnitureModalState",
  initialState: initialState,
  reducers: {
    setFurnitureModalState: (
      state: typeof initialState,
      action: PayloadAction<boolean>
    ) => {
      state.isFurnitureModalOpen = action.payload;
    },
  },
});

export const { setFurnitureModalState } = furnitureModalSlice.actions;

export const furnitureModalReducer = furnitureModalSlice.reducer;

const FurnitureModal = () => {
  useEffect(() => {
    console.log("modal");
  });

  const handleClick = (e: any) => {
    if (e.target !== e.currentTarget) return;

    console.log("asdf");
  };
  return (
    <div
      onClick={handleClick}
      className="fixed w-full h-full bg-black bg-opacity-50 z-50 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="fixed bg-white w-3/5 h-4/5 rounded-md transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
        <div className="h-8 bg-slate-200 rounded-t-md grow-0">임시 제목</div>
        <CanvasContainer />

        <div className="flex items-center justify-center bg-slate-200 h-8 rounded-b-lg">
          <button className="rounded-md bg-slate-400 p-1 text-xs m-1 w-1/5">
            삭제
          </button>
          <button className="rounded-md bg-slate-400 p-1 text-xs m-1 w-1/5">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default FurnitureModal;
