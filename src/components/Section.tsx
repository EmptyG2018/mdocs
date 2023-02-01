import React, { forwardRef } from "react";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlineHolder } from "react-icons/ai";
import styled from "styled-components";

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
  prefixIcon?: React.ReactNode;
  checked?: boolean;
  onClick?: () => void;
};

const SectionItem: React.FC<SectionItemProps> = forwardRef(
  ({ prefixIcon, title, checked, onClick, ...rest }, ref) => {
    return (
      <SectionItemRoot ref={ref} checked={checked} {...rest} onClick={onClick}>
        {prefixIcon}
        <SectionItemLabel>{title}</SectionItemLabel>
      </SectionItemRoot>
    );
  }
);

const reorder = (list: SectionItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SectionRoot = styled.div`
  padding: 16px 20px;
`;

export type SectionItemKey = string;

export type SectionItem = {
  id: SectionItemKey;
  label: string;
  content: string;
};

type SectionProps = {
  selectedKey?: SectionItemKey;
  drag?: boolean;
  items: SectionItem[];
  onDragEnd?: (items: SectionItem[]) => void;
  onChange?: (itemKey: SectionItemKey, item: SectionItem) => void;
};

const Section: React.FC<SectionProps> = ({
  drag,
  selectedKey,
  items,
  onDragEnd,
  onChange,
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    onDragEnd && onDragEnd(reorderedItems);
  };

  const handleItemClick = (item: SectionItem) => {
    if (item.id !== selectedKey) {
      onChange && onChange(item.id, item);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <SectionRoot {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
                isDragDisabled={!drag}
              >
                {(provided) => (
                  <SectionItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    checked={item.id === selectedKey}
                    title={item.label}
                    prefixIcon={<SectionItemIcon />}
                    onClick={() => handleItemClick(item)}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </SectionRoot>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Section;
