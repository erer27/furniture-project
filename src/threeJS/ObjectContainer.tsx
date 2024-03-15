import React, { LegacyRef, useEffect, useRef, useState } from "react";
import {
  FirstPersonControls,
  FlyControls,
  OrbitControls,
  OrbitControlsProps,
  PointerLockControls,
  useCamera,
} from "@react-three/drei";
import Model from "./BP_Martin_C";
import FloorPlane from "./Floor";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import useKey from "../hooks/useKey";

const ObjectContainer = () => {
  const three = useThree();
  const vector = new Vector3();
  const position = new Vector3();
  const orbit = useRef<any>(null);

  useKey(three.camera);

  useEffect(() => {
    console.log(three.camera);
    console.log(three.camera.getWorldDirection(vector));
    console.log(three.camera.getWorldPosition(position));
  }, []);
  return (
    <group>
      <FlyControls dragToLook={true} movementSpeed={10} />
      <PointerLockControls />
      <ambientLight intensity={1} />
      <directionalLight position={[-1, 0, 1]} />
      <axesHelper args={[10]} />
      <FloorPlane />
      <Model />
    </group>
  );
};

export default ObjectContainer;
