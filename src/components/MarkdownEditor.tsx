import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorState } from "@codemirror/state";
import { oneDarkTheme } from "@codemirror/theme-one-dark";
import { EditorView, basicSetup } from "codemirror";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

/**
 * @title markdown编辑器
 * @param onChange 内容改变触发事件
 */

const MarkdownEditorRoot = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

type MarkdownEditorProps = {
  onChange?: (doc: string) => void;
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onChange }) => {
  const editor = useRef(null);

  useEffect(() => {
    if (editor.current) {
      const customTheme = EditorView.theme({
        "&": {
          width: "100%",
          height: "100%",
        },
      });

      let state = EditorState.create({
        doc: "Hello World",
        extensions: [
          basicSetup,
          markdown({
            codeLanguages: languages,
          }),
          oneDarkTheme,
          customTheme,
          EditorView.updateListener.of((v) => {
            onChange && onChange(v.state.doc.toString());
          }),
        ],
      });

      const view = new EditorView({
        state,
        parent: editor.current,
      });

      // let transaction = view.state.update({
      //   changes: { from: 0, insert: "# this is wi\n ndow." },
      // });
      // console.log(transaction.state.doc.toString());

      // view.dispatch(transaction);
    }
  }, []);

  return <MarkdownEditorRoot ref={editor}></MarkdownEditorRoot>;
};

export default MarkdownEditor;
