import React from "react";
import { List } from "semantic-ui-react";
import ContactCard from "./ContactCard";

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
  return (
    <List divided verticalAlign="middle">
      <h2>Contact List</h2>
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
