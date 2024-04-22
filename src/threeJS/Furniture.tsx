/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 BP_Martin_C.glb 
*/

import { useCallback, useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { furnitureInfo } from "./FurnitureInfo";
import { Vector3 } from "three";
import useFurnitureControl from "../hooks/useFurnitureControl";
import { useDispatch, UseDispatch } from "react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

const initialState = {
  targetFurniture: "",
};

const furnitureControlSlice = createSlice({
  name: "furnitureControl",
  initialState: initialState,
  reducers: {
    setTargetFurniture: (
      state: typeof initialState,
      action: PayloadAction<string>
    ) => {
      state.targetFurniture = action.payload;
    },
  },
});

const { setTargetFurniture } = furnitureControlSlice.actions;

export const furnitureControlReducer = furnitureControlSlice.reducer;

type furnitureProps = { furnitureInfo: furnitureInfo };

export default function Furniture({ furnitureInfo }: furnitureProps) {
  const position = new Vector3(...furnitureInfo.position);
  const rotation = new THREE.Euler(...furnitureInfo.rotation);

  const { nodes, materials } = useGLTF(`/furnitures/${furnitureInfo.file}`);
  // const { nodes, materials } = useGLTF(`/furnitures/drawer_basic.glb`);
  const meshs = Object.values(nodes).filter((mesh) => mesh.type === "Mesh");

  const obj = useRef<any>();

  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setTargetFurniture(furnitureInfo.file));
  }, [dispatch]);

  const [pressedKey, setPressedKey] = useState({});

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      setPressedKey((prevPressedKey) => {
        (prevPressedKey as any)[event.key] = true;
        return prevPressedKey;
      });
    },
    [dispatch]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      setPressedKey((prevPressedKey) => {
        (prevPressedKey as any)[event.key] = false;
        return prevPressedKey;
      });
    },
    [dispatch]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, obj]);

  useFurnitureControl(obj.current, pressedKey);

  return (
    <group
      dispose={null}
      ref={obj}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      rotation={rotation}
      userData={{ file: furnitureInfo.file }}
    >
      {meshs.map((mesh: any) => (
        <mesh
          key={mesh.uuid}
          geometry={mesh.geometry}
          material={mesh.material}
        />
      ))}
    </group>
  );
}
