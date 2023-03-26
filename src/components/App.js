import React, { useState, useEffect } from "react";
//useState react hook --> use to add state variable to component
//useEffect react hook --> lets us synchronize the component with external system like db, localstorage, api's etc depending on a source
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//domrouterv5 to v6 changes: https://blog.logrocket.com/migrating-react-router-v6-guide/#migrating-react-router-v6

// useEffext Imp : https://react.dev/reference/react/useEffect
import "./App.css";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import NotFound from "./NotFound";
import { Container } from "semantic-ui-react";
import { v4 } from "uuid";
function App() {
  //useState func returns a value to be used in state, and the method to update the stateful variable;
  //passing [] empty array in contacts default value;
  //useState hook used only in functional component
  //only use the update method returned by useState to update the state

  const LOCAL_STORAGE_CONTACTS_KEY = "__ra-contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)) ?? []
  );
  //will be passing a function to handle addContact as prop
  const addOrEditContactHandler = (contact) => {
    if (contact.id) {
      const newContactList = contacts.map((c) => {
        if (c.id === contact.id) {
          return { ...contact };
        }
        return c;
      });
      setContacts(newContactList);
    } else {
      setContacts([...contacts, { ...contact, id: v4() }]);
    }
  };

  //updatingAction on contact(fav/del)

  const updateContactActionHandler = (action, id) => {
    //console.log("In updateContactActionHandler App", action, id);
    switch (action) {
      case "delete": {
        const newContactList = contacts.filter((c) => c.id !== id);
        setContacts(newContactList);
        break;
      }
      case "favorite": {
        const newContactList = contacts.map((c) => {
          if (c.id === id) {
            return { ...c, starred: true };
          }
          return c;
        });
        setContacts(newContactList);
        break;
      }
      case "unfavorite": {
        const newContactList = contacts.map((c) => {
          if (c.id === id) {
            return { ...c, starred: false };
          }
          return c;
        });
        setContacts(newContactList);
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
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  //!Not required/ supported empty array as of v18
  //fetching the stored contacts from localstorage -- empty array of dependencies
  // useEffect(() => {
  //   const existingContacts = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)
  //   );
  //   if (existingContacts) setContacts(existingContacts);
  // }, []);

  return (
    <div>
      <Header />
      <Container>
        <Router>
          <Routes>
            {/* Old v5 react-router-dom uses Switch instead ot Routes and Route had component as paramenter or render func instead of now element */}
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
                />
              }
            ></Route>
            <Route
              path="/add"
              // render={(props) => (
              //   <AddContact {...props} addOrEditContactHandler={addOrEditContactHandler} />
              // )}
              //v6 way
              element={
                <AddContact addOrEditContactHandler={addOrEditContactHandler} />
              }
            ></Route>
            <Route
              path="/contact/:id"
              element={
                <AddContact addOrEditContactHandler={addOrEditContactHandler} />
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
    </div>
  );
}

export default App;
