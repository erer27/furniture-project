import debugFurniture from "../threeJS/DebugFurniture";

import { Member } from "./SignUpPage";

export type PostData = {
  postId: number | null;
  title: string;
  writer: Member;
  createdDate: string;
  furnitureData: string;
};

export const samplePostData = {
  postId: 100,
  title: "임시 제목",
  writer: "작성자",
  createdDate: "0000:00:00:00:00:00",
  furnitureData: JSON.stringify(debugFurniture),
};

export const defaultPostData = {
  postId: null,
  title: "",
  writer: { id: null, password: null },
  createdDate: "",
  furnitureData: JSON.stringify([]), //새 포스트에 가구 넣을거면 debugFurniture 아니면 []
} as PostData;
