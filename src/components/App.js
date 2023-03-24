import React, { useState, useEffect } from "react";
//useState react hook --> use to add state variable to component
//useEffect react hook --> lets us synchronize the component with external system like db, localstorage, api's etc depending on a source

// useEffext Imp : https://react.dev/reference/react/useEffect
import "./App.css";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import { Container } from "semantic-ui-react";
import { v4 } from "uuid";
const defaultContacts = [
  { id: "1", name: "Tom", email: "tom1@gmail.com", starred: true },
  { id: "2", name: "Max", email: "max2@gmail.com", starred: true },
  { id: "3", name: "Caroline", email: "caroline1@gmail.com", starred: false },
];
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
  const addContactHandler = (contact) => {
    //console.log("In addContactHandler App", contact);
    setContacts([...contacts, { ...contact, id: v4() }]);
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
        <AddContact addContactHandler={addContactHandler} />
        <ContactList
          contacts={contacts}
          updateContactAction={updateContactActionHandler}
        />
      </Container>
    </div>
  );
}

export default App;
