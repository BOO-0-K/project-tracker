import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSigninMutation } from "../hooks/useAuth";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const Title = styled.h1`
    font-size: 42px;
`;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Input = styled.input<{ $isLoading?: boolean }>`
    padding: 10px 20px;
    background-color: white;
    border-radius: 5px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
        cursor: pointer;
        opacity: ${(props) => props.$isLoading ? 0.8 : 1};
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

interface IForm {
    email: string;
    password: string;
}

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>();
    const { mutate, isPending, isError, error } = useSigninMutation();
    const onValid = (data: IForm) => {
        mutate(data);
    };

    return (
        <Wrapper>
            <Title>로그인</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input 
                    {...register("email", { 
                        required: "이메일을 입력해주세요.",
                        pattern: {
                            value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                            message: "유효한 이메일 형식이 아닙니다.",
                        },
                    })}
                    placeholder="Email" 
                    type="email"
                />
                { errors.email && <Error>{errors.email.message}</Error> }
                <Input 
                    {...register("password", { 
                        required: "비밀번호를 입력해주세요.",
                        minLength: {
                            value: 4,
                            message: "비밀번호는 4자 이상 입력해주세요.",
                        },
                    })}
                    placeholder="Password" 
                    type="password"  
                />
                { errors.password && <Error>{errors.password.message}</Error> }
                <Input 
                    type="submit"
                    value="로그인"
                    $isLoading={isPending}
                    disabled={isPending}
                />
                { isError && <Error>{error?.message}</Error> }
            </Form>
        </Wrapper>
    );
}

export default Login;