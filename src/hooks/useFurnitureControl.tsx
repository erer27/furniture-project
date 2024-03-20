import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Group, Vector3 } from "three";
import { RootState } from "../Reducer";
import { setFurnitureInfo } from "../threeJS/CanvasContainer";

function useFurnitureControl(obj: any) {
  const targetFurniture = useSelector((state: RootState) => {
    return state.furnitureControls.targetFurniture;
  });

  const allFurnitureInfo = useSelector((state: RootState) => {
    return state.furnitureInfo.allFurnitureInfo;
  });

  const dispatch = useDispatch();
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      //console.log(event);
      if (obj && targetFurniture === obj.userData.file) {
        if (event.key === "ArrowRight") {
          obj.position.x = obj.position.x + 0.05;
        } else if (event.key === "ArrowLeft") {
        }
        dispatch(
          setFurnitureInfo(
            allFurnitureInfo.map((element) => {
              if (element.file === targetFurniture) {
                return { ...element, position: [...obj.position] };
              }
              return element;
            })
          )
        );
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
