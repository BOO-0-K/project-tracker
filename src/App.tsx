import styled from "styled-components";
import DroppableBoard from "./components/DroppableBoard";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";

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
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  return (
    <Wrapper>
      <Layer>
        {
          Object.keys(toDos).map(boardId => <DroppableBoard key={boardId} toDos={toDos[boardId]} setToDos={setToDos} boardId={boardId} allBoards={toDos} />)
        }
      </Layer>
    </Wrapper>
  );
}

export default App;
