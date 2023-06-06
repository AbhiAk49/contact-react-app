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

const ContactCard = (props) => {
  const { id, name, email, starred } = props.contact;
  return (
    <ListItem key={id}>
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
    </ListItem>
  );
};
export default ContactCard;
