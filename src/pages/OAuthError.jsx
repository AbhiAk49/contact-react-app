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
const OAuthError = () => (
    <Card align="center" size="lg" m="20px">
      <CardBody minW="480px" p="10px">
        <Text align="center">
          <InfoOutlineIcon /> Oops could not authorize with OAuth
        </Text>
      </CardBody>
      <CardFooter pt="8px">
        <Link as={ReachLink} to="/auth/login">
          <Button variant={'outline'} colorScheme="red">Retry Login </Button>
        </Link>
      </CardFooter>
    </Card>
);

export default OAuthError;
