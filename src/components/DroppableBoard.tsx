import styled from "styled-components";
import { IBoard, ICard, ItemType } from "../atoms";
import { useDrag, useDrop } from "react-dnd";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";

const Board = styled.div<{ $isDragging: boolean }>`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.$isDragging ? "#e4f2ff" : props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: move;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size:18px;
  display: flex;
  justify-content: space-between;
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

interface IDroppableBoardProps {
  toDos: ICard[];
  setToDos: React.Dispatch<React.SetStateAction<IBoard[]>>;
  boardId: number;
  boardText: string;
  allBoards: IBoard;
}

interface IForm {
    toDo: string;
}

function DroppableBoard({ toDos, setToDos, boardId, boardText, allBoards }: IDroppableBoardProps) {
    const onDragEnd = ({ fromIndex, toIndex, sourceId, targetId }: IDrag) => {
        if (sourceId === targetId) {
            // 같은 보드 내 카드 간 이동
            setToDos((allBoards) => {
                const boardCopy = [...allBoards];
                const targetBoardIndex = boardCopy.findIndex((board) => {
                    return board.id === sourceId;
                });
                const targetBoard = boardCopy[targetBoardIndex];
                const cardsCopy = [...targetBoard.cards];
                
                // 카드 이동 처리
                const [moveCard] = cardsCopy.splice(fromIndex, 1);
                cardsCopy.splice(toIndex, 0, moveCard);

                // 보드 업데이트
                boardCopy[targetBoardIndex] = {
                    ...targetBoard,
                    cards: cardsCopy,
                };
                
                return boardCopy;
            });
        } else {
            setToDos((allBoards) => {
                const boardCopy = [...allBoards];

                const sourceBoardIndex = boardCopy.findIndex((board) => {
                    return board.id === sourceId;
                });
                const targetBoardIndex = boardCopy.findIndex((board) => {
                    return board.id === targetId;
                });

                const sourceBoard = boardCopy[sourceBoardIndex];
                const targetBoard = boardCopy[targetBoardIndex];

                // source 보드의 카드 복사 및 이동할 카드 추출
                const sourceCardsCopy = [...sourceBoard.cards];
                const [moveCard] = sourceCardsCopy.splice(fromIndex, 1);

                // target 보드의 카드 복사 및 이동할 카드 추가
                const targetCardsCopy = [...targetBoard.cards];
                targetCardsCopy.splice(toIndex, 0, moveCard);

                // 수정된 보드 반영
                boardCopy[sourceBoardIndex] = {
                    ...sourceBoard,
                    cards: sourceCardsCopy,
                };

                boardCopy[targetBoardIndex] = {
                    ...targetBoard,
                    cards: targetCardsCopy,
                }
                
                return boardCopy;
            });
        }
    };
    
    const [{ isDragging }, drag] = useDrag({
        type: ItemType.BOARD,
        item: { boardId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropCard] = useDrop({
        accept: ItemType.CARD,
        drop(item: { index: number, boardId: number }) {
            const index = allBoards.cards.length;
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

    const [, dropBoard] = useDrop({
        accept: ItemType.BOARD,
        drop(item: { boardId: number }) {
            // 보드 이동
            const sourceId = item.boardId;
            const targetId = boardId;

            if (sourceId !== targetId) {
                setToDos((boards) => {
                    const boardsCopy = [...boards];

                    const sourceBoardIndex = boardsCopy.findIndex((board) => {
                        return board.id === sourceId;
                    });
                    const targetBoardIndex = boardsCopy.findIndex((board) => {
                        return board.id === targetId;
                    });

                    const [moveBoard] = boardsCopy.splice(sourceBoardIndex, 1);
                    boardsCopy.splice(targetBoardIndex, 0, moveBoard);

                    return boardsCopy;
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
            const boardsCopy = [...allBoards];
            const boardIndex = allBoards.findIndex((board) => {
                return board.id === boardId;
            });
            const boardCopy = {
                ...allBoards[boardIndex],
                cards: [...boardsCopy[boardIndex].cards, newToDo],
            };
            boardsCopy[boardIndex] = boardCopy;

            return boardsCopy;
        });
        setValue("toDo", "");
    };

    const onClickDelBtn = () => {
        setToDos((allBoards) => {
            return allBoards.filter((board) => {
                return board.id !== boardId;
            });
        });
    };

    return (
        <Board $isDragging={isDragging} ref={(node) => {
            drag(node);
            dropCard(node);
            dropBoard(node);
        }}>
            <Title>
                {boardText}
                <DelBtn onClick={onClickDelBtn}>x</DelBtn>
            </Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input 
                    {...register("toDo", { required: true })} 
                    type="text" 
                    placeholder="+"
                />
            </Form>
            {
                toDos.map((toDo, index) => (
                    <DraggableCard key={toDo.id} index={index} boardId={boardId} boardText={boardText} toDoId={toDo.id} toDoText={toDo.text} onDragEnd={onDragEnd} />
                ))
            }
        </Board>
    );
}

export default DroppableBoard;