import React from "react";
import styled from "styled-components";

/**
 * @title markdown浏览器
 * @param doc markdonw内容
 * @param token token变量
 */

/**
 * bgColor: #22272e;
 * color: #adbac7;
 * linkColor: #539bf5;
 *
 * hrColor: red;
 *
 * headColor: #adbac7;
 * headBorderColor: #373e47;
 *
 * blockquoteBorderColor: red;
 * blockquoteColor: red;
 *
 * codeColor: #24292e;
 * codeBgColor: red;
 *
 * codeblockColor: #24292e;
 * codeblockBgcolor: red;
 *
 * tableColor: red;
 * tableBorderColor: red;
 * tableHeadBgColor: red;
 * tableHeadColor: red;
 * tableCellBgColor: red;
 * tableCellColor: red;
 *
 *
 *
 */

const MarkdownPreviewRoot = styled.div``;

const MarkdownPreviewNormalize = styled.div`
  * {
    box-sizing: border-box;
  }

  ul,
  ol {
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  blockquote {
    margin: 0;
  }

  img {
    border-style: none;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }
`;

const MarkdownPreviewHtml = styled.div`
  background-color: ${(props) => props.token.bgColor};
  color: ${(props) => props.token.color};
  font-size: 16px;
  line-height: 1.5;

  > *:first-child {
    margin-top: 0 !important;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre {
    margin-top: 0;
    margin-bottom: 16px;
  }

  a {
    color: ${(props) => props.token.linkColor};
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${(props) => props.token.headMarginTopVertical};
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: bold;
  }
  h1,
  h2 {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${(props) => props.token.headBorderColor};
    padding-bottom: 0.3em;
  }
  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 14px;
  }
  h6 {
    font-size: 12px;
  }

  hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: ${(props) => props.token.hrColor};
    border: 0;
  }

  blockquote {
    padding: 0 1em;
    color: ${(props) => props.token.blockquoteColor};
    border-left-width: 0.25em;
    border-left-style: solid;
    border-left-color: ${(props) => props.token.blockquoteBorderColor};
    > p {
      &:last-child {
        margin-bottom: 0;
      }
      &:first-child {
        margin-top: 0;
      }
    }
  }

  ul,
  ol {
    padding-left: 2em;
  }

  img {
    max-width: 100%;
    box-sizing: content-box;
  }

  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    color: ${(props) => props.token.codeColor};
    background-color: ${(props) => props.token.codeBgColor};
    border-radius: 6px;
  }

  table {
    display: block;
    width: 100%;
    width: max-content;
    max-width: 100%;
    overflow: auto;
    color: ${(props) => props.token.tableColor};
    tr {
      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: ${(props) => props.token.tableBorderColor};
    }
    th,
    td {
      padding: 6px 13px;
      border-width: 1px;
      border-style: solid;
      border-color: ${(props) => props.token.tableBorderColor};
    }
    th {
      font-weight: 600;
      background-color: ${(props) => props.token.tableHeadBgColor};
      color: ${(props) => props.token.tableHeadColor};
    }
    td {
      background-color: ${(props) => props.token.tableCellBgColor};
      color: ${(props) => props.token.tableCellColor};
    }
  }
`;

type MarkdownPreviewProps = {
  doc: string;
  token: Record<string, any>;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ doc, token }) => {
  return (
    <MarkdownPreviewRoot>
      <MarkdownPreviewNormalize>
        <MarkdownPreviewHtml
          dangerouslySetInnerHTML={{ __html: doc }}
          token={token}
        />
      </MarkdownPreviewNormalize>
    </MarkdownPreviewRoot>
  );
};

export default MarkdownPreview;
