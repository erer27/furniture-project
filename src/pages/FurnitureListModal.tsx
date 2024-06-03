import React from "react";
import { tab, tabs } from "./FurnitureListData";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { setFurnitureInfo } from "../threeJS/CanvasContainer";
import { RootState } from "../Reducer";

const FurnitureListModal = () => {
  return (
    <div className="fixed w-1/6 h-4/5 rounded bg-white top-1/2 translate-x-[55%] -translate-y-1/2 z-20 flex flex-col overflow-scroll overflow-x-hidden">
      {tabs.map((element) => (
        <Tab
          tab_title={element.tab_title}
          detail_element={element.detail_element}
        ></Tab>
      ))}
    </div>
  );
};

export default FurnitureListModal;

const Tab = ({ tab_title, detail_element }: tab) => {
  const allFurnitureInfo = useSelector((state: RootState) => {
    return state.furnitureInfo.allFurnitureInfo;
  });
  const dispatch = useDispatch();
  const addFurniture = (file: string) => {
    const newFurnitureInfo = allFurnitureInfo.slice();
    const id =
      newFurnitureInfo.length === 0
        ? 0
        : newFurnitureInfo[newFurnitureInfo.length - 1].id + 1;

    newFurnitureInfo.push({
      id: id,
      file: file,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    });
    dispatch(setFurnitureInfo(newFurnitureInfo));
  };
  return (
    <details className="bg-sky-300 text-white w-full">
      <summary>{tab_title}</summary>
      {detail_element.map((element) => {
        return (
          <div className="bg-white text-black border border-b-black">
            <img
              className="hover:cursor-pointer"
              onClick={() => {
                addFurniture(element.file);
              }}
              src={element.image}
            ></img>
            <div className="text-center">
              <a href={element.link} target="_blank">
                {element.furniture_name}
              </a>
            </div>
          </div>
        );
      })}
    </details>
  );
};
