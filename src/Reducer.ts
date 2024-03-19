import { PointerLockControlsReducer } from "./threeJS/PointerLockControlsComponent";
import { FurnitureControlReducer } from "./threeJS/Furniture";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  pointerLockControls: PointerLockControlsReducer,
  furnitureControls: FurnitureControlReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
