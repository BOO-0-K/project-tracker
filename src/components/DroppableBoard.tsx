import styled from "styled-components";
import { ItemType, toDoState } from "../atoms";
import { useDrop } from "react-dnd";
import DraggableCard from "./DraggableCard";
import { useRecoilState } from "recoil";

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

interface IDrag {
    fromIndex: number;
    toIndex: number;
}

function DroppableBoard() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onDragEnd = ({ fromIndex, toIndex }: IDrag) => {
        setToDos((oldToDos) => {
          const toDosCopy = [...oldToDos];
          const [draggableId] = toDosCopy.splice(fromIndex, 1);
          toDosCopy.splice(toIndex, 0, draggableId);
          return toDosCopy;
        });
      };
    
      const [, drop] = useDrop({
        accept: ItemType.CARD,
      });
    
      return (
        <Board ref={drop}>
          {
            toDos.map((toDo, index) => (
              <DraggableCard key={index} toDo={toDo} index={index} onDragEnd={onDragEnd} />
            ))
          }
        </Board>
      );
}

export default DroppableBoard;