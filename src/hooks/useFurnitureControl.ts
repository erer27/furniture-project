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

function useFurnitureControl(obj: any, pressedKey: any) {
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
      if (obj && targetFurniture === obj.userData.id && !pressedKey.Shift) {
        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp" ||
          event.key === "ArrowDown"
        ) {
          const cameraVector = new Vector3();
          camera.getWorldDirection(cameraVector);
          cameraVector.y = 0;
          cameraVector.normalize();
          cameraVector.applyAxisAngle(yAxisVector, directionOffset());
          const moveX = cameraVector.x * 0.05;
          const moveZ = cameraVector.z * 0.05;
          obj.position.x = obj.position.x + moveX;
          obj.position.z = obj.position.z + moveZ;
          furnitureInfoDispatch();
        } else if (event.key === "Delete") {
          console.log("delete");
          furnitureDelete(obj.userData.id);
        }
      } else if (
        obj &&
        targetFurniture === obj.userData.id &&
        pressedKey.Shift
      ) {
        if (event.key === "ArrowRight") {
          obj.rotation.y += 0.01;
        } else if (event.key === "ArrowLeft") {
          obj.rotation.y -= 0.01;
        }
        furnitureInfoDispatch();
      }
    },
    [targetFurniture, obj, pressedKey]
  );

  const directionOffset = () => {
    let directionOffset = 0; //up
    if (pressedKey.ArrowUp) {
      if (pressedKey.ArrowLeft) {
        directionOffset = Math.PI / 4; // up+left
      } else if (pressedKey.ArrowRight) {
        directionOffset = -Math.PI / 4; // up+right
      }
    } else if (pressedKey.ArrowDown) {
      if (pressedKey.ArrowLeft) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // down+left
      } else if (pressedKey.ArrowRight) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // down+right
      } else {
        directionOffset = Math.PI; // down
      }
    } else if (pressedKey.ArrowLeft) {
      directionOffset = Math.PI / 2; // left
    } else if (pressedKey.ArrowRight) {
      directionOffset = -Math.PI / 2; // right
    }
    return directionOffset;
  };

  function furnitureInfoDispatch() {
    dispatch(
      setFurnitureInfo(
        allFurnitureInfo.map((element) => {
          if (element.id === targetFurniture) {
            return {
              ...element,
              position: [...obj.position],
              rotation: [...obj.rotation],
            };
          }
          return element;
        })
      )
    );
  }

  function furnitureDelete(deletingFurniture: any) {
    dispatch(
      setFurnitureInfo(
        allFurnitureInfo.filter((element) => {
          return element.id !== deletingFurniture;
        })
      )
    );
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
export default useFurnitureControl;
