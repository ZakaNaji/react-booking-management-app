import { useEffect, useRef } from "react";

export default function useClickOutside(callback, capturing = true) {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, capturing);
    return () => document.removeEventListener("click", handleClick, capturing);
  }, [callback, capturing]);
  return ref;
}
