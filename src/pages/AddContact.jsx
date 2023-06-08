import React, { useState, useEffect } from "react";
import {
  Heading,
  Container,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Center,
  Spinner,
} from "@chakra-ui/react";
import withNavigateHook from "../components/HOC/withNavigate";
import withRouterParamsHook from "../components/HOC/withRouterParams";

import { useDispatch, useSelector } from "react-redux";
import { getSelectedContactState } from "../redux/reducers/selectedContact/selector";
import {
  setContactById,
  fetchContactById,
  addContactById,
  updateContactById,
} from "../redux/actions/selectedContacts";

const defaultContactState = {
  name: "",
  email: "",
  starred: false,
  formError: false,
  formErrorMessage: "",
};

const AddContact = (props) => {
  const selectedContactState = useSelector(getSelectedContactState);
  const { contact, status, error } = selectedContactState;
  const dispatch = useDispatch();
  const { params, navigation } = props;
  const [contactState, updateContact] = useState({
    ...defaultContactState,
    ...contact,
  });
  useEffect(() => {
    const contactId = params.id;
    if (contactId) {
      dispatch(fetchContactById(contactId));
    }
    return () => dispatch(setContactById({}));
  }, [params.id, dispatch]);

  //this useEffect to sync edit-add contact component state with redux contact state
  useEffect(() => {
    updateContact((prevState) => {
      if (status === "ERROR") {
        return { ...prevState, formError: true, formErrorMessage: error };
      }
      return { ...prevState, ...contact };
    });
  }, [contact, error, status]);
  //when using updater function to setState method remember to return eval state

  //in functional component an alternate to componentDidMount() method is use useEffect with []
  const validateEmail = () => {
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!emailRegex.test(contactState.email)) {
      updateContact((prevState) =>
        Object.assign({}, prevState, {
          formError: true,
          formErrorMessage: "Please provide a valid email",
        })
      );
      return false;
    }
    return true;
  };

  const add = (event) => {
    event.preventDefault();

    updateContact((prevState) =>
      Object.assign({}, prevState, {
        formError: false,
        formErrorMessage: "",
      })
    );

    if (contactState.name.trim() === "" || contactState.email.trim() === "") {
      updateContact((prevState) =>
        Object.assign({}, prevState, {
          formError: true,
          formErrorMessage: "All fields are required",
        })
      );
      return;
    }
    if (!validateEmail()) return;
    //using the handler we passed from app parent to addContact child
    if (contactState.id) {
      dispatch(
        updateContactById(contactState.id, {
          name: contactState.name.trim(),
          email: contactState.email.trim(),
          starred: contactState.starred,
        })
      );
    } else {
      dispatch(
        addContactById({
          name: contactState.name.trim(),
          email: contactState.email.trim(),
          starred: contactState.starred,
        })
      );
    }
  };

  return (
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
        <Container>
          <Heading as="h2" size="md">
            {`${contactState.id ? "Edit" : "Create"}`} contact
          </Heading>
          <FormControl isInvalid={contactState.formError}>
            <FormErrorMessage>{contactState.formErrorMessage}</FormErrorMessage>
            <Flex align="center" my="10px">
              <FormLabel> Name</FormLabel>
              {/* will be using setState on onChange method of input to update the state value */}
              <Input
                placeholder="Enter Name"
                value={contactState.name}
                onChange={(event) => {
                  updateContact((prevState) =>
                    Object.assign({}, prevState, { name: event.target.value })
                  );
                }}
              />
            </Flex>
            <Flex align="center" my="10px">
              <FormLabel> Email</FormLabel>
              <Input
                placeholder="Enter Email"
                value={contactState.email}
                onChange={(event) => {
                  updateContact((prevState) =>
                    Object.assign({}, prevState, { email: event.target.value })
                  );
                }}
              />
            </Flex>
          </FormControl>
          <Flex align="center">
            <FormLabel>Add this contact to favourite ?</FormLabel>
            <Checkbox
              isChecked={contactState.starred}
              onChange={() => {
                updateContact((prevState) =>
                  Object.assign({}, prevState, { starred: !prevState.starred })
                );
              }}
            />
          </Flex>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Button
              colorScheme={`${contactState.id ? "blue" : "green"}`}
              onClick={add}
            >
              {`${contactState.id ? "Save" : "Create"}`}
            </Button>
            <Button onClick={() => navigation("/")}> Back </Button>
          </div>
        </Container>
      )}
    </div>
  );
};
export default withNavigateHook(withRouterParamsHook(AddContact));
