import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getMemberFromSession from "../utils/getMemberFromSession";
import Card from "./Card";
import {
  setFurnitureData,
  setFurnitureModalState,
  setIsNewPost,
} from "./FurnitureModal";
import { defaultPostData, PostData } from "./samplePostJSON";

const FurnitureBoardList = () => {
  // const arr = Array.from({ length: 15 }, (_, index) => index);
  const [cardList, setCardList] = useState<[]>([]);

  const submit = async () => {
    const member = getMemberFromSession();
    try {
      const cardListResponse = await axios.post("/cardList", member);
      console.log(cardListResponse);
      const Posts = cardListResponse.data.map((post: PostData) => {
        return post.postId;
      });
      console.log(Posts);
      const cardImageResponse = await axios.post("/cardImages", Posts);
      console.log(Posts);
      setCardList(cardListResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    submit();
  }, [cardList.length]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-8 md:grid-cols-3 xl:grid-cols-6 gap-8 m-10">
      {cardList.map((cardData) => (
        <Card PostData={cardData} />
      ))}

      <AddButton />
    </div>
  );
};

const AddButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setFurnitureModalState(true));
    dispatch(setIsNewPost(true));
    dispatch(setFurnitureData(defaultPostData));
  };
  return (
    <svg
      fill="#000000"
      height="40px"
      width="40px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      enable-background="new 0 0 512 512"
      viewBox="0 0 512 512"
      className=" fixed bottom-0 right-0 mb-4 mr-4 fill-current text-red-300 hover:text-rose-400 hover:cursor-pointer"
      onClick={handleClick}
    >
      <g>
        <g>
          <path d="M256,11C120.9,11,11,120.9,11,256s109.9,245,245,245s245-109.9,245-245S391.1,11,256,11z M256,460.2    c-112.6,0-204.2-91.6-204.2-204.2S143.4,51.8,256,51.8S460.2,143.4,460.2,256S368.6,460.2,256,460.2z" />
          <path d="m357.6,235.6h-81.2v-81.2c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v81.2h-81.2c-11.3,0-20.4,9.1-20.4,20.4s9.1,20.4 20.4,20.4h81.2v81.2c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-81.2h81.2c11.3,0 20.4-9.1 20.4-20.4s-9.1-20.4-20.4-20.4z" />
        </g>
      </g>
    </svg>
  );
};

export default FurnitureBoardList;
