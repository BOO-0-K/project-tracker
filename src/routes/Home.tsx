import styled from "styled-components";
import DroppableBoard from "../components/DroppableBoard";
import { useRecoilState } from "recoil";
import { toDoState } from "../recoil/todoAtom";
import { useForm } from "react-hook-form";

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

interface IForm {
  board: string;
}

function Home() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({board}: IForm) => {
    const newBoard = {
      id: Date.now(),
      text: board,
      cards: [],
    };
    setToDos(allBoards => {
      return [...allBoards, newBoard];
    });
    setValue("board", "");
  };
  
  return (
    <Wrapper>
      <Layer>
        <Board>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
                {...register("board", { required: true })}
                type="text" 
                placeholder="+"
            />
          </Form>
        </Board>
        {
          toDos.map(board => <DroppableBoard key={board.id} toDos={board.cards} setToDos={setToDos} boardId={board.id} boardText={board.text} allBoards={board} />)
        }
      </Layer>
    </Wrapper>
  );
}

export default Home;
