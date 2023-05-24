import React from "react";
import {
  Button,
  ListItem,
  Image,
  Link,
  Card,
  CardBody,
  Text,
  Heading,
  Stack,
  CardFooter,
} from "@chakra-ui/react";
import { AiOutlineDelete, AiFillStar, AiOutlineStar } from "react-icons/ai";
import UserSvg from "../images/user.svg";
import { Link as ReachLink } from "react-router-dom";
//function component syntax
const ContactCard = (props) => {
  //const showOnlyStarred = props.showOnlyStarred;
  //using showStarred to disable rendering of card if it is starred or not
  const { id, name, email, starred } = props.contact;
  //conditional rendering example
  //if ((showOnlyStarred && starred) || !showOnlyStarred) {
  return (
    <ListItem
      key={id}
      //alternate to not using if - else
      // style={{
      //   display:
      //     (showOnlyStarred && starred) || !showOnlyStarred ? "block" : "none",
      // }}
    >
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Stack w="100%">
          <Stack direction="horizontal">
            <Image
              boxSize="90px"
              objectFit="cover"
              maxW={{ base: "100%", sm: "100px" }}
              src={UserSvg}
              alt={`${id} user image`}
            />
            <CardBody>
              <Link as={ReachLink} to={{ pathname: `/contact/${id}` }}>
                <Heading size="md">{name || ""}</Heading>
                <Text py="2">{email || "N/A"}</Text>
              </Link>
            </CardBody>
          </Stack>

          <CardFooter
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Button
              rightIcon={starred ? <AiOutlineStar /> : <AiFillStar />}
              colorScheme={starred ? "red" : "green"}
              variant="outline"
              mr="25px"
              onClick={() => {
                if (starred) props.onContactActionUpdate("unfavorite", id);
                else props.onContactActionUpdate("favorite", id);
              }}
            >
              {`${starred ? "Remove From" : "Add To"} Favourite`}
            </Button>
            {/* <Button
          labelPosition="right"
          onClick={() => {
            if (starred) props.onContactActionUpdate("unfavorite", id);
            else props.onContactActionUpdate("favorite", id);
          }}
        >
          <Button icon colorScheme="red">
            <Icon name={`${starred ? "star outline" : "star"}`} size="large" />
          </Button>
          <FormLabel as="a" basic pointing="left">
            {`${starred ? "Remove From" : "Add To"} Favourite`}
          </FormLabel>
        </Button> */}
            <Button
              onClick={() => {
                props.onContactActionUpdate("delete", id);
              }}
              rightIcon={<AiOutlineDelete />}
            >
              Delete
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      {/* pathname for path params, search with querystring for query params  -- search: '?random=1'*/}
      {/* used button as div bcuz cant use button inside button warning */}
      {/* using onContactActionUpdate prop function handler passed from contactList parent */}
    </ListItem>
  );
  // } else {
  //   return null;
  // }
};
export default ContactCard;
