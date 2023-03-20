import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  cloneElement,
} from "react";
import * as monaco from "monaco-editor";
import styled from "styled-components";
import ActionBtn from "./ActionBtn";
import { AiOutlineAntDesign } from "react-icons/ai";

const MarkdownEditorRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MarkdownEditorHeader = styled.div``;

const MarkdownEditorContainer = styled.div`
  flex: 1 0 0;
`;

const MarkdownEditorFooter = styled.div``;

type MarkdownEditorProps = {
  model: any;
  theme: any;
  onChange: any;
};

const insertTitle = (editor, level: number) => {
  const position = editor?.getPosition();

  editor?.executeEdits("actions", [
    {
      range: new monaco.Range(
        position.lineNumber,
        1,
        position.lineNumber,
        1
      ),
      text: " ".padStart(level + 1, "#"),
      forceMoveMarkers: false,
    },
  ]);
}

const insertSelection = (editor) => {
  const selection = editor?.getSelection();

}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  model,
  theme,
  onChange,
}) => {
  const toolbars = [
    {
      render: <ActionBtn icon={<AiOutlineAntDesign />} hover></ActionBtn>,
      onClick: (editor) => insertTitle(editor, 1),
    },
    {
      render: <ActionBtn icon={<AiOutlineAntDesign />} hover></ActionBtn>,
      onClick: (editor) => insertTitle(editor, 2),
    },
    {
      render: <ActionBtn icon={<AiOutlineAntDesign />} hover></ActionBtn>,
      onClick: (editor) => insertTitle(editor, 3),
    },
    {
      render: <ActionBtn icon={<AiOutlineAntDesign />} hover></ActionBtn>,
      onClick: (editor) => insertTitle(editor, 4),
    },
    {
      render: <ActionBtn icon={<AiOutlineAntDesign />} hover></ActionBtn>,
      onClick: (editor) => insertTitle(editor, 5),
    },
    {
      render: <ActionBtn icon={<AiOutlineAntDesign />} hover></ActionBtn>,
      onClick: (editor) => insertTitle(editor, 6),
    }
  ];

  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement | null>(null);

  const mounteEditor = useCallback(() => {
    if (!editor && monacoEl.current) {
      setEditor(
        monaco.editor.create(monacoEl.current, {
          model: null,
          wordWrap: "on",
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

  useEffect(() => {
    mounteEditor();
    return () => {
      editor?.dispose();
    };
  }, [editor]);

  return (
    <MarkdownEditorRoot>
      <MarkdownEditorHeader>
        {toolbars.map((item) =>
          cloneElement(item.render, { onClick: () => item.onClick(editor) })
        )}
      </MarkdownEditorHeader>
      <MarkdownEditorContainer ref={monacoEl} />
      <MarkdownEditorFooter></MarkdownEditorFooter>
    </MarkdownEditorRoot>
  );
};

export default MarkdownEditor;
