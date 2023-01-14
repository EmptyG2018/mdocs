import React from "react";
import styled from "styled-components";
import { AiOutlineHolder } from "react-icons/ai";

const SectionItemRoot = styled.div<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 12px;
  background-color: ${(props) => (props.checked ? "#0351ff" : "#192230")};
  color: ${(props) => (props.checked ? "#fff" : "#8e98a3")};
  border-radius: 6px;
  margin-bottom: 16px;
  font-weight: 600;
`;

const SectionItemIcon = styled(AiOutlineHolder)`
  margin-right: 8px;
`;

const SectionItemLabel = styled.div``;

type SectionItemProps = {
  title: string;
  drag?: boolean;
  checked?: boolean;
};

const SectionItem: React.FC<SectionItemProps> = ({ title, checked }) => {
  return (
    <SectionItemRoot checked={checked}>
      <SectionItemIcon />
      <SectionItemLabel>{title}</SectionItemLabel>
    </SectionItemRoot>
  );
};

const SectionRoot = styled.div`
  padding: 16px 20px;
`;

type SectionProps = {
  value?: string | number;
  items: any[];
};

const Section: React.FC<SectionProps> = ({ value, items }) => {
  return (
    <SectionRoot>
      {items.map((item) => (
        <SectionItem checked={item.value === value} title={item.label} />
      ))}
    </SectionRoot>
  );
};

export default Section;
