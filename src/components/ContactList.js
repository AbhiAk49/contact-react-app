import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  FormLabel,
  List,
  Heading,
  Link,
  Spinner,
  Center,
  Select,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import ContactCard from "./ContactCard";
import withRouterParamsHook from "./HOC/withRouterParams"; //used for params and query vals

import { useDispatch, useSelector } from "react-redux";
import { getContactsState } from "../redux/reducers/contacts/selector";
import { fetchContacts } from "../redux/action/contactActionTypes";
import {
  deleteContactById,
  updateContactStarredById,
} from "../redux/action/selectedContactActionTypes";
// const defaultContacts = [
//   { id: "1", name: "Tom", email: "tom1@gmail.com", starred: true },
//   { id: "2", name: "Max", email: "max2@gmail.com", starred: true },
//   { id: "3", name: "Caroline", email: "caroline1@gmail.com", starred: false },
// ];
const renderContactList = (contacts = [], dispatch, showStarred = false) => {
  const contactActionHadler = (action, id) => {
    switch (action) {
      case "delete": {
        dispatch(deleteContactById(id, showStarred));
        break;
      }
      case "favorite": {
        dispatch(
          updateContactStarredById(
            id,
            {
              starred: true,
            },
            showStarred
          )
        );
        break;
      }
      case "unfavorite": {
        dispatch(
          updateContactStarredById(
            id,
            {
              starred: false,
            },
            showStarred
          )
        );
        break;
      }
      default: {
        console.error("invalid contact action");
      }
    }
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
  const contactState = useSelector(getContactsState);
  const { data, status, showStarred } = contactState;
  // const [, /*URLSearchParams*/ setSearchParams] = props.search;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts(showStarred));
  }, [dispatch, showStarred]);

  const [contactListState, updateContactListState] = useState({
    showStarred: showStarred,
  });

  // useEffect(() => {
  //   if (contactListState.showStarred) {
  //     setSearchParams({ fav_only: "true" });
  //   } else {
  //     setSearchParams({ fav_only: "false" });
  //   }
  // }, [contactListState.showStarred, setSearchParams]);

  const toggleFavHandler = (showStarred) => {
    // setSearchParams({
    //   fav_only: !contactListState.showStarred ? "true" : "false",
    // });
    dispatch(fetchContacts(!showStarred));
  };
  return (
    <>
      <Center>
        <Heading size="lg">Contact List </Heading>
      </Center>
      <Container
        // css properties must be camelCased
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div>
          <FormLabel>Filter</FormLabel>
          <Select
            variant="outline"
            value={contactListState.showStarred}
            onChange={() => {
              updateContactListState({
                showStarred: !contactListState.showStarred,
              });
              toggleFavHandler(contactListState.showStarred);
            }}
          >
            <option value={false}>All</option>
            <option value={true}>Favourites Only</option>
          </Select>
        </div>
        <Link as={ReachLink} to="/contact">
          <Button colorScheme="green"> Add Contact </Button>
        </Link>
      </Container>
      <div>
        {status === "LOADING" ? (
          <Center mt="10px">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : (
          <List spacing={5}>
            {renderContactList(data, dispatch, showStarred)}
          </List>
        )}
      </div>
    </>
  );
};

export default withRouterParamsHook(ContactList);
