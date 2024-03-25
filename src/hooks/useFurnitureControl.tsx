import { useThree } from "@react-three/fiber";
import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Group, Vector2, Vector3 } from "three";
import { RootState } from "../Reducer";
import { setFurnitureInfo } from "../threeJS/CanvasContainer";

function useFurnitureControl(obj: any) {
  const targetFurniture = useSelector((state: RootState) => {
    return state.furnitureControls.targetFurniture;
  });

  const allFurnitureInfo = useSelector((state: RootState) => {
    return state.furnitureInfo.allFurnitureInfo;
  });

  const camera = useThree((state) => state.camera);

  const xAxisVector = new Vector2(1, 0);
  const zAxisVector = new Vector2(0, 1);

  const dispatch = useDispatch();
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      //console.log(event);
      if (obj && targetFurniture === obj.userData.file) {
        if (event.key === "ArrowRight") {
          // const unit = 0.05;
          // const cameraVector = new Vector3();
          // camera.getWorldDirection(cameraVector);
          // const cameraPlaneVector = new Vector2(cameraVector.x, cameraVector.z);
          // const xcos = Math.cos(cameraPlaneVector.angleTo(xAxisVector));
          // const zsin = Math.sin(cameraPlaneVector.angleTo(zAxisVector));
          // console.log(xcos);
          // obj.position.x = obj.position.x + unit * xcos;
          // obj.position.z = obj.position.z + unit * zsin;
          obj.position.x = obj.position.x + 0.005;
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
