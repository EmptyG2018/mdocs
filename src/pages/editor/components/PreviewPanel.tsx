import React, { useMemo } from "react";
import styled from "styled-components";
import { MarkdownPreview } from "../../../components";
import { useStoreModule } from "../stores";

import { useMarked } from "../../../hooks";

/**
 * @title md浏览器
 */

const PreviewPanelRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PreviewPanelHeader = styled.div`
  padding: 12px 16px;
`;

const PreviewPanelMain = styled.div`
  flex: 1 0 auto;
  width: 100%;
  height: 0;
`;

const PreviewPanelFooter = styled.div`
  padding: 12px 16px;
`;

const PreviewPanel: React.FC = () => {
  const { markedMarkdown } = useMarked();

  const { modules } = useStoreModule();

  const doc = useMemo(
    () => modules.map((item) => markedMarkdown(item.content)).join(""),
    [modules]
  );

  return (
    <PreviewPanelRoot>
      <PreviewPanelHeader></PreviewPanelHeader>
      <PreviewPanelMain>
        <MarkdownPreview
          doc={doc}
          token={{
            // *** github黑 *** //
            // bgColor: "#282c34",
            // color: "#adbac7",
            // linkColor: "#539bf5",
            // hrColor: "#373e47",
            // headColor: "#adbac7",
            // headBorderColor: "#373e47",

            // blockquoteColor: "#768390",
            // blockquoteBgColor: "#282c34",
            // blockquoteBorderColor: "#444c56",

            // codeColor: "#adbac7",
            // codeBgColor: "#3C434D",
            // codeBlockBgColor: "#2d333b",

            // tableColor: "#adbac7",
            // tableBorderColor: "#373e47",
            // tableHeadBgColor: "#22272e",
            // tableHeadColor: "#adbac7",
            // tableCellBgColor: "#22272e",
            // tableCellColor: "#adbac7",

            // *** vue绿 *** //
            bgColor: "#ffffff",
            color: "#2c3e50",
            linkColor: "#3eaf7c",
            hrColor: "#eaecef",
            headColor: "#2c3e50",
            headBorderColor: "#eaecef",

            blockquoteColor: "#999",
            blockquoteBgColor: "#EDF8F3",
            blockquoteBorderColor: "#3eaf7c",

            codeColor: "#EB7B25",
            codeBgColor: "#F8F8F8",
            codeBlockBgColor: "#282c34",

            tableColor: "#5B6C7C",
            tableBorderColor: "#EBEDEE",
            tableHeadBgColor: "#F2F2F2",
            tableHeadColor: "#3A4E63",
            tableCellBgColor: "#ffffff",
            tableCellColor: "#5B6C7C",

            // *** 掘金蓝 *** //
            // bgColor: "#ffffff",
            // color: "#252933",
            // linkColor: "#0269c8",
            // hrColor: "#ececec",
            // headColor: "#252933",
            // headBorderColor: "#ececec",

            // blockquoteColor: "#666",
            // blockquoteBgColor: "#f8f8f8",
            // blockquoteBorderColor: "#cbcbcb",

            // codeColor: "#ff502c",
            // codeBgColor: "#fff5f5",
            // codeBlockBgColor: "#f8f8f8",

            // tableColor: "#252933",
            // tableBorderColor: "#EBEDEE",
            // tableHeadBgColor: "#F2F2F2",
            // tableHeadColor: "#252933",
            // tableCellBgColor: "#ffffff",
            // tableCellColor: "#252933",

            // *** 掘金蓝 *** //
            // bgColor: "#f5f4f8",
            // color: "#18113c",
            // linkColor: "#754ffe",
            // hrColor: "#ecebf1",
            // headColor: "#18113c",
            // headBorderColor: "#ecebf1",

            // blockquoteColor: "#666",
            // blockquoteBgColor: "#f8f8f8",
            // blockquoteBorderColor: "#cbcbcb",

            // codeColor: "#d63384",
            // codeBgColor: "transparent",
            // codeBlockBgColor: "#18113c",

            // tableColor: "#252933",
            // tableBorderColor: "#EBEDEE",
            // tableHeadBgColor: "#F2F2F2",
            // tableHeadColor: "#252933",
            // tableCellBgColor: "#ffffff",
            // tableCellColor: "#252933",
          }}
        />
      </PreviewPanelMain>
      <PreviewPanelFooter></PreviewPanelFooter>
    </PreviewPanelRoot>
  );
};

export default PreviewPanel;
