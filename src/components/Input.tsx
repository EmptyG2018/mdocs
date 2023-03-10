import React from "react";
import styled from "styled-components";

const InputRoot = styled.input<
  Pick<
    InputProps,
    | "backgroundColor"
    | "color"
    | "focusBorderColor"
    | "placeholderColor"
    | "size"
  >
>`
  box-sizing: border-box;
  outline: none;
  border: none;
  margin: 0;
  padding: 10px 12px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: 6px;
  color: ${({ color }) => color};
  font-size: ${({ size }) => (size ? size + "px" : null)};
  width: 100%;
  &::-webkit-input-placeholder,
  &:-moz-placeholder,
  &::-moz-placeholder {
    color: ${({ placeholderColor }) => placeholderColor};
  }
  &:focus {
    border-color: ${({ focusBorderColor }) => focusBorderColor};
  }
`;

type InputProps = {
  value: string;
  placeholder?: string;
  backgroundColor?: string;
  placeholderColor?: string;
  focusBorderColor?: string;
  color?: string;
  size?: number;
  autoFocus?: boolean;
  onChange?: (keyword: string) => void;
  onEnter?: (keyword: string) => void;
};

/**
 * @title
 * @param {string} value 文本值
 * @param {string} [placeholder] 占位符
 * @param {string} [backgroundColor] 背景色
 * @param {string} [placeholderColor] 占位符文字颜色
 * @param {string} [focusBorderColor] 获焦边框颜色
 * @param {string} [color] 文本颜色
 * @param {number} [size] 文本大小
 * @param {boolean} [autoFocus] 自动获焦
 * @param {function} [onChange] 文字改变事件
 * @param {function} [onEnter] Entr回车按钮事件
 */
const Input: React.FC<InputProps> = ({ value, onChange, onEnter, ...rest }) => {
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && onEnter && onEnter(value);
  };

  return (
    <InputRoot
      value={value}
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
      onKeyUp={handleKeyUp}
      {...rest}
    />
  );
};

export default Input;
