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

function useFurnitureControl(
  obj: any,
  shiftKeyPressed: boolean,
  pressedKey: any,
  delta: any
) {
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
      if (obj && targetFurniture === obj.userData.file && !pressedKey.Shift) {
        // if (event.key === "ArrowRight") {
        //   console.log(pressedKey);
        //   const [moveX, moveZ] = calculateMovingLength(-Math.PI / 2);
        //   obj.position.x = obj.position.x + moveX;
        //   obj.position.z = obj.position.z + moveZ;
        // } else if (event.key === "ArrowLeft") {
        //   const [moveX, moveZ] = calculateMovingLength(Math.PI / 2);
        //   obj.position.x = obj.position.x + moveX;
        //   obj.position.z = obj.position.z + moveZ;
        // } else if (event.key === "ArrowUp") {
        //   const [moveX, moveZ] = calculateMovingLength(0);
        //   obj.position.x = obj.position.x + moveX;
        //   obj.position.z = obj.position.z + moveZ;
        // } else if (event.key === "ArrowDown") {
        //   const [moveX, moveZ] = calculateMovingLength(Math.PI);
        //   obj.position.x = obj.position.x + moveX;
        //   obj.position.z = obj.position.z + moveZ;
        // }
        const cameraVector = new Vector3();
        camera.getWorldDirection(cameraVector);
        cameraVector.y = 0;
        cameraVector.normalize();
        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp" ||
          event.key === "ArrowDown"
        ) {
          cameraVector.applyAxisAngle(yAxisVector, directionOffset());
          const moveX = cameraVector.x * 0.05;
          const moveZ = cameraVector.z * 0.05;
          obj.position.x = obj.position.x + moveX;
          obj.position.z = obj.position.z + moveZ;
          furnitureInfoDispatch();
        }
        console.log(delta);
      } else if (
        obj &&
        targetFurniture === obj.userData.file &&
        pressedKey.Shift
      ) {
        if (event.key === "ArrowRight") {
          console.log(pressedKey);
          obj.rotation.y += 0.01;
        } else if (event.key === "ArrowLeft") {
          obj.rotation.y -= 0.01;
        }
        furnitureInfoDispatch();
      }
    },
    [targetFurniture, obj, shiftKeyPressed, pressedKey, delta]
  );

  const calculateMovingLength = useCallback(
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

  const directionOffset = () => {
    let directionOffset = 0;
    if (pressedKey.ArrowUp) {
      if (pressedKey.ArrowLeft) {
        directionOffset = Math.PI / 4; // w+a
      } else if (pressedKey.ArrowRight) {
        directionOffset = -Math.PI / 4; // w+d
      }
    } else if (pressedKey.ArrowDown) {
      if (pressedKey.ArrowLeft) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (pressedKey.ArrowRight) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
      } else {
        directionOffset = Math.PI; // s
      }
    } else if (pressedKey.ArrowLeft) {
      directionOffset = Math.PI / 2; // a
    } else if (pressedKey.ArrowRight) {
      directionOffset = -Math.PI / 2; // d
    }
    return directionOffset;
  };

  function furnitureInfoDispatch() {
    dispatch(
      setFurnitureInfo(
        allFurnitureInfo.map((element) => {
          if (element.file === targetFurniture) {
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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
export default useFurnitureControl;
