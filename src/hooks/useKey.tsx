import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Vector3 } from "three";

function useKey(control: any) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "t") {
        console.log(control);
      }
    },
    [control]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
export default useKey;
