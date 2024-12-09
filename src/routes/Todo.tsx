import styled from "styled-components";
import DroppableBoard from "../components/DroppableBoard";
import { useRecoilState } from "recoil";
import { toDoState } from "../recoil/todoAtom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ICategory, useTemplateCategoriesQuery } from "../hooks/useTemplate";

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  color: white;
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

function Todo() {
    const { templateId } = useParams();

    const { data, isLoading, isError, error } = useTemplateCategoriesQuery(templateId ? +templateId : 0);
    const [toDos, setToDos] = useRecoilState(toDoState);
    useEffect(() => {
        if (data?.templateCategories) {
            const categories = data.templateCategories.map((category: ICategory) => {
                return {
                    id: category.categoryId,
                    text: category.categoryName,
                    cards: [],
                };
            });
            setToDos(categories);
        } else {
            setToDos([]);
        }
    }, [data, setToDos]);

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
    
    if (!templateId) {
        return (
            <Wrapper>
                <Title>잘못된 접근입니다.</Title>
            </Wrapper>
        );
    }

    if (isError) {
        return (
            <Wrapper>
                <Title>{error?.message}</Title>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {
                isLoading ? (
                    <Title>Loading...</Title>
                ) : (
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
                )
            }
        </Wrapper>
    );
}

export default Todo;
