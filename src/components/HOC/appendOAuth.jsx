import React from "react";
import OAuthGoogle from "../OAuthGoogle";
import { Center, Box, AbsoluteCenter, Divider } from "@chakra-ui/react";

//using this Higher Order Component to inject append Google OAuth
const appendGoogleOAuth = (Component, append = true) => {
  return (props) => {
    return !append ? (
      <Component {...props} />
    ) : (
      <>
        <Component {...props} />
        <Box position="relative" padding="8px" my="40px">
          <Divider />
          <AbsoluteCenter bg="white" px="12px">
            Or
          </AbsoluteCenter>
        </Box>
        <Center>
          <OAuthGoogle />
        </Center>
      </>
    );
  };
};

export default appendGoogleOAuth;
