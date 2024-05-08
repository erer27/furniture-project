import debugFurniture from "../threeJS/DebugFurniture";

export type PostData = typeof samplePostData;

export const samplePostData = {
  postId: 100,
  title: "임시 제목",
  writer: "작성자",
  createdAt: "0000:00:00:00:00:00",
  furnitureData: JSON.stringify(debugFurniture),
};

export const defaultPostData = {
  postId: 101,
  title: "",
  writer: "",
  createdAt: "",
  furnitureData: "",
} as PostData;
