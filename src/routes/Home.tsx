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

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  color: white;
`;

function Home() {
  return (
    <Wrapper>
      <Title>좌측 템플릿을 선택해주세요.</Title>
    </Wrapper>
  );
}

export default Home;