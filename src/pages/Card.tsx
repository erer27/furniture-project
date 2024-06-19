import axios from "axios";
import React, { Dispatch, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import tmpImage from "../images/tmpImage.png";
import { RootState } from "../Reducer";
import {
  setFurnitureData,
  setFurnitureModalState,
  setIsNewPost,
} from "./FurnitureModal";
import { PostData } from "./samplePostJSON";

type CardProps = { PostData: PostData };
const Card = ({ PostData }: CardProps) => {
  const box = "rounded-md bg-white";
  const isFurnitureModalOpen = useSelector((state: RootState) => {
    return state.furnitureModal.isFurnitureModalOpen;
  });

  const [cardImage, setCardImage] = useState<any>();

  const getCardImage = useCallback(async () => {
    const response = await axios.post(
      "/cardImage",
      {
        imageName: PostData.cardImageName,
      },

      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(response.data);
    setCardImage(url);
  }, [PostData]);

  useEffect(() => {
    getCardImage();
  }, [getCardImage]);

  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const dispatch = useDispatch();

  const openModal = () => {
    console.log(isFurnitureModalOpen);
    dispatch(setFurnitureModalState(true));
    dispatch(setIsNewPost(false));
    dispatch(setFurnitureData(PostData));
  };

  return (
    <div className={box}>
      <div className="hover:cursor-pointer" onClick={openModal}>
        <img
          className="rounded-md block w-52 h-28 object-cover"
          src={cardImage}
        ></img>
      </div>

      <div
        className="flex block p-1 hover:cursor-pointer text-xs justify-between mt-1"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {PostData.title}
        {/* {hover && <MenuIcon />} */}
      </div>
    </div>
  );
};

const MenuIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const openModal = (event: any) => {
    setModalPosition({ x: event.clientX, y: event.clientY });
    setIsModalOpen(true);
  };
  return (
    <div className="">
      <MenuModal />
      <svg
        className="mt-0 right-0"
        width="15px"
        height="15px"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        onClick={openModal}
      >
        <g
          id="Kebab-Menu"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <rect id="Container" x="0" y="0" width="24" height="24"></rect>
          <path
            d="M12,6 C12.5522847,6 13,5.55228475 13,5 C13,4.44771525 12.5522847,4 12,4 C11.4477153,4 11,4.44771525 11,5 C11,5.55228475 11.4477153,6 12,6 Z"
            id="shape-03"
            stroke="#030819"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="0,0"
          ></path>
          <path
            d="M12,13 C12.5522847,13 13,12.5522847 13,12 C13,11.4477153 12.5522847,11 12,11 C11.4477153,11 11,11.4477153 11,12 C11,12.5522847 11.4477153,13 12,13 Z"
            id="shape-03"
            stroke="#030819"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="0,0"
          ></path>
          <path
            d="M12,20 C12.5522847,20 13,19.5522847 13,19 C13,18.4477153 12.5522847,18 12,18 C11.4477153,18 11,18.4477153 11,19 C11,19.5522847 11.4477153,20 12,20 Z"
            id="shape-03"
            stroke="#030819"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="0,0"
          ></path>
        </g>
      </svg>
    </div>
  );
};

const MenuModal = (position: any) => {
  return (
    <div
      className={`w-20 h-20 bg-white border border-2 border-slate-300 fixed mt-4 mr-10`}
    ></div>
  );
};

export default Card;
