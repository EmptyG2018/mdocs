import { useCallback } from "react";

const useMarkdownTitleParse = ({ maxLevel = 2 }) => {
  const regx = new RegExp(`^ {0,3}#{1,${maxLevel}} (.*)$`, "m");

  const parse = useCallback((content: string) => {
    const parsed = content.match(regx);
    return parsed ? parsed[1] : "";    
  }, []);

  return { parse };
};

export default useMarkdownTitleParse;
