import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../Reducer";
import FurnitureBoardList from "./FurnitureCardList";
import Header from "./Header";
import FurnitureModal from "./FurnitureModal";

const MinaPage = () => {
  return (
    <div className="flex items-center justify-center ">
      <Header />
      <FurnitureBoardList />
      <FurnitureModal />
    </div>
  );
};

export default MinaPage;
