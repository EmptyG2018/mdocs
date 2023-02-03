import hljs from "highlight.js";
import { marked } from "marked";

const useMarked = () => {
  const markedMarkdown = (doc: string) => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: "hljs language-",
    });
    marked.parse(doc);
  };

  return { markedMarkdown };
};

export default useMarked;
