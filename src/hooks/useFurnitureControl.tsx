import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useSelector } from "react-redux";
import { Group, Vector3 } from "three";
import { RootState } from "../Reducer";

function useFurnitureControl(obj: any) {
  const targetFurniture = useSelector((state: RootState) => {
    return state.furnitureControls.targetFurniture;
  });
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      //console.log(event);
      if (obj && targetFurniture === obj.userData.file) {
        if (event.key === "ArrowRight") {
          obj.position.x = obj.position.x + 0.05;
          console.log(obj);
        }
      }
    },
    [targetFurniture, obj]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
export default useFurnitureControl;
