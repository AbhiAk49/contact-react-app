import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
const NotFound = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name="broken chain" />
      Seems like the page you are looking for not exist
    </Header>
    <Segment.Inline>
      <Link to="/">
        <Button primary>Return to Home</Button>
      </Link>
    </Segment.Inline>
  </Segment>
);

export default NotFound;
