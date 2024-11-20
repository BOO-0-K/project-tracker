import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemType } from "../atoms";
import React from "react";

const Wrapper = styled.div`
    &:last-child {
        flex-grow: 1;
    }
`;

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => props.isDragging ? "#e4f2ff" : props.theme.cardColor};
`;

interface IDrag {
    fromIndex: number;
    toIndex: number;
    sourceId: string;
    targetId: string;
}

interface IDraggableCardProps {
    toDo: string;
    index: number;
    boardId: string;
    onDragEnd: (args: IDrag) => void;
}

function DraggableCard({ toDo, index, boardId, onDragEnd }: IDraggableCardProps) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType.CARD,
        item: { index, boardId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
      const [, drop] = useDrop({
        accept: ItemType.CARD,
        drop(item: { index: number, boardId: string }) {
            onDragEnd({ 
                fromIndex: 
                item.index, 
                toIndex: index, 
                sourceId: item.boardId, 
                targetId: boardId, 
            });
        },
    });
    
    return (
        <Wrapper ref={drop}>
            <Card ref={drag} isDragging={isDragging}>
            {toDo}
            </Card>
        </Wrapper>
    );
}

export default React.memo(DraggableCard);