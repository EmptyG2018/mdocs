import hljs from "highlight.js";
import { marked } from "marked";
import { useState } from "react";

const useEditor = () => {
  const [doc, changeDoc] = useState("");

  const markedDoc = (
    doc: string,
    callback?: (error: any, parseResult: string) => void
  ) => {
    marked.parse(
      doc,
      {
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
        langPrefix: "hljs language-",
      },
      (error, html) => {
        callback && callback(error, html);
      }
    );
  };

  return { doc, markedDoc };
};

export default useEditor;
