import React from "react";
import styled from "styled-components";

/**
 * @title 资源搜索
 * @param keyword 关键词
 * @param placeholder 占位符
 * @param onChange 文字改变事件
 * @param onEnter Entr回车按钮事件
 */

const ResourceSearchRoot = styled.input`
  box-sizing: border-box;
  outline: none;
  border: none;
  margin: 0;
  padding: 10px 12px;
  background-color: #141c28;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: 6px;
  color: #8e98a3;
  font-size: 14px;
  width: 100%;
  &::-webkit-input-placeholder {
    color: #8e98a3;
  }
  &:-moz-placeholder {
    color: #8e98a3;
  }
  &::-moz-placeholder {
    color: #8e98a3;
  }
  &:focus {
    border-color: #0351ff;
  }
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
    <ResourceSearchRoot
      value={keyword}
      placeholder={placeholder}
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
      onKeyUp={handleKeyUp}
    />
  );
};

export default ResourceHeader;
