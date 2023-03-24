import React from "react";
import { Container, List, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
const defaultContacts = [
  { id: "1", name: "Tom", email: "tom1@gmail.com", starred: true },
  { id: "2", name: "Max", email: "max2@gmail.com", starred: true },
  { id: "3", name: "Caroline", email: "caroline1@gmail.com", starred: false },
];
const renderContactList = (contacts, updateContactAction) => {
  const contactActionHadler = (action, id) => {
    //console.log("in contact list contactActionHadler", action, id);
    updateContactAction(action, id);
  };
  return contacts.map((c) => {
    //each item in list should have key
    return (
      <ContactCard
        contact={c}
        key={c.id}
        onContactActionUpdate={contactActionHadler}
      ></ContactCard>
    );
  });
};

//function component syntax
const ContactList = (props) => {
  //console.log("props in ContactList function", props);
  //const contacts = props.contacts ?? defaultContacts;
  return (
    <List divided verticalAlign="middle">
      <Container
        fluid
        // css properties must be camelCased
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <h2>Contact List</h2>{" "}
        <Link to="/add">
          <Button color="green"> Add Contact </Button>
        </Link>
      </Container>
      {renderContactList(props.contacts, props.updateContactAction)}
    </List>
  );
};

//class component syntax
// class ContactList extends React.Component {
//   render() {
//     //console.log("props in ContactList class", this.props);
//     return (
//       <List>
//         <h2>Contact List</h2>
//         {renderContactList(this.props.contacts)}
//       </List>
//     );
//   }
// }

export default ContactList;
