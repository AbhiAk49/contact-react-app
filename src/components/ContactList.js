import React, { useState } from "react";
import { Container, List, Button, Checkbox } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const defaultContacts = [
  { id: "1", name: "Tom", email: "tom1@gmail.com", starred: true },
  { id: "2", name: "Max", email: "max2@gmail.com", starred: true },
  { id: "3", name: "Caroline", email: "caroline1@gmail.com", starred: false },
];
const renderContactList = (
  contacts = [],
  updateContactAction,
  showOnlyStarred = false
) => {
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
        showOnlyStarred={showOnlyStarred}
      ></ContactCard>
    );
  });
};

//function component syntax
const ContactList = (props) => {
  //{showStarred ? "true" : "false"} --> showStarred directly in jsx element is not working
  const [contactListState, updateContactListState] = useState({
    showStarred: false,
  });
  //console.log("props in ContactList function", props);

  const toggleFavHandler = (showStarred) => {
    props.toggleFav(showStarred);
  };
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
        <h2>Contact List </h2>
        <div>
          <Checkbox
            toggle
            label="Show Favourites"
            style={{ marginRight: "10px" }}
            checked={contactListState.showStarred}
            onChange={() => {
              updateContactListState({
                showStarred: !contactListState.showStarred,
              });
              toggleFavHandler(!contactListState.showStarred);
            }}
          />
          <Link to="/add">
            <Button color="green"> Add Contact </Button>
          </Link>
        </div>
      </Container>
      {renderContactList(
        props.contacts,
        props.updateContactAction,
        contactListState.showStarred
      )}
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
