import { useRef } from "react";

const useEditor = () => {
  const markdownEditor = useRef(null);

  return { markdownEditor };
};

export default useEditor;
