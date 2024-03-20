import React, { useEffect, useState } from "react";
import debugFurniture from "./DebugFurniture";
import * as THREE from "three";
import Furniture from "./Furniture";
import { furnitureInfo } from "./FurnitureInfo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const initialState = {
//   furnitureInfo: [],
// };

// const furnitureInfoSlice = createSlice({
//   name: "furnitureControl",
//   initialState: initialState,
//   reducers: {
//     setFurnitureInfo: (
//       state: typeof initialState,
//       action: PayloadAction<[]>
//     ) => {
//       state.furnitureInfo = action.payload;
//     },
//   },
// });

// export const { setFurnitureInfo } = furnitureInfoSlice.actions;

// export const furnitureInfoReducer = furnitureInfoSlice.reducer;

type furitureContainerProps = { allFurnitureInfo: furnitureInfo[] };

const FurnitureContainer = ({ allFurnitureInfo }: furitureContainerProps) => {
  useEffect(() => {
    return () => {
      console.log("unmount");
    };
  }, []);
  return (
    <group>
      {allFurnitureInfo?.map((furnitureInfo, index) => {
        //console.log(index);
        return (
          <Furniture
            furnitureInfo={furnitureInfo}
            key={furnitureInfo.file}
          ></Furniture>
        );
      })}
    </group>
  );
};

export default FurnitureContainer;
