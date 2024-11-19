import { useDrag, useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Layer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const ItemType = {
  CARD: "card",
};

interface IDraggableCardProps {
  toDo: string;
  index: number;
  onDragEnd: (args: IDrag) => void;
}

interface IDroppableBoardProps {
  toDos: string[];
  setToDos: React.Dispatch<React.SetStateAction<string[]>>;
}

interface IDrag {
  fromIndex: number;
  toIndex: number;
}

function DraggableCard({ toDo, index, onDragEnd }: IDraggableCardProps) {
  const [, drag] = useDrag({
    type: ItemType.CARD,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    drop(item: { index: number }) {
      if (item.index !== index) {
        onDragEnd({ fromIndex: item.index, toIndex: index });
      }
    },
  });

  return (
    <Card ref={(node) => drag(drop(node))}>
      {toDo}
    </Card>
  );
}

function DroppableBoard({ toDos, setToDos }: IDroppableBoardProps) {
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

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  return (
    <Wrapper>
      <Layer>
        <DroppableBoard toDos={toDos} setToDos={setToDos} />
      </Layer>
    </Wrapper>
  );
}

export default App;
