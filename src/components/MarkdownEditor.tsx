import React, { useState, useRef, useEffect, useCallback } from "react";
import * as monaco from "monaco-editor";
import styled from "styled-components";

const MarkdownEditorRoot = styled.div`
  width: 100%;
  height: 100%;
`;

type MarkdownEditorProps = {
  model: any;
  theme: any;
  onChange: any;
};

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  model,
  theme,
  onChange,
}) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement | null>(null);

  const mounteEditor = useCallback(() => {
    if (!editor && monacoEl.current) {
      setEditor(
        monaco.editor.create(monacoEl.current, {
          model: null,
          wordWrap: 'on',
          automaticLayout: true,
        })
      );
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      const currentModel =
        monaco.editor.getModel(model.uri) ||
        monaco.editor.createModel(model.value, "markdown", model.uri);

      editor.updateOptions({
        readOnly: model.readOnly,
      });

      editor.setModel(currentModel);
    }
  }, [editor, model]);

  useEffect(() => {
    if (editor) {
      monaco.editor.setTheme(theme);
    }
  }, [editor, theme]);

  useEffect(() => {
    mounteEditor();
    return () => {
      editor?.dispose();
    };
  }, [editor]);

  useEffect(() => {
    let event: monaco.IDisposable;
    if (editor) {
      event = editor.onDidChangeModelContent((e) => {
        onChange && onChange(editor?.getModel()?.getValue() || "");
      });
    }
    return () => {
      event?.dispose();
    };
  }, [editor, onChange]);

  return <MarkdownEditorRoot ref={monacoEl}></MarkdownEditorRoot>;
};

export default MarkdownEditor;
