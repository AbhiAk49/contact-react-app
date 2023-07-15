import React from "react";
import {
  Card,
  CardFooter,
  CardBody,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Link as ReachLink } from "react-router-dom";
//renaming react router link as ReachLink to use with Link Chakra component
const NotFound = () => (
    <Card align="center" size="lg" m="20px">
      <CardBody minW="480px" p="10px">
        <Text align="center">
          <InfoOutlineIcon /> Seems like the page you are looking for not exist
        </Text>
      </CardBody>
      <CardFooter pt="8px">
        <Link as={ReachLink} to="/">
          <Button colorScheme="blue">Return to Home</Button>
        </Link>
      </CardFooter>
    </Card>
);

export default NotFound;
