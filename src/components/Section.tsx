import React from "react";
import styled from "styled-components";
import { AiOutlineHolder } from "react-icons/ai";

const SectionItemRoot = styled.div``;

const SectionItemIcon = styled.div``;

const SectionItemLabel = styled.div``;

type SectionItemProps = {
  children: string;
  drag?: boolean;
};

const SectionItem: React.FC<SectionItemProps> = ({ children }) => {
  return (
    <SectionItemRoot>
      <SectionItemIcon>
        <AiOutlineHolder />
      </SectionItemIcon>
      <SectionItemLabel>{children}</SectionItemLabel>
    </SectionItemRoot>
  );
};

const SectionRoot = styled.div``;

type SectionProps = {
  items: any[];
};

const Section: React.FC<SectionProps> = ({ items }) => {
  return (
    <SectionRoot>
      {items.map((item) => (
        <SectionItem>{item.label}</SectionItem>
      ))}
    </SectionRoot>
  );
};

export default Section;
