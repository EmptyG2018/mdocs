import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorState } from "@codemirror/state";
import { oneDarkTheme } from "@codemirror/theme-one-dark";
import { EditorView, basicSetup } from "codemirror";
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";

/**
 * @title markdown编辑器
 * @param onChange 内容改变触发事件
 */

const MarkdownEditorRoot = styled.div`
  width: 100%;
  height: 100%;
  .cm-editor {
    width: 100%;
    height: 100%;
    max-height: 100%;
  }
  .cm-scroller {
    overflow: auto;
  }
`;

type MarkdownEditorProps = {
  onChange?: (doc: string) => void;
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = forwardRef(
  ({ onChange }, ref) => {
    const editorEl = useRef(null);
    const editorState = useRef<EditorState | null>(null);
    const editorView = useRef<EditorView | null>(null);

    useEffect(() => {
      if (editorEl.current) {
        editorState.current = EditorState.create({
          doc: "",
          extensions: [
            basicSetup,
            markdown({
              codeLanguages: languages,
            }),
            oneDarkTheme,
            EditorView.updateListener.of((v) => {
              onChange && onChange(v.state.doc.toString());
            }),
          ],
        });

        editorView.current = new EditorView({
          state: editorState.current,
          parent: editorEl.current,
        });
      }
    }, []);

    useImperativeHandle(ref, () => ({
      setValue(value: string) {
        if (editorState.current && editorView.current) {
          const transaction = editorView.current.state.update({
            changes: {
              from: 0,
              to: editorView.current.state.doc.length,
              insert: value,
            },
          });

          editorView.current.dispatch(transaction);
        }
      },
    }));

    return <MarkdownEditorRoot ref={editorEl}></MarkdownEditorRoot>;
  }
);

export default MarkdownEditor;
