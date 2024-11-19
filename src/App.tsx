import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

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

const toDos = ["a", "b", "c", "d", "e", "f"];

const ItemType = {
  CARD: "card",
};

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

interface IDroppableBoardProps {
  toDos: string[];
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  const [_, ref] = useDrag({
    type: ItemType.CARD,
    item: { index },
  });

  return (
    <Card ref={ref}>
      {toDo}
    </Card>
  );
}

function DroppableBoard({ toDos }: IDroppableBoardProps) {
  const [_, ref] = useDrop({
    accept: ItemType.CARD,
  });

  return (
    <Board ref={ref}>
      {
        toDos.map((toDo, index) => (
          <DraggableCard key={index} toDo={toDo} index={index} />
        ))
      }
    </Board>
  );
}

function App() {
  return (
    <Wrapper>
      <Layer>
        <DroppableBoard toDos={toDos} />
      </Layer>
    </Wrapper>
  );
}

export default App;
