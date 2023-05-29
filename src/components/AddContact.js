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
} from "@chakra-ui/react";
//import { Link as ReachLink, useNavigate, useParams } from "react-router-dom";

// react-hook-form for form validation - https://react-hook-form.com/get-started
//using navigate hook instead of history as per v5 to v6 react-router changes
//useSearchParams to get query params -- only in functional component
//useParams to get path params -- only in functional component
import withNavigateHook from "./HOC/withNavigate"; //used in class based component navigation
import withRouterParamsHook from "./HOC/withRouterParams"; //used for params and query vals
//Imp read about react useState hook in class and functional component: https://blog.logrocket.com/guide-usestate-react/#class-functional-components-react, https://react.dev/reference/react/useState

import { getContact } from "../services/contact.service";
const defaultContactState = {
  name: "",
  email: "",
  starred: false,
  formError: false,
  formErrorMessage: "",
};
//class component syntax
// class AddContact extends React.Component {
//   //will be using state variables (not using any hook in class component)
//   constructor() {
//     super();
//     this.state = defaultContactState;
//     //this.add = this.add.bind(this);
//   }
//   //state = defaultContactState;
//   //alternative to mounted hook in vue, when component is mounted or loaded in dom
//   async componentDidMount() {
//     const id = this.props.params.id ?? "";
//     // const [queryParams, updateQueryParams] = this.props.search;
//     // console.log("Add Contact query", queryParams.get("random"));
//     // updateQueryParams({contact: id});
//     if (id) {
//       const fetchExistingContact = async () => {
//         const response = await getContact(id);
//         if (response && response.id) {
//           return response;
//         }
//       };
//       const existingContact = await fetchExistingContact();
//       // const LOCAL_STORAGE_CONTACTS_KEY = "__ra-contacts";
//       // const contacts =
//       //   JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)) ?? [];
//       // const existingContact = contacts.find((c) => c.id === id);
//       if (!existingContact) {
//         //used timeout bcuz of useEffect warning when using navigate
//         setTimeout(() => {
//           this.props.navigation("/");
//         }, 0);
//       } else {
//         this.setState({ ...existingContact });
//       }
//     }
//   }

//   validateEmail = () => {
//     const emailRegex = new RegExp(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
//     if (!emailRegex.test(this.state.email)) {
//       this.setState({
//         formError: true,
//         formErrorMessage: "Please provide a valid email",
//       });
//       return false;
//     }
//     return true;
//   };
//   //submit arrow func
//   add = (event) => {
//     event.preventDefault();
//     //resetting errors
//     this.setState({
//       formError: false,
//       formErrorMessage: "",
//     });

//     if (this.state.name.trim() === "" || this.state.email.trim() === "") {
//       //this.state.formErrorMessage = this.state.emailError ? 'Provided Email is not valid' : 'All fields are required';
//       this.setState({
//         formError: true,
//         formErrorMessage: "All fields are required",
//       });
//       return;
//     }
//     if (!this.validateEmail()) return;
//     //using the handler we passed from app parent to addContact child
//     this.props.addOrEditContactHandler({
//       id: this.state.id,
//       name: this.state.name,
//       email: this.state.email,
//       starred: this.state.starred,
//     });
//     this.setState(defaultContactState);

//     // after saving it should return to home list page
//     //using withNavigate HOC which is injecting navigate from react-router-dom
//     this.props.navigation("/");
//   };
//   // invoke render method first then return in that
//   render() {
//     return (
//       <Container>
//         <Heading as="h2" size="md">
//           {`${this.state.id ? "Edit" : "Create"}`} contact
//         </Heading>
//         <FormControl isInvalid={this.state.formError}>
//           <FormErrorMessage>{this.state.formErrorMessage}</FormErrorMessage>

//           <Flex align="center" my="10px">
//             <FormLabel> Name</FormLabel>
//             {/* will be using setState on onChange method of input to update the state value */}
//             <Input
//               placeholder="Enter Name"
//               value={this.state.name}
//               onChange={(event) => {
//                 this.setState({ name: event.target.value });
//               }}
//             />
//           </Flex>
//           <Flex align="center" my="10px">
//             <FormLabel> Email</FormLabel>
//             <Input
//               placeholder="Enter Email"
//               value={this.state.email}
//               onChange={(event) => {
//                 this.setState({ email: event.target.value });
//               }}
//             />
//           </Flex>
//         </FormControl>
//         <Flex align="center">
//           <FormLabel>Add this contact to favourite ?</FormLabel>
//           <Checkbox
//             checked={this.state.starred}
//             onChange={() => {
//               this.setState({ starred: !this.state.starred });
//             }}
//           />
//         </Flex>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "5px",
//           }}
//         >
//           <Button
//             colorScheme={`${this.state.id ? "blue" : "green"}`}
//             onClick={this.add}
//           >
//             {`${this.state.id ? "Save" : "Create"}`}
//           </Button>
//           <Link as={ReachLink} to="/">
//             <Button> Back </Button>
//           </Link>
//         </div>
//       </Container>
//     );
//   }
// }

//function component syntax
const AddContact = (props) => {
  //in functional component need to useState hook to create state and its methods
  const [contactState, updateContact] = useState(defaultContactState);
  const { params, navigation } = props;
  useEffect(() => {
    const contactId = params.id ?? "";

    const fetchExistingContact = async () => {
      const response = await getContact(contactId);
      if (response && response.id) {
        return response;
      }
    };

    async function loadData() {
      if (contactId) {
        const existingContact = await fetchExistingContact();
        if (!existingContact) {
          navigation("/");
          // setTimeout(() => {
          //   navigation("/");
          // }, 0);
        } else {
          updateContact({ ...existingContact });
        }
      }
    }

    loadData();
  }, [params.id, navigation]);

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
    props.addOrEditContactHandler({
      id: contactState.id,
      name: contactState.name,
      email: contactState.email,
      starred: contactState.starred,
    });
    updateContact({ ...defaultContactState });
    props.navigation("/");
  };

  return (
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
        {/* <Link as={ReachLink} to="/">
          <Button> Back </Button>
        </Link> */}
        <Button onClick={() => navigation(-1)}> Back </Button>
      </div>
    </Container>
  );
};
export default withNavigateHook(withRouterParamsHook(AddContact));
