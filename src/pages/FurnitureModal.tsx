import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Reducer";
import CanvasContainer from "../threeJS/CanvasContainer";
import { furnitureInfo } from "../threeJS/FurnitureInfo";
import getMemberFromSession from "../utils/getMemberFromSession";
import FurnitureListModal from "./FurnitureListModal";
import { PostData, defaultPostData, samplePostData } from "./samplePostJSON";

const initialState = {
  isFurnitureModalOpen: false,
  isNewPost: true,
  furnitureData: defaultPostData,
};

const furnitureModalSlice = createSlice({
  name: "furnitureModalState",
  initialState: initialState,
  reducers: {
    setFurnitureModalState: (
      state: typeof initialState,
      action: PayloadAction<boolean>
    ) => {
      state.isFurnitureModalOpen = action.payload; //모달 열건지 안열건지
    },
    setIsNewPost: (
      state: typeof initialState,
      action: PayloadAction<boolean>
    ) => {
      state.isNewPost = action.payload; //새 게시물인지 아닌지
    },
    setFurnitureData: (
      state: typeof initialState,
      action: PayloadAction<PostData>
    ) => {
      state.furnitureData = action.payload; //post id, 가구 데이터 등
    },
  },
});

export const { setFurnitureModalState, setIsNewPost, setFurnitureData } =
  furnitureModalSlice.actions;

export const furnitureModalReducer = furnitureModalSlice.reducer;

const FurnitureModal = () => {
  const modalData = useSelector((state: RootState) => {
    return state.furnitureModal.furnitureData;
  });
  const dispatch = useDispatch();

  const [furnitureDataJSON, setFurnitureDataJSON] = useState<furnitureInfo[]>(
    []
  );

  useEffect(() => {
    console.log(modalData);
    setEditingTitle(modalData.title);
    setFurnitureDataJSON(
      JSON.parse(
        modalData.furnitureData.length === 0 ? "[]" : modalData.furnitureData
      )
    );
  }, [modalData]);

  const handleClickBackground = (e: any) => {
    if (e.target !== e.currentTarget) return;

    dispatch(setFurnitureModalState(false));
  };

  const isFurnitureModalOpen = useSelector((state: RootState) => {
    return state.furnitureModal.isFurnitureModalOpen;
  });

  const [editingTitle, setEditingTitle] = useState<string>(modalData.title);

  const display = isFurnitureModalOpen ? "" : "hidden";

  const member = getMemberFromSession();

  const furnitureDataString = JSON.stringify(
    useSelector((state: RootState) => {
      return state.furnitureInfo.allFurnitureInfo;
    })
  );

  const handleSave = async () => {
    try {
      const editData = {
        postId: modalData.postId,
        writer: { id: member.id, password: null },
        title: editingTitle,
        furnitureData: furnitureDataString,
      } as PostData;
      console.log(editData.furnitureData);
      const response = await axios.post("/savePost", editData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const editData = {
        postId: modalData.postId,
        writer: { id: member.id, password: null },
        title: editingTitle,
        furnitureData: furnitureDataString,
      } as PostData;
      console.log(editData);
      const response = await axios.post("/deletePost", editData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={handleClickBackground}
      className={`fixed w-full h-full bg-black bg-opacity-50 z-50 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${display}`} //반투명 배경
    >
      <FurnitureListModal />
      <div
        className="fixed bg-white w-3/5 h-4/5 rounded transform top-1/2 left-1/2 -translate-x-[40%] -translate-y-1/2 flex flex-col"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <TitleBar modalData={modalData} setEditingTitle={setEditingTitle} />
        <CanvasContainer furnitureInfo={furnitureDataJSON} />
        <ButtonContainer handleSave={handleSave} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

type TitleBarProps = {
  modalData: PostData;
  setEditingTitle: React.Dispatch<React.SetStateAction<string>>;
};
const TitleBar = ({ modalData, setEditingTitle }: TitleBarProps) => {
  const isNewPost = useSelector((state: RootState) => {
    return state.furnitureModal.isNewPost;
  });

  const modalState = useSelector((state: RootState) => {
    return state.furnitureModal.isFurnitureModalOpen;
  });
  const dispatch = useDispatch();

  const titleRef = useRef<any>();

  useEffect(() => {}, [modalState]);

  const handleClose = () => {
    console.log(modalData);
    dispatch(setFurnitureModalState(false));
  };

  const createdDate = new Date(modalData.createdDate);
  const createdDateString =
    createdDate.getFullYear() +
    "." +
    ("0" + (createdDate.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + createdDate.getDate()).slice(-2) +
    " " +
    createdDate.getHours() +
    ":" +
    createdDate.getMinutes();

  return (
    <div className="h-12 bg-sky-300 rounded-t grow-0 flex items-center justify-between px-3 text-white w-full">
      {modalState && (
        <div className="w-full">
          {isNewPost ? (
            <input
              type="text"
              className="text-lg bg-inherit w-full focus:border-none focus:outline-none"
              defaultValue=""
              placeholder="제목"
              onChange={(e) => {
                setEditingTitle(e.target.value);
              }}
            />
          ) : (
            <input
              ref={titleRef}
              type="text"
              className="text-lg bg-inherit w-full focus:border-none focus:outline-none"
              defaultValue={modalData.title}
              onChange={(e) => {
                setEditingTitle(e.target.value);
              }}
            />
          )}

          {!isNewPost && (
            <div className="flex text-xs">
              <span>{modalData.writer.id}</span>
              <span className="inline-block w-[1px] h-[10px] ml-4 mr-1 mt-1 bg-white"></span>
              <span>{createdDateString}</span>
            </div>
          )}
        </div>
      )}

      <svg
        fill="white"
        height="20px"
        width="20px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1792 1792"
        xmlSpace="preserve"
        onClick={handleClose}
        className="hover:cursor-pointer"
      >
        <path
          d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4
	c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1
	c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z"
        />
      </svg>
    </div>
  );
};

type ButtonContainerProps = { handleSave: any; handleDelete: any };
const ButtonContainer = ({
  handleSave,
  handleDelete,
}: ButtonContainerProps) => {
  const isNewPost = useSelector((state: RootState) => {
    return state.furnitureModal.isNewPost;
  });
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-center bg-sky-300 h-8 rounded-b text-white">
      {isNewPost ? (
        <button
          className="rounded-md bg-sky-500 p-1 text-xs m-1 w-1/5"
          onClick={() => {
            dispatch(setFurnitureModalState(false));
          }}
        >
          취소
        </button>
      ) : (
        <button
          className="rounded-md bg-sky-500 p-1 text-xs m-1 w-1/5"
          onClick={handleDelete}
        >
          삭제
        </button>
      )}

      <button
        className="rounded-md bg-sky-500 p-1 text-xs m-1 w-1/5"
        onClick={handleSave}
      >
        저장
      </button>
    </div>
  );
};

export default FurnitureModal;
