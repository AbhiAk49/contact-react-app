import React from "react";
import { Heading, Container, Divider, Flex, Button } from "@chakra-ui/react";
import { getAuthState } from "../redux/reducers/auth/selector";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/actions/auth";
const AppHeader = () => {

  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();
  const HeaderText = !authState.is_logged_in
    ? "Manage your contacts"
    : `Welcome,  ${authState.user_data.name || authState.user_data.email} !`;

  function handleAuthClick() {
    if (authState.is_logged_in) {
      dispatch(logOutUser());
    }
  }

  return (
    <Container>
      <Flex
        justify={authState.is_logged_in ? "space-between" : "center"}
        align="center"
        mt="8px"
      >
        <Heading as="h5" pb="12px" size="lg">
          {HeaderText}
        </Heading>
        {authState.is_logged_in ? (
          <Button colorScheme="red" variant="outline" onClick={handleAuthClick}>
            Log out
          </Button>
        ) : null}
      </Flex>
      <div style={{ paddingBottom: "12px" }}>
        <Divider />
      </div>
    </Container>
  );
};


export default AppHeader;
