import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ChakraProvider,
  extendTheme,
  Container,
  Skeleton,
} from "@chakra-ui/react";
import "../styles/App.css";
import Header from "../components/Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import NotFound from "./NotFound";
import OAuthError from "./OAuthError";
import AuthFormLogin from "../components/AuthFormLogin";
import AuthFormRegister from "../components/AuthFormRegister";
import { ToastContainer } from "react-toastify";
import { AuthorizeUser } from "../middlewares/auth";
import ErrorBoundary from "../components/HOC/errorBoundary";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "../redux/reducers/auth/selector";
import { fetchUserData } from "../redux/actions/auth";
import { useEffect } from "react";

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
    path: "/oauth/error",
    element: <OAuthError />,
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
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
  const authLoading = authState?.is_loading;
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);
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
        <Skeleton
          isLoaded={!authLoading}
          height={"100vh"}
          fitContent={false}
          overflowY={"hidden"}
          speed={1.6}
        >
          <Header />
          <Container>
            <RouterProvider router={router}></RouterProvider>
          </Container>
        </Skeleton>
        <ToastContainer />
      </ChakraProvider>
    </ErrorBoundary>
  );
}

export default App;
