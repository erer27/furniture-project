import { PointerLockControlsReducer } from "./threeJS/PointerLockControlsComponent";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  pointerLockControls: PointerLockControlsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
