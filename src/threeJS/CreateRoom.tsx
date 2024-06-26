import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { DoubleSide } from "three";
import { Sphere, useGLTF } from "@react-three/drei";

const roomSize = 7;
const wallHeight = roomSize / 2.7;
const wallWidth = roomSize / 2;

const CreateRoom = () => {
  const ref = useRef<any>();

  const texture = useLoader(THREE.TextureLoader, "/room/pine-wood-texture.jpg");
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(4, 4);

  useEffect(() => {
    console.log(ref);
  });

  return (
    <group>
      <ambientLight />
      <CreateFloor />
      <CreateWall rotation={[0, 0, 0]} position={[0, 0, -wallWidth]} />
      <CreateWall
        rotation={[0, Math.PI * -0.5, 0]}
        position={[wallWidth, 0, 0]}
      />
      <CreateWall rotation={[0, 0, 0]} position={[0, 0, wallWidth]} />
      <CreateWall
        rotation={[0, Math.PI * -0.5, 0]}
        position={[-wallWidth, 0, 0]}
      />
      <CreateDoor
        rotation={[0, Math.PI * -0.5, 0]}
        position={[wallWidth, 0, wallWidth - 0.5]}
      />
      <CreateWindow
        rotation={[0, 0, 0]}
        position={[0, wallHeight - 1.5, -wallWidth]}
        scale={[4, 2, 1]}
      />
    </group>
  );
};

export default CreateRoom;

const CreateFloor = () => {
  const ref = useRef<any>();

  const texture = useLoader(THREE.TextureLoader, "/room/pine-wood-texture.jpg");
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(4, 4);

  useEffect(() => {
    console.log(ref);
  });

  return (
    <mesh ref={ref} rotation-x={Math.PI * -0.5}>
      <planeGeometry attach="geometry" args={[roomSize, roomSize]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={DoubleSide}
        color={"white"}
      />
    </mesh>
  );
};

type CreateWallProps = {
  rotation: number[];
  position: [number, number, number];
};
const CreateWall = ({ rotation, position }: CreateWallProps) => {
  const shape = new THREE.Shape();
  // x,y 좌표로 도형 정의

  shape.moveTo(wallWidth, wallHeight);
  shape.lineTo(wallWidth, 0);
  shape.lineTo(-wallWidth, 0);
  shape.lineTo(-wallWidth, wallHeight);

  const geometry = new THREE.BufferGeometry();
  const points = shape.getPoints();
  geometry.setFromPoints(points);

  const texture = useLoader(
    THREE.TextureLoader,
    "/room/white-wall-textures.jpg"
  );
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(1, 1);

  const wallExtrudeSetting = {
    // wall mesh setting
    depth: 0,
    bevelEnabled: false,
    material: 0,
    extrudeMaterial: 1,
  };

  const material = new THREE.MeshBasicMaterial({
    color: 0xf0c400,
    side: THREE.DoubleSide,
  });

  return (
    <mesh
      rotation-x={rotation[0]}
      rotation-y={rotation[1]}
      rotation-z={rotation[2]}
      position={position}
    >
      <extrudeGeometry args={[shape, wallExtrudeSetting]} />
      <meshStandardMaterial attach="material" needsUpdate map={texture} />
    </mesh>
  );
};

type CreateDoorProps = {
  rotation: [number, number, number];
  position: [number, number, number];
};
const CreateDoor = ({ rotation, position }: CreateDoorProps) => {
  const { nodes, materials } = useGLTF("/room/door7.glb");
  const meshs = Object.values(nodes).filter((mesh) => mesh.type === "Mesh");

  return (
    <group
      dispose={null}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
      }}
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
};

type CreateWindowProps = {
  rotation: [number, number, number];
  position: [number, number, number];
  scale: [number, number, number];
};
const CreateWindow = ({ rotation, position, scale }: CreateWindowProps) => {
  const { nodes, materials } = useGLTF("/room/window6.glb");
  const meshs = Object.values(nodes).filter((mesh) => mesh.type === "Mesh");

  return (
    <group
      dispose={null}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
      }}
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
};
