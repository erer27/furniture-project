import debugFurniture from "../threeJS/DebugFurniture";

import { Member } from "./SignUpPage";

export type PostData = {
  postId: number | null;
  title: string;
  writer: Member;
  createdAt: string;
  furnitureData: string;
};

export const samplePostData = {
  postId: 100,
  title: "임시 제목",
  writer: "작성자",
  createdAt: "0000:00:00:00:00:00",
  furnitureData: JSON.stringify(debugFurniture),
};

export const defaultPostData = {
  postId: null,
  title: "",
  writer: { id: null, password: null },
  createdAt: "",
  furnitureData: JSON.stringify(debugFurniture),
} as PostData;
