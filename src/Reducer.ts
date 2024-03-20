import { pointerLockControlsReducer } from "./threeJS/PointerLockControlsComponent";
import { furnitureControlReducer } from "./threeJS/Furniture";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  pointerLockControls: pointerLockControlsReducer,
  furnitureControls: furnitureControlReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
