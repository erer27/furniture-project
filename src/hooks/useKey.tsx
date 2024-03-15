import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Vector3 } from "three";

function useKey(camera: any) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "t") {
      }
    },
    [camera]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
export default useKey;
