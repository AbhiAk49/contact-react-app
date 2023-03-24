import React, { useState } from "react";
import { Container, Button, Checkbox, Form } from "semantic-ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
//using navigate hook instead of history as per v5 to v6 react-router changes
//useSearchParams to get query params -- only in functional component
//useParams to get path params -- only in functional component
import withNavigateHook from "./HOC/withNavigate"; //used in class based component navigation
import withRouterParamsHook from "./HOC/withRouterParams"; //used for params and query vals
//Imp read about react useState hook in class and functional component: https://blog.logrocket.com/guide-usestate-react/#class-functional-components-react, https://react.dev/reference/react/useState

const defaultContactState = { name: "", email: "", starred: false };
//class component syntax
class AddContact extends React.Component {
  //will be using state variables (not using any hook in class component)
  state = defaultContactState;
  //alternative to mounted hook in vue, when component is mounted or loaded in dom
  componentDidMount() {
    const id = this.props.params.id ?? "";
    // const [queryParams, updateQueryParams] = this.props.search;
    // console.log("Add Contact query", queryParams.get("random"));
    // updateQueryParams(`?contact=${id}`);
    if (id) {
      const LOCAL_STORAGE_CONTACTS_KEY = "__ra-contacts";
      const contacts =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)) ?? [];
      const existingContact = contacts.find((c) => c.id === id);
      if (!existingContact) {
        //used timeout bcuz of useEffect warning when using navigate
        setTimeout(() => {
          this.props.navigation("/");
        }, 0);
      } else {
        this.setState(existingContact);
      }
    }
  }

  //submit arrow func
  add = (event) => {
    event.preventDefault();
    //basic form validation logic
    //console.log("addContact class comp add state", this.state);
    if (this.state.name.trim() === "" || this.state.email.trim() === "") {
      alert("All fields are required");
      return;
    }
    //using the handler we passed from app parent to addContact child
    this.props.addOrEditContactHandler(this.state);
    this.setState(defaultContactState);

    // after saving it should return to home list page
    //using withNavigate HOC which is injecting navigate from react-router-dom
    this.props.navigation("/");
  };
  // invoke render method first then return in that
  render() {
    return (
      <Container>
        <h2>{`${this.state.id ? "Edit" : "Create"}`} contact</h2>
        <Form onSubmit={this.add}>
          <Form.Field>
            <label> Name</label>
            {/* will be using setState on onChange method of input to update the state value */}
            <input
              placeholder="Enter Name"
              value={this.state.name}
              onChange={(event) => {
                this.setState({ name: event.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Enter Email"
              value={this.state.email}
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Add this contact to favourite ?"
              checked={this.state.starred}
              onChange={() => {
                this.setState({ starred: !this.state.starred });
              }}
            />
          </Form.Field>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Button type="submit" color={`${this.state.id ? "blue" : "green"}`}>
              {`${this.state.id ? "Save" : "Create"}`}
            </Button>
            <Link to="/">
              <Button> Back </Button>
            </Link>
          </div>
        </Form>
      </Container>
    );
  }
}

//function component syntax
// const AddContact = (props) => {
//   //in functional component need to useState hook to create state and its methods
//   const [contactState, updateContact] = useState(defaultContactState);
//   //or another way is we could each variable a state

//   //in functional component based navigation -- create method from useNavigate and use that (not use directly)
//   const navigate = useNavigate();

// in functional component an alternate to componentDidMount() method is use useEffect with []

//   //submit arrow func
//   const add = (event) => {
//     event.preventDefault();
//     //basic form validation logic
//     console.log("addContact functional comp add state", contactState);
//     if (contactState.name.trim() === "" || contactState.email.trim() === "") {
//       alert("All fields are required");
//       return;
//     }
//     //using the handler we passed from app parent to addContact child
//     props.addOrEditContactHandler(contactState);
//     updateContact(defaultContactState);
//     navigate('/')
//   };
//   return (
//     <Container>
//       <Form onSubmit={add}>
//         <Form.Field>
//           <label> Name</label>
//           {/* will be using setState on onChange method of input to update the state value */}
//           {/* also when setting state with useState hook in state varible dont mutate the state, replace it entirely
//           updateContact({ name: event.target.value }); wrong
//           updateContact({ ...contactState, name: event.target.value }); correct
//           updateContact((prevState) =>
//                 Object.assign({}, prevState, { name: event.target.value })
//               );  also correct */}
//           <input
//             placeholder="Enter Name"
//             value={contactState.name}
//             onChange={(event) => {
//               updateContact((prevState) =>
//                 Object.assign({}, prevState, { name: event.target.value })
//               );
//             }}
//           />
//         </Form.Field>
//         <Form.Field>
//           <label>Email</label>
//           <input
//             placeholder="Enter Email"
//             value={contactState.email}
//             onChange={(event) => {
//               updateContact((prevState) =>
//                 Object.assign({}, prevState, { email: event.target.value })
//               );
//             }}
//           />
//         </Form.Field>
//         <Form.Field>
//           <Checkbox
//             label="Add this contact to favourite ?"
//             checked={contactState.starred}
//             onChange={() => {
//               updateContact((prevState) =>
//                 Object.assign({}, prevState, { starred: !contactState.starred })
//               );
//             }}
//           />
//         </Form.Field>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "5px",
//           }}
//         >
//           <Button type="submit" color="blue">
//             Save
//           </Button>
//           <Link to="/">
//             <Button> Back </Button>
//           </Link>
//         </div>
//       </Form>
//     </Container>
//   );
// };

export default withNavigateHook(withRouterParamsHook(AddContact));
