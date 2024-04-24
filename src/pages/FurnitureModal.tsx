import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Reducer";
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
  const dispatch = useDispatch();
  useEffect(() => {});

  const handleClick = (e: any) => {
    if (e.target !== e.currentTarget) return;

    dispatch(setFurnitureModalState(false));
  };

  const isFurnitureModalOpen = useSelector((state: RootState) => {
    return state.furnitureModal.isFurnitureModalOpen;
  });

  const display = isFurnitureModalOpen ? "" : "hidden";
  return (
    <div
      onClick={handleClick}
      className={`fixed w-full h-full bg-black bg-opacity-50 z-50 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${display}`}
    >
      <div
        className="fixed bg-white w-3/5 h-4/5 rounded-lg transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SubjectBar />
        <CanvasContainer />
        <ButtonContainer />
      </div>
    </div>
  );
};

const SubjectBar = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setFurnitureModalState(false));
  };
  return (
    <div className="h-12 bg-sky-300 rounded-t-md grow-0 flex items-center justify-between px-3 text-white">
      <div>
        <h1 className="text-lg">임시 제목</h1>
        <div className="flex text-xs">
          <span>작성자</span>
          <span className="inline-block w-[1px] h-[10px] ml-4 mr-1 mt-1 bg-white"></span>
          <span>0000:00:00:00:00:00</span>
        </div>
      </div>
      <svg
        fill="white"
        height="20px"
        width="20px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1792 1792"
        xmlSpace="preserve"
        onClick={handleClose}
        className="hover:cursor-pointer"
      >
        <path
          d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4
	c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1
	c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z"
        />
      </svg>
    </div>
  );
};

const ButtonContainer = () => {
  return (
    <div className="flex items-center justify-center bg-sky-300 h-8 rounded-b-lg text-white">
      <button className="rounded-md bg-sky-500 p-1 text-xs m-1 w-1/5">
        삭제
      </button>
      <button className="rounded-md bg-sky-500 p-1 text-xs m-1 w-1/5">
        저장
      </button>
    </div>
  );
};

export default FurnitureModal;
