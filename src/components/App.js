//useState react hook --> use to add state variable to component
//useEffect react hook --> lets us synchronize the component with external system like db, localstorage, api's etc depending on a source
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme, Container } from "@chakra-ui/react";

//domrouterv5 to v6 changes: https://blog.logrocket.com/migrating-react-router-v6-guide/#migrating-react-router-v6

// useEffext Imp : https://react.dev/reference/react/useEffect
import "./App.css";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import NotFound from "./NotFound";
//import { v4 } from "uuid";
import { ToastContainer } from "react-toastify";
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
    <div>
      <ChakraProvider resetCSS={true} theme={theme}>
        <Header />
        <Container>
          <Router>
            <Routes>
              <Route
                path="/"
                exact
                //v6 way
                element={<ContactList />}
              ></Route>
              <Route
                path="/contact"
                //v6 way
                element={<AddContact />}
              ></Route>
              <Route path="/contact/:id" element={<AddContact />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Router>
        </Container>
        <ToastContainer />
      </ChakraProvider>
    </div>
  );
}

export default App;
