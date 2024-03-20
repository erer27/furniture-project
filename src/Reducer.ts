import { pointerLockControlsReducer } from "./threeJS/PointerLockControlsComponent";
import { furnitureControlReducer } from "./threeJS/Furniture";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { furnitureInfoReducer } from "./threeJS/CanvasContainer";

const rootReducer = combineReducers({
  pointerLockControls: pointerLockControlsReducer,
  furnitureControls: furnitureControlReducer,
  furnitureInfo: furnitureInfoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
