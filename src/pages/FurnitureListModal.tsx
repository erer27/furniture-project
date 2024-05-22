import React from "react";
import { tab, tabs } from "./FurnitureListData";

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
  return (
    <details className="bg-sky-300 text-white w-full">
      <summary>{tab_title}</summary>
      {detail_element.map((element) => {
        return (
          <div className="bg-white text-black border border-b-black">
            <img src={element.image}></img>
            <div className="text-center">{element.furniture_name}</div>
          </div>
        );
      })}
    </details>
  );
};
