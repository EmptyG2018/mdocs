import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as monaco from "monaco-editor";
import styled from "styled-components";

const MarkdownEditorRoot = styled.div`
  width: 100%;
  height: 100%;
`;

type MarkdownEditorProps = {
  onChange?: (doc: string) => void;
};

export const MarkdownEditor: React.FC<MarkdownEditorProps> = forwardRef(
  ({ onChange }, ref) => {
    const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (monacoEl.current) {
        editor.current = monaco.editor.create(monacoEl.current, {
          value: "",
          language: "markdown",
          automaticLayout: true,
        });

        editor.current.onDidChangeModelContent((e) => {
          onChange && onChange(editor.current?.getValue() || "");
        });
      }
      return () => editor.current?.dispose();
    }, []);

    useImperativeHandle(ref, () => ({
      setValue(doc: string) {
        if (editor.current) {
          editor.current.setValue(doc);
        }
      },
    }));

    return <MarkdownEditorRoot ref={monacoEl}></MarkdownEditorRoot>;
  }
);

export default MarkdownEditor;
