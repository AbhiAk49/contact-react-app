import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  FormLabel,
  Switch,
  List,
  Heading,
  Link,
  Flex,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import ContactCard from "./ContactCard";
import withRouterParamsHook from "./HOC/withRouterParams"; //used for params and query vals

// const defaultContacts = [
//   { id: "1", name: "Tom", email: "tom1@gmail.com", starred: true },
//   { id: "2", name: "Max", email: "max2@gmail.com", starred: true },
//   { id: "3", name: "Caroline", email: "caroline1@gmail.com", starred: false },
// ];
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
  const [, /*URLSearchParams*/ setSearchParams] = props.search;
  const [contactListState, updateContactListState] = useState({
    showStarred: props.onlyFav,
  });

  useEffect(() => {
    if (contactListState.showStarred) {
      setSearchParams({ fav_only: "true" });
      //updateContactListState({ showStarred: true });
    } else {
      // updateContactListState({ showStarred: false });
      setSearchParams({ fav_only: "false" });
    }
  }, [contactListState.showStarred, setSearchParams]);
  //console.log("props in ContactList function", props);

  const toggleFavHandler = (showStarred) => {
    setSearchParams({
      fav_only: !contactListState.showStarred ? "true" : "false",
    });
    props.toggleOnlyFav(!showStarred);
  };
  return (
    <List spacing={4}>
      <Container
        // css properties must be camelCased
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <Heading size="lg">Contact List </Heading>
        <Flex align="center">
          <FormLabel> Show Favourites</FormLabel>
          <Switch
            style={{ marginRight: "10px" }}
            isChecked={contactListState.showStarred}
            onChange={() => {
              updateContactListState({
                showStarred: !contactListState.showStarred,
              });
              toggleFavHandler(contactListState.showStarred);
            }}
          />
          <Link as={ReachLink} to="/contact">
            <Button colorScheme="green"> Add Contact </Button>
          </Link>
        </Flex>
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

export default withRouterParamsHook(ContactList);
