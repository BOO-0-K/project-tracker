import styled from "styled-components";
import { ItemType, IToDoState } from "../atoms";
import { useDrop } from "react-dnd";
import DraggableCard from "./DraggableCard";

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size:18px;
`;

interface IDrag {
    fromIndex: number;
    toIndex: number;
    sourceId: string;
    targetId: string;
}

interface IDroppableBoardProps {
  toDos: string[];
  setToDos: React.Dispatch<React.SetStateAction<IToDoState>>;
  boardId: string;
  allBoards: IToDoState;
}

function DroppableBoard({ toDos, setToDos, boardId, allBoards }: IDroppableBoardProps) {
    const onDragEnd = ({ fromIndex, toIndex, sourceId, targetId }: IDrag) => {
        if (sourceId === targetId) {
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[sourceId]];
                const [draggableId] = boardCopy.splice(fromIndex, 1);
                boardCopy.splice(toIndex, 0, draggableId);
                return {
                  ...allBoards,
                  [sourceId]: boardCopy,
                };
            });
        } else {
            setToDos((allBoards) => {
              const sourceBoard = [...allBoards[sourceId]];
              const targetBoard = [...allBoards[targetId]];
              const [draggableId] = sourceBoard.splice(fromIndex, 1);
              targetBoard.splice(toIndex, 0, draggableId);
              return {
                ...allBoards,
                [sourceId]: sourceBoard,
                [targetId]: targetBoard,
              };
            });
        }
    };
    
    const [, drop] = useDrop({
        accept: ItemType.CARD,
        drop(item: { index: number, boardId: string }) {
            const index = allBoards[boardId].length;
            if (index === 0) {
              onDragEnd({ 
                  fromIndex: 
                  item.index, 
                  toIndex: index, 
                  sourceId: item.boardId, 
                  targetId: boardId, 
              });
            }
        },
    });
    
    return (
        <Board ref={drop}>
            <Title>{boardId}</Title>
            {
                toDos.map((toDo, index) => (
                    <DraggableCard key={index} toDo={toDo} index={index} boardId={boardId} onDragEnd={onDragEnd} />
                ))
            }
        </Board>
    );
}

export default DroppableBoard;