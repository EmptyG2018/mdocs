import React from "react";
import styled from "styled-components";
import { ActionBtn } from "./index";

const LocaleRoot = styled.div`
  display: flex;
  gap: 12px;
`;

type LocaleKey = string | number;

type Locale = {
  icon?: React.ReactNode;
  label: string;
  value: LocaleKey;
};

type LocaleProps = {
  selected: LocaleKey;
  items: Locale[];
  onChange?: (key: LocaleKey, item: Locale) => void;
};

const Locale: React.FC<LocaleProps> = ({ selected, items, onChange }) => {
  return (
    <LocaleRoot>
      {items.map((item) => (
        <ActionBtn
          icon={item.icon}
          title={item.label}
          spaceSize={[2, 6]}
          color={item.value === selected ? "rgb(3, 81, 255)" : "#6a7c8f"}
          size={14}
          backgroundColor={
            item.value === selected ? "rgba(3, 81, 255, .2)" : "#192230"
          }
          onClick={() => {
            item.value !== selected && onChange && onChange(item.value, item);
          }}
        />
      ))}
    </LocaleRoot>
  );
};

export default Locale;