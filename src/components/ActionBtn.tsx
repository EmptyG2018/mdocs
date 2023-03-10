import React from "react";
import styled, { css } from "styled-components";

const ActionBtnRoot = styled.div<
  Omit<ActionBtnProps, "icon" | "title" | "onClick"> & {
    spaceSize: number[];
  }
>`
  ${({
    block,
    spaceSize,
    size,
    color,
    backgroundColor,
    hover,
    hoverColor,
    hoverBackgroundColor,
    direction,
    gap,
  }) => css`
    display: ${block ? "block" : "inline-block"};
    padding: ${`${spaceSize[0]}px ${spaceSize[1]}px`};
    font-size: ${size && size + "px"};
    color: ${color};
    background-color: ${backgroundColor};
    border-radius: 4px;
    cursor: pointer;

    ${hover &&
    `
      &:hover {
        background-color: ${hoverBackgroundColor};
        color: ${hoverColor};
      }
    `}

    .action-btn__wrap {
      display: flex;
      ${direction === "vertical" && "flex-direction: column"};
      align-items: center;
      justify-content: center;
      gap: ${gap && gap + "px"};
    }

    .action-btn__icon {
      line-height: 1;
    }
  `}
`;

type ActionBtnProps = {
  direction?: "vertical" | "horizontal";
  block?: boolean;
  icon?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  hover?: boolean;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  spaceSize?: number | number[];
  gap?: number;
  size?: number;
  title?: string;
  alt?: string;
  onClick?: () => void;
};

/**
 * @title 图标按钮组合组件
 * @param {'vertical' | 'horizontal'} [directoin] 方向
 * @param {boolean} [block] 块
 * @param {React.ReactNode} [icon] 图标
 * @param {string} [color] 颜色
 * @param {string} [backgroundColor] 背景颜色
 * @param {boolean} [hover] 是否hover交互
 * @param {string} [hoverColor] hover颜色
 * @param {string} [hoverBackgroundColor] hover背景颜色
 * @param {number | number[]} [spaceSize] 内边距
 * @param {number} [gap] 元素之间间隔
 * @param {number} [size] 文字大小
 * @param {string} [title] 标题
 * @param {string} [alt] 原生alt
 * @param {function} [onClick] 点击事件
 */
const ActionBtn: React.FC<ActionBtnProps> = ({
  spaceSize,
  icon,
  title,
  alt,
  onClick,
  ...rest
}) => {
  const [spaceVertical, spaceHorizontal = spaceVertical] = Array.isArray(
    spaceSize
  )
    ? [spaceSize[0], spaceSize[1]]
    : [spaceSize, spaceSize];

  return (
    <ActionBtnRoot
      spaceSize={[spaceVertical, spaceHorizontal]}
      title={alt}
      {...rest}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      <div className="action-btn__wrap">
        {icon && <div className="action-btn__icon">{icon}</div>}
        {title && <div className="action-btn__title">{title}</div>}
      </div>
    </ActionBtnRoot>
  );
};

export default ActionBtn;
