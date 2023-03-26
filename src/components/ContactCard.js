import React from "react";
import { List, Icon, Button, Label, Image } from "semantic-ui-react";
import UserSvg from "../images/user.svg";
import { Link } from "react-router-dom";
//function component syntax
const ContactCard = (props) => {
  //const showOnlyStarred = props.showOnlyStarred;
  //using showStarred to disable rendering of card if it is starred or not
  const { id, name, email, starred } = props.contact;
  //conditional rendering example
  //if ((showOnlyStarred && starred) || !showOnlyStarred) {
    return (
      <List.Item
        key={id}
        //alternate to not using if - else
        // style={{
        //   display:
        //     (showOnlyStarred && starred) || !showOnlyStarred ? "block" : "none",
        // }}
      >
        <Image floated="left" style={{ width: "70px" }} src={UserSvg} />
        {/* pathname for path params, search with querystring for query params  -- search: '?random=1'*/}
        <Link to={{ pathname: `/contact/${id}` }}>
          <List.Content floated="left">
            <List.Header as="h3">{name || ""}</List.Header>
            <List.Header as="h4" style={{ color: "#5095d2" }}>
              {email || "N/A"}
            </List.Header>
          </List.Content>
        </Link>
        <List.Content floated="right">
          {/* used button as div bcuz cant use button inside button warning */}
          {/* using onContactActionUpdate prop function handler passed from contactList parent */}
          <Button
            as="div"
            labelPosition="right"
            onClick={() => {
              if (starred) props.onContactActionUpdate("unfavorite", id);
              else props.onContactActionUpdate("favorite", id);
            }}
          >
            <Button icon color="red">
              <Icon
                name={`${starred ? "star outline" : "star"}`}
                size="large"
              />
            </Button>
            <Label as="a" basic pointing="left">
              {`${starred ? "Remove From" : "Add To"} Favourite`}
            </Label>
          </Button>
          <Button
            animated="vertical"
            onClick={() => {
              props.onContactActionUpdate("delete", id);
            }}
          >
            <Button.Content hidden>Delete</Button.Content>
            <Button.Content visible>
              <Icon name="trash alternate" size="large" />
            </Button.Content>
          </Button>
        </List.Content>
      </List.Item>
    );
  // } else {
  //   return null;
  // }
};
export default ContactCard;
