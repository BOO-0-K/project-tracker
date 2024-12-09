import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./routes/Login";
import styled from "styled-components";
import Todo from "./routes/Todo";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute>
      <Layout />
    </ProtectedRoute>),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "todo/:templateId",
        element: <Todo />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
],
{
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }
});

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <>
      <Wrapper>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Wrapper>
    </>
  );
}

export default App;