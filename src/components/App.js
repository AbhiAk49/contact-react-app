import React, { useState, useEffect, useCallback } from "react";
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
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../services/contact.service";

import { ToastContainer } from "react-toastify";

function App() {
  //useState func returns a value to be used in state, and the method to update the stateful variable;
  //passing [] empty array in contacts default value;
  //useState hook used only in functional component
  //only use the update method returned by useState to update the state

  //const LOCAL_STORAGE_CONTACTS_KEY = "__ra-contacts";
  const [contacts, setContacts] = useState([]);
  const [onlyFav, setOnlyFav] = useState(false);
  //const [showFav, setShowFav] = useState(false);
  const toggleOnlyFav = async (showStarred) => {
    const contactsFetched = await fetchContactList(showStarred);
    setContacts(contactsFetched);
    setOnlyFav(showStarred);
  };
  const fetchContactList = useCallback(async (showStarred) => {
    const response = await getContacts(showStarred);
    return response;
  }, []);

  const updateAndFetchContacts = async (contact) => {
    const id = contact.id;
    delete contact.id;
    delete contact.created_by;
    const response = await updateContact(id, contact);
    if (response && response.id) {
      const contactsFetched = await fetchContactList(onlyFav);
      setContacts(contactsFetched);
    }
  };

  const deleteAndFetchContacts = async (id) => {
    const response = await deleteContact(id);
    if (response && response.id) {
      const contactsFetched = await fetchContactList(onlyFav);
      setContacts(contactsFetched);
    }
  };

  //will be passing a function to handle addContact as prop
  const addOrEditContactHandler = async (contact) => {
    if (contact.id) {
      //updating contact
      updateAndFetchContacts(contact);
    } else {
      //adding contact
      const response = await addContact(contact);
      if (response && response.id) {
        const contactsFetched = await fetchContactList(onlyFav);
        setContacts(contactsFetched);
      }
    }
  };

  //updatingAction on contact(fav/del)

  const updateContactActionHandler = (action, id) => {
    switch (action) {
      case "delete": {
        deleteAndFetchContacts(id);
        break;
      }
      case "favorite": {
        const contact = contacts.find((c) => c.id === id);
        contact["starred"] = true;
        updateAndFetchContacts(contact);
        break;
      }
      case "unfavorite": {
        const contact = contacts.find((c) => c.id === id);
        contact["starred"] = false;
        updateAndFetchContacts(contact);
        break;
      }
      default: {
        console.error("invalid contact action");
      }
    }
  };

  //useEffect can only be used at top level of component, it only returns undefined
  //1st argument takes a callback function that gets called when the list dependecies (2nd argument) gets changed

  //updating localstorage contacts when contacts change
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_CONTACTS_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  //!Not required/ supported empty array as of v18
  //fetching the stored contacts from localstorage -- empty array of dependencies
  // useEffect(() => {
  //   const existingContacts = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)
  //   );
  //   if (existingContacts) setContacts(existingContacts);
  // }, []);

  //fetching the stored contacts from api
  useEffect(() => {
    let isIgnore = false;
    const getAllContacts = async () => {
      const contactsFetched = await fetchContactList(false);
      if (!isIgnore) {
        setContacts(contactsFetched);
      }
    };
    getAllContacts();
    return () => {
      isIgnore = true;
    };
  }, [fetchContactList]);

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
              {/* Old v5 react-router-dom uses Switch instead of Routes and Route had component as paramenter or render func instead of now element */}
              {/* exact is used match the exact route not the first one it matches */}
              <Route
                path="/"
                exact
                // the component approact is not preffered bcuz each time router hits this component it executes the arrow function and loads the component again even if nothing is changed ... better approach use render
                // Component={() => {
                //   return (
                //     <ContactList
                //       contacts={contacts}
                //       updateContactAction={updateContactActionHandler}
                //     />
                //   );
                // }}
                //render prop to pass prop syntax
                // render={(props) => (
                //   <ContactList
                //     {...props}
                //     contacts={contacts}
                //     updateContactAction={updateContactActionHandler}
                //   />
                // )}
                //v6 way
                element={
                  <ContactList
                    contacts={contacts}
                    updateContactAction={updateContactActionHandler}
                    toggleOnlyFav={toggleOnlyFav}
                    onlyFav={onlyFav}
                  />
                }
              ></Route>
              <Route
                path="/contact"
                // render={(props) => (
                //   <AddContact {...props} addOrEditContactHandler={addOrEditContactHandler} />
                // )}
                //v6 way
                element={
                  <AddContact
                    addOrEditContactHandler={addOrEditContactHandler}
                  />
                }
              ></Route>
              <Route
                path="/contact/:id"
                element={
                  <AddContact
                    addOrEditContactHandler={addOrEditContactHandler}
                  />
                }
              ></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Router>
          {/* <AddContact addOrEditContactHandler={addOrEditContactHandler} />
        <ContactList
          contacts={contacts}
          updateContactAction={updateContactActionHandler}
        /> */}
        </Container>
        <ToastContainer />
      </ChakraProvider>
    </div>
  );
}

export default App;
