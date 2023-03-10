import React, { Fragment, useCallback } from "react";
import styled from "styled-components";
import {
  AiOutlineFileMarkdown,
  AiOutlineFolder,
  AiOutlineDown,
} from "react-icons/ai";

const PathItemRoot = styled.div<
  Pick<PathItemProps, "indentWidth" | "level" | "selected" | "disabled">
>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 4px 4px
    ${({ indentWidth, level }) => 4 + indentWidth * (level - 1) + "px"};
  border-radius: 4px;
  color: ${({ disabled, selected }) =>
    disabled ? "#475360" : selected ? "#ffffff" : "#8e98a3"};
  background-color: ${({ selected }) => (selected ? "#0351ff" : "none")};
  &:hover {
    background-color: rgb(3, 81, 255, 0.8);
    cursor: pointer;
  }
`;

const PathItemCell = styled.span`
  display: flex;
  flex: 1 0 0;
  width: 0;
`;

const PathItemIcon = styled.span`
  line-height: 1;
  margin-right: 4px;
`;

const PathItemName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PathItemPrefix = styled.span`
  margin-right: 8px;
`;

const PathItemExtend = styled.span`
  margin-left: 8px;
`;

type PathItemProps = {
  prefix?: React.ReactNode;
  icon?: React.ReactNode;
  name: string;
  level: number;
  selected?: boolean;
  disabled?: boolean;
  indentWidth: number;
  extend?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

/**
 * @title 单行路径
 * @param {React.ReactNode} [prefix] 前缀扩展
 * @param {React.ReactNode} [icon] 路径图标
 * @param {stirng} name 路径名
 * @param {number} level 层级
 * @param {boolean} [selected] 选中状态
 * @param {boolean} [disabled] 禁用状态
 * @param {number} indentWidth 缩进宽度
 * @param {React.ReactNode} [extend] 扩展
 * @param {Function} [onClick] 点击事件
 */
const PathItem: React.FC<PathItemProps> = ({
  prefix,
  icon,
  name,
  disabled,
  extend,
  onClick,
  ...rest
}) => {
  return (
    <PathItemRoot
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onClick && onClick(e);
      }}
      {...rest}
    >
      <PathItemCell>
        {prefix && <PathItemPrefix>{prefix}</PathItemPrefix>}
        {icon && <PathItemIcon>{icon}</PathItemIcon>}
        <PathItemName>{name}</PathItemName>
      </PathItemCell>
      {extend && <PathItemExtend>{extend}</PathItemExtend>}
    </PathItemRoot>
  );
};

const FolderCollpaseIcon = styled.div`
  line-height: 1;
`;

const FolderCollpaseIconSvg = styled(AiOutlineDown)<
  Pick<FolderProps, "expand">
>`
  transition: transform 0.3s;
  transform: rotate(${({ expand }) => (expand ? "0deg" : "-90deg")});
`;

type FolderProps = {
  name: string;
  icon?: React.ReactNode;
  expand: boolean;
  level: number;
  selected?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

/**
 * @title 文件夹
 * @param {string} name 文件夹名称
 * @param {React.ReactNode} [icon] 文件夹图标
 * @param {boolean} expand 是否展开
 * @param {number} level 层级
 * @param {boolean} [selected] 选中状态
 * @param {boolean} [disabled] 禁用状态
 * @param {React.ReactNode} [children] 子级组件
 * @param {Function} [onClick] 点击事件
 */
const Folder: React.FC<FolderProps> = ({ expand, children, ...rest }) => {
  return (
    <>
      <PathItem
        indentWidth={20}
        prefix={
          <FolderCollpaseIcon>
            <FolderCollpaseIconSvg expand={expand} size={18} />
          </FolderCollpaseIcon>
        }
        {...rest}
      />
      {expand && children}
    </>
  );
};

const FileCollpaseIcon = styled(FolderCollpaseIcon)`
  visibility: hidden;
`;

type FileProps = {
  name: string;
  icon?: React.ReactNode;
  level: number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

/**
 * @title 文件
 * @param {string} name 文件名称
 * @param {React.ReactNode} [icon] 文件图标
 * @param {number} level 层级
 * @param {boolean} [selected] 选中状态
 * @param {boolean} [disabled] 禁用状态
 * @param {function} [onClick] 点击事件
 */
const File: React.FC<FileProps> = ({ ...rest }) => {
  return (
    <PathItem
      indentWidth={20}
      prefix={
        <FileCollpaseIcon>
          <AiOutlineDown size={18} />
        </FileCollpaseIcon>
      }
      {...rest}
    />
  );
};

const PathRoot = styled.div`
  user-select: none;
  padding: 0 16px;
`;

export type PathNodeKey = string | number;

export type FileIcons = Record<string, React.ReactNode>;

export type PathNode = {
  id: PathNodeKey;
  name: string;
  children?: PathNode[];
};

type PathProps = {
  color?: string;
  selectedColor?: string;
  folderIcon?: React.ReactNode;
  fileIcons?: FileIcons;
  items: PathNode[];
  selectedKey: PathNodeKey;
  openKeys: PathNodeKey[];
  disabled?: (item: PathNode) => boolean;
  onExpand?: (keys: PathNodeKey[], key: PathNodeKey, item: PathNode) => void;
  onSelect?: (key: PathNodeKey, item: PathNode) => void;
};

/**
 * @title 路径
 * @param {React.ReactNode} folderIcon 文件夹图标
 * @param {FileIcons} fileIcons 文件图标
 * @param {PathNode[]} items 路径数据
 * @param {PathNodeKey} selectedKey 选中文件主键
 * @param {PathNodeKey[]} openKeys 打开文件夹列表
 */
const Path: React.FC<PathProps> = ({
  items,
  selectedKey,
  openKeys,
  disabled,
  onExpand,
  onSelect,
}) => {
  let render = null;

  const deepGenterRender = (items: any, level: number) => {
    const childrenRender = [];
    for (let i = 0, j = items.length; i < j; i++) {
      const disabledPath = !!disabled && disabled(items[i]);

      if (items[i].children) {
        childrenRender.push(
          <Folder
            name={items[i].name}
            icon={<AiOutlineFolder size={18} />}
            level={level}
            disabled={disabledPath}
            expand={openKeys.includes(items[i].id)}
            onClick={() => {
              onExpand &&
                onExpand(
                  openKeys.includes(items[i].id)
                    ? openKeys.filter((item) => item !== items[i].id)
                    : [...openKeys, items[i].id],
                  items[i].id,
                  items[i]
                );
            }}
          >
            {deepGenterRender(items[i].children, level + 1)}
          </Folder>
        );
      } else {
        childrenRender.push(
          <File
            name={items[i].name}
            icon={<AiOutlineFileMarkdown size={18} />}
            level={level}
            disabled={disabledPath}
            selected={selectedKey === items[i].id}
            onClick={() => {
              onSelect && onSelect(items[i].id, items[i]);
            }}
          />
        );
      }
    }
    return childrenRender.map((item, index) => (
      <Fragment key={index}>{item}</Fragment>
    ));
  };

  render = deepGenterRender(items, 1);

  return <PathRoot>{render}</PathRoot>;
};

export default Path;
