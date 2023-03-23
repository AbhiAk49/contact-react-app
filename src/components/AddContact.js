import React from "react";
import { Container, Button, Checkbox, Form } from "semantic-ui-react";
//class based component

class AddContact extends React.Component {
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
        <Form>
          <Form.Field>
            <label> Name</label>
            <input placeholder="Enter Name" />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder="Enter Email" />
          </Form.Field>
          <Form.Field>
            <Checkbox  label="Add this contact to favourite ?" />
          </Form.Field>
          <Button type="submit" color="blue">Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default AddContact;
