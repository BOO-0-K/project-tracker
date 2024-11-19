import styled from "styled-components";
import DroppableBoard from "./components/DroppableBoard";

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

function App() {

  return (
    <Wrapper>
      <Layer>
        <DroppableBoard />
      </Layer>
    </Wrapper>
  );
}

export default App;
