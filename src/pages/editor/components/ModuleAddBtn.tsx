import React from "react";
import styled from "styled-components";

const ModuleAddBtnRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 12px;
  background-color: #192230;
  color: #8e98a3;
  border-radius: 6px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  user-select: none;
  border: 2px solid #192230;
  &:hover {
    color: #0351ff;
    background-color: #b9cfff;
  }
`;

const ModuleAddBtnIcon = styled.div``;

const ModuleAddBtnDesc = styled.span`
  margin-top: 4px;
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
