import React, { cloneElement } from "react";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const reorder = (list: SectionItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const SectionRoot = styled.div`
  width: 100%;
`;

export type SectionItemKey = string;

export type SectionItem = {
  id: SectionItemKey;
  label: string;
  content: string;
};

type SectionProps = {
  multiple?: boolean;
  selectedKeys: SectionItemKey[];
  drag?: boolean;
  items: SectionItem[];
  onDragEnd?: (items: SectionItem[]) => void;
  onChange?: (
    selectedKeys: SectionItemKey[],
    itemKey: SectionItemKey,
    item: SectionItem
  ) => void;
  children: (item: SectionItem, drag?: boolean) => React.ReactElement;
};

const Section: React.FC<SectionProps> = ({
  multiple,
  drag,
  selectedKeys,
  items,
  onDragEnd,
  onChange,
  children,
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
    onChange &&
      onChange(
        !multiple
          ? [item.id]
          : selectedKeys.includes(item.id)
          ? selectedKeys.filter((key) => key !== item.id)
          : [...selectedKeys, ...item.id],
        item.id,
        item
      );
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
                {(provided) =>
                  cloneElement(children(item, drag), {
                    ref: provided.innerRef,
                    ...provided.draggableProps,
                    ...provided.dragHandleProps,
                    checked: selectedKeys.includes(item.id),
                    onClick: () => handleItemClick(item),
                  })
                }
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
