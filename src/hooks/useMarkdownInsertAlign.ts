import * as monaco from "monaco-editor";

const useMarkdownInsertAlign = (
  editor: monaco.editor.IStandaloneCodeEditor | null,
  action: string | null
) => {
  const insert = () => {
    const position = editor?.getPosition();

    editor?.executeEdits(action, [
      {
        range: new monaco.Range(position.lineNumber, 1, position.lineNumber, 1),
        text: " ".padStart(level + 1, "#"),
        forceMoveMarkers: false,
      },
    ]);
  };
};

export default useMarkdownInsertAlign;
