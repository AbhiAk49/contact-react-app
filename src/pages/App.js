import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme, Container } from "@chakra-ui/react";
import "../styles/App.css";
import Header from "../components/Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import NotFound from "../components/NotFound";
import AuthFormLogin from "../components/AuthFormLogin";
import AuthFormRegister from "../components/AuthFormRegister";
import { ToastContainer } from "react-toastify";
import { AuthorizeUser } from "../middlewares/auth";
import ErrorBoundary from "../components/HOC/errorBoundary";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <AuthFormLogin />,
  },
  {
    path: "/auth/register",
    element: <AuthFormRegister />,
  },
  {
    path: "/",
    element: (
      <AuthorizeUser>
        <ContactList />
      </AuthorizeUser>
    ),
  },
  {
    path: "/contact",
    element: (
      <AuthorizeUser>
        <AddContact />
      </AuthorizeUser>
    ),
  },
  {
    path: "/contact/:id",
    element: (
      <AuthorizeUser>
        <AddContact />
      </AuthorizeUser>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  };

  const theme = extendTheme({ colors });
  return (
    <ErrorBoundary>
      <ChakraProvider resetCSS={true} theme={theme}>
        <Header />
        <Container>
          <RouterProvider router={router}></RouterProvider>
        </Container>
        <ToastContainer />
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default App;
