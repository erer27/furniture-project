import React, { useEffect, useState } from "react";
import debugFurniture from "./DebugFurniture";
import * as THREE from "three";
import Furniture from "./Furniture";
import { furnitureInfo } from "./FurnitureInfo";

const FurnitureContainer = () => {
  const [allFurnitureInfo, setAllFurnitureInfo] = useState<furnitureInfo[]>();

  useEffect(() => {
    setAllFurnitureInfo(debugFurniture);
  });
  return (
    <group>
      {allFurnitureInfo?.map((furnitureInfo) => (
        <Furniture furnitureInfo={furnitureInfo}></Furniture>
      ))}
    </group>
  );
};

export default FurnitureContainer;
