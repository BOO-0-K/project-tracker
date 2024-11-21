import styled from "styled-components";
import { ItemType, IToDo, IToDoState } from "../atoms";
import { useDrop } from "react-dnd";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";

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

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
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

interface IDrag {
    fromIndex: number;
    toIndex: number;
    sourceId: string;
    targetId: string;
}

interface IDroppableBoardProps {
  toDos: IToDo[];
  setToDos: React.Dispatch<React.SetStateAction<IToDoState>>;
  boardId: string;
  allBoards: IToDoState;
}

interface IForm {
    toDo: string;
}

function DroppableBoard({ toDos, setToDos, boardId, allBoards }: IDroppableBoardProps) {
    const onDragEnd = ({ fromIndex, toIndex, sourceId, targetId }: IDrag) => {
        if (sourceId === targetId) {
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[sourceId]];
                const taskObj = boardCopy[fromIndex];
                boardCopy.splice(fromIndex, 1);
                boardCopy.splice(toIndex, 0, taskObj);
                return {
                  ...allBoards,
                  [sourceId]: boardCopy,
                };
            });
        } else {
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[sourceId]];
                const taskObj = sourceBoard[fromIndex];
                const targetBoard = [...allBoards[targetId]];
                sourceBoard.splice(fromIndex, 1);
                targetBoard.splice(toIndex, 0, taskObj);
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
    
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({toDo}: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [
                    ...allBoards[boardId],
                    newToDo,
                ],
            }
        });
        setValue("toDo", "");
    };

    return (
        <Board ref={drop}>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input 
                    {...register("toDo", { required: true })} 
                    type="text" 
                    placeholder="+"
                />
            </Form>
            {
                toDos.map((toDo, index) => (
                    <DraggableCard key={toDo.id} index={index} boardId={boardId} toDoId={toDo.id} toDoText={toDo.text} onDragEnd={onDragEnd} />
                ))
            }
        </Board>
    );
}

export default DroppableBoard;