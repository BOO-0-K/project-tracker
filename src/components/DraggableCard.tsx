import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";
import { ItemType, toDoState } from "../recoil/todoAtom";
import React from "react";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
    &:last-child {
        flex-grow: 1;
    }
`;

const Card = styled.div<{ $isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => props.$isDragging ? "#e4f2ff" : props.theme.cardColor};
  cursor: move;
  display: flex;
  justify-content: space-between;
`;

const DelBtn = styled.span`
    color: tomato;
    font-weight: 600;
    cursor: pointer;
`;

interface IDrag {
    fromIndex: number;
    toIndex: number;
    sourceId: number;
    targetId: number;
}

interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: number;
    boardText: string;
    onDragEnd: (args: IDrag) => void;
}

function DraggableCard({ toDoId, toDoText, index, boardId, boardText, onDragEnd }: IDraggableCardProps) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType.CARD,
        item: { index, boardId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
      const [, drop] = useDrop({
        accept: ItemType.CARD,
        drop(item: { index: number, boardId: number }) {
            onDragEnd({ 
                fromIndex: 
                item.index, 
                toIndex: index, 
                sourceId: item.boardId, 
                targetId: boardId, 
            });
        },
    });
    
    const setToDos = useSetRecoilState(toDoState);
    const onClickDelBtn = () => {
        setToDos((allBoards) => {
            const boardsCopy = [...allBoards];
            const boardIndex = boardsCopy.findIndex((board) => {
                return board.id === boardId;
            });
            const boardCopy = { ...allBoards[boardIndex] };
            boardCopy.cards = boardCopy.cards.filter((card) => {
                return card.id !== toDoId;
            })
            boardsCopy[boardIndex] = boardCopy;
            return boardsCopy;
        });
    };

    return (
        <Wrapper ref={drop}>
            <Card ref={drag} $isDragging={isDragging}>
                {toDoText}
                <DelBtn onClick={onClickDelBtn}>x</DelBtn>
            </Card>
        </Wrapper>
    );
}

export default React.memo(DraggableCard);