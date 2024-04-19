import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { furnitureInfoReducer } from "./threeJS/CanvasContainer";
import { pointerLockControlsReducer } from "./threeJS/PointerLockControlsComponent";
import { furnitureControlReducer } from "./threeJS/Furniture";
import { furnitureModalReducer } from "./pages/FurnitureModal";
import { memberReducer } from "./pages/LoginPage";

const rootReducer = combineReducers({
  pointerLockControls: pointerLockControlsReducer,
  furnitureControls: furnitureControlReducer,
  furnitureInfo: furnitureInfoReducer,
  furnitureModal: furnitureModalReducer,
  member: memberReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });

export default store;
