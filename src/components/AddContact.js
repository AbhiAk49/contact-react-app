import React, { useState } from "react";
import { Container, Button, Checkbox, Form } from "semantic-ui-react";

//Imp read about react useState hook in class and functional component: https://blog.logrocket.com/guide-usestate-react/#class-functional-components-react, https://react.dev/reference/react/useState

const defaultContactState = { name: "", email: "", starred: false };
//class component syntax
class AddContact extends React.Component {
  //will be using state variables (not using any hook in class component)
  state = defaultContactState;

  //submit arrow func
  add = (event) => {
    event.preventDefault();
    //basic form validation logic
    console.log("addContact class comp add state", this.state);
    if (this.state.name.trim() === "" || this.state.email.trim() === "") {
      alert("All fields are required");
      return;
    }
    //using the handler we passed from app parent to addContact child
    this.props.addContactHandler(this.state);
    this.setState(defaultContactState);
  };
  // invoke render method first then return in that
  render() {
    return (
      // <div className="ui main">
      //   <h2> Add New Contact</h2>
      //   <form className="ui form mx-1">
      //     <div className="field"></div>
      //     <label>Name</label>
      //     <input type="text" name="name" placeholder="Enter name"></input>
      //   </form>
      // </div>
      <Container>
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
          <Button type="submit" color="blue">
            Save
          </Button>
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
//     props.addContactHandler(contactState);
//     updateContact(defaultContactState);
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
//         <Button type="submit" color="blue">
//           Save
//         </Button>
//       </Form>
//     </Container>
//   );
// };

export default AddContact;
