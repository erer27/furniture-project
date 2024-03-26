import { useThree } from "@react-three/fiber";
import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Group, Vector2, Vector3, Clock } from "three";
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
  const yAxisVector = new Vector3(0, 1, 0);

  const dispatch = useDispatch();
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      //console.log(event);
      if (obj && targetFurniture === obj.userData.file) {
        if (event.key === "ArrowRight") {
          const [moveX, moveZ] = calculateMovingLenght(-Math.PI / 2);
          obj.position.x = obj.position.x + moveX;
          obj.position.z = obj.position.z + moveZ;
        } else if (event.key === "ArrowLeft") {
          const [moveX, moveZ] = calculateMovingLenght(Math.PI / 2);
          obj.position.x = obj.position.x + moveX;
          obj.position.z = obj.position.z + moveZ;
        } else if (event.key === "ArrowUp") {
          const [moveX, moveZ] = calculateMovingLenght(0);
          obj.position.x = obj.position.x + moveX;
          obj.position.z = obj.position.z + moveZ;
        } else if (event.key === "ArrowDown") {
          const [moveX, moveZ] = calculateMovingLenght(Math.PI);
          obj.position.x = obj.position.x + moveX;
          obj.position.z = obj.position.z + moveZ;
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

  const calculateMovingLenght = useCallback(
    (directionOffset: number) => {
      const cameraVector = new Vector3();
      camera.getWorldDirection(cameraVector);
      cameraVector.y = 0;
      cameraVector.normalize();
      cameraVector.applyAxisAngle(yAxisVector, directionOffset);
      const moveX = cameraVector.x * 0.05;
      const moveZ = cameraVector.z * 0.05;
      return [moveX, moveZ];
    },
    [obj]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
export default useFurnitureControl;
