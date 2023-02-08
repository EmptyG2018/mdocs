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
  onMount: any;
  onChange: any;
};

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  model,
  theme,
  onMount,
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

      const defaultModel = monaco.editor.createModel(
        model.value,
        "markdown",
        model.uri
      );

      editor.current = monaco.editor.create(monacoEl.current, {
        model: defaultModel,
        automaticLayout: true,
      });

      editor.current.onDidChangeModelContent((e) => {
        onChange && onChange(editor.current?.getValue() || "");
      });

      onMount(monaco, editor.current);
      setMountEditor(true);
    }
  }, [mountedEditor]);

  useEffect(() => {
    if (mountedEditor) {
      // const defaultModel = monaco.editor.createModel(
      //   model.value,
      //   "markdown",
      //   model.uri
      // );

      // editor.current?.setModel(defaultModel);
      console.log('model');
    }
  }, [mountedEditor, model]);

  useEffect(() => {
    if (mountedEditor) {
      // monaco.editor.setTheme(theme);
    }
  }, [mountedEditor, theme]);

  return <MarkdownEditorRoot ref={monacoEl}></MarkdownEditorRoot>;
};

export default MarkdownEditor;
