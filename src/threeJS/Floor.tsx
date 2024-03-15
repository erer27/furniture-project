import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { DoubleSide } from "three";

const FloorPlane = () => {
  const texture = useLoader(
    THREE.TextureLoader,
    "/floor/pine-wood-texture.jpg"
  );
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(4, 4);

  return (
    <mesh rotation-x={Math.PI * -0.5}>
      <planeGeometry attach="geometry" args={[20, 20]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={DoubleSide}
        color={"white"}
      />
    </mesh>
  );
};

export default FloorPlane;
