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

const Board = styled.div`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  grid-column: 1 / 4;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
        font-size: 16px;
        border: 0;
        background-color: white;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto;
    }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  return (
    <Wrapper>
      <Layer>
        <Board>
          <Form>
            <input
                type="text" 
                placeholder="+"
            />
          </Form>
        </Board>
        {
          Object.keys(toDos).map(boardId => <DroppableBoard key={boardId} toDos={toDos[boardId]} setToDos={setToDos} boardId={boardId} allBoards={toDos} />)
        }
      </Layer>
    </Wrapper>
  );
}

export default App;
