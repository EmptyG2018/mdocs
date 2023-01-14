import React, { useCallback } from "react";
import styled from "styled-components";

/**
 * @title 文件夹
 */

const FolderRoot = styled.div``;

const Folder = () => {
  return <FolderRoot></FolderRoot>;
};

/**
 * @title 文件
 * @param label 标签
 * @param selected 选中
 * @param selectedColor 选中颜色
 * @param onClick 点击事件
 */
const File = () => {
  return <div></div>;
};

/**
 * @title 路径
 * @param items 路径数据
 * @param selectedKeys 选中文件列表
 * @param openKeys 打开文件夹列表
 */

const PathRoot = styled.div``;

type PathProps = {
  items: any[];
  selectedKeys: any[];
  openKeys: any[];
  onOpenChange: (keys: any[]) => void;
  onSelect: (keys: any[]) => void;
};

const Path: React.FC<PathProps> = ({ items, selectedKeys, openKeys }) => {
  const render = () => {};

  return <PathRoot></PathRoot>;
};

export default Path;
