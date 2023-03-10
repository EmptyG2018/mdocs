import React, { forwardRef, Fragment, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

const SectionItemRoot = styled.div<
  Pick<SectionItemProps, "checked" | "extendGap">
>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background-color: ${(props) => (props.checked ? "#0351ff" : "#192230")};
  color: ${(props) => (props.checked ? "#fff" : "#8e98a3")};
  border-radius: 6px;
  margin-bottom: 16px;
  font-weight: 600;
  cursor: pointer;

  ${({ extendGap }) => css`
    .section-item__extra {
      display: none;
    }

    &:hover {
      .section-item__extra {
        display: flex;
        gap: ${extendGap ? extendGap + "px" : null};
      }
    }
  `}
`;

const SectionItemPrefixIcon = styled.div`
  margin-right: 8px;
  line-height: 1;
`;

const SectionItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  flex: 1 0 auto;
  width: 0;
`;

const SectionItemLabel = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SectionItemInput = styled.input`
  width: 100%;
  height: 28px;
  margin: 0 8px;
  box-sizing: border-box;
`;

type SectionItemProps = {
  title: string;
  prefixIcon?: React.ReactNode;
  editable?: boolean;
  extend?: React.ReactNode[];
  extendGap?: number;
  checked?: boolean;
  onClick?: () => void;
  onChange?: (label: string) => void;
};

const SectionItem = forwardRef<HTMLDivElement, SectionItemProps>(
  (
    {
      prefixIcon,
      title,
      checked,
      editable,
      extend,
      extendGap = 4,
      onClick,
      onChange,
      ...rest
    },
    ref
  ) => {
    const inputEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (editable && inputEl.current) {
        inputEl.current.focus();
      }
    }, [editable]);

    return (
      <SectionItemRoot
        ref={ref}
        checked={checked}
        extendGap={extendGap}
        {...rest}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
      >
        {prefixIcon && (
          <SectionItemPrefixIcon>{prefixIcon}</SectionItemPrefixIcon>
        )}
        <SectionItemContainer>
          {editable ? (
            <SectionItemInput
              ref={inputEl}
              value={title}
              onChange={(e) => {
                onChange && onChange(e.target.value);
              }}
            />
          ) : (
            <SectionItemLabel>{title}</SectionItemLabel>
          )}
        </SectionItemContainer>
        {extend && (
          <div className="section-item__extra">
            {extend.map((item, index) => (
              <Fragment key={index}>{item}</Fragment>
            ))}
          </div>
        )}
      </SectionItemRoot>
    );
  }
);

export default SectionItem;
