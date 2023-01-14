import React from "react";
import styled from "styled-components";

/**
 * @title 资源搜索
 * @param keyword 关键词
 * @param placeholder 占位符
 * @param onChange 文字改变事件
 * @param onEnter Entr回车按钮事件
 */

const ResourceSearchRoot = styled.div`
  border: 1px solid red;
`;

const ResourceSeachWrap = styled.div`
  padding: 8px 16px;
`;

const ResourceSearchControl = styled.input`
  box-sizing: border-box;
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
`;

type ResourceHeaderProps = {
  keyword: string;
  placeholder?: string;
  onChange?: (keyword: string) => void;
  onEnter?: (keyword: string) => void;
};

const ResourceHeader: React.FC<ResourceHeaderProps> = ({
  keyword,
  placeholder,
  onChange,
  onEnter,
}) => {
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && onEnter && onEnter(keyword);
  };

  return (
    <ResourceSearchRoot>
      <ResourceSeachWrap>
        <ResourceSearchControl
          value={keyword}
          placeholder={placeholder}
          onChange={() => {
            onChange && onChange(keyword);
          }}
          onKeyUp={handleKeyUp}
        />
      </ResourceSeachWrap>
    </ResourceSearchRoot>
  );
};

export default ResourceHeader;
