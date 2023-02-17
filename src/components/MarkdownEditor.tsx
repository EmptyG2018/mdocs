import React, { useState, useRef, useEffect } from "react";
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
  const [mountedEditor, setMountEditor] = useState(false);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editor.current && mountedEditor) {
      return () => editor.current?.dispose();
    }
  }, []);

  useEffect(() => {
    if (monacoEl.current && !mountedEditor) {
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.Latest,
        module: monaco.languages.typescript.ModuleKind.ES2015,
        allowNonTsExtensions: true,
        lib: ["es2018"],
      });

      editor.current = monaco.editor.create(monacoEl.current, {
        model: null,
        automaticLayout: true,
      });

      setMountEditor(true);
    }
  }, [mountedEditor, onChange]);

  useEffect(() => {
    if (mountedEditor) {
      const currentModel =
        monaco.editor.getModel(model.uri) ||
        monaco.editor.createModel(model.value, "markdown", model.uri);

      editor.current?.setModel(currentModel);
    }
  }, [mountedEditor, model]);

  useEffect(() => {
    if (editor.current) {
      editor.current.onDidChangeModelContent((e) => {
        onChange && onChange(editor.current?.getModel()?.getValue() || "");
      });
    }
    return () => {
      onChange = null;
    };
  }, [onChange]);

  useEffect(() => {
    if (mountedEditor) {
      monaco.editor.setTheme(theme);
    }
  }, [mountedEditor, theme]);

  return <MarkdownEditorRoot ref={monacoEl}></MarkdownEditorRoot>;
};

export default MarkdownEditor;
