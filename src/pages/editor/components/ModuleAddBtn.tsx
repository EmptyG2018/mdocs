import React from "react";
import styled from "styled-components";

const ModuleAddBtnRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
  background-color: #192230;
  color: #8e98a3;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  user-select: none;
  border: 2px solid #192230;
  gap: 6px;
  &:hover {
    color: #0351ff;
    border-color: #0351ff;
  }
`;

const ModuleAddBtnIcon = styled.span`
  line-height: 1;
`;

const ModuleAddBtnDesc = styled.span`
`;

type ModuleAddBtnProps = {
  icon: React.ReactNode;
  desc: string;
  onClick?: () => void;
};

const SectionBtn: React.FC<ModuleAddBtnProps> = ({ icon, desc, onClick }) => {
  return (
    <ModuleAddBtnRoot onClick={onClick}>
      <ModuleAddBtnIcon>{icon}</ModuleAddBtnIcon>
      <ModuleAddBtnDesc>{desc}</ModuleAddBtnDesc>
    </ModuleAddBtnRoot>
  );
};

export default SectionBtn;
