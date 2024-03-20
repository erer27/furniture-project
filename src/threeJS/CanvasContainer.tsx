import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Reducer";

import ObjectContainer from "./ObjectContainer";
import debugFurniture from "./DebugFurniture";
import { furnitureInfo } from "./FurnitureInfo";

//리덕스로 가구 정보 가져오기

const CanvasContainer = () => {
  const PointerLockControlsState = useSelector((state: RootState) => {
    //true가 활성화 false가 비활성화
    return state.pointerLockControls.controlsState;
  });

  const crossHairHidden = PointerLockControlsState ? "" : "hidden";

  const [furnitureInfo, setFurnitureInfo] = useState<furnitureInfo[]>([]);

  useEffect(() => {
    setFurnitureInfo(debugFurniture);
  }, []);

  return (
    <div className="m-8 border-2 border-black w-[48rem] h-[32rem] flex justify-center items-center relative">
      <img
        className={`w-2 h-2 fixed block z-10 ${crossHairHidden}`}
        src="crosshair.png"
      />
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}>
        <ObjectContainer furnitureInfo={furnitureInfo} />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
