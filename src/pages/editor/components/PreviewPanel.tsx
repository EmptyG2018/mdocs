import React from "react";
import styled from "styled-components";


/**
 * @title md浏览器
 */

const MarkdownPreviewRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #282c34;
`;

const MarkdownPreviewHeader = styled.div`
  padding: 12px 16px;
`;

const MarkdownPreviewMain = styled.div`
  felx: 1;
  width: 100%;
  height: 100%;
`;

const MarkdownPreviewFooter = styled.div`
  padding: 12px 16px;
`;

type MarkdownPreviewProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <MarkdownPreviewRoot>
      {header && <MarkdownPreviewHeader>{header}</MarkdownPreviewHeader>}
      {children && <MarkdownPreviewMain>{children}</MarkdownPreviewMain>}
      {footer && <MarkdownPreviewFooter>{footer}</MarkdownPreviewFooter>}
    </MarkdownPreviewRoot>
  );
};

export default MarkdownPreview;
