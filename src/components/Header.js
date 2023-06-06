import React from "react";
import { Heading, Container, Divider, Flex, Button } from "@chakra-ui/react";
import { getAuthState } from "../redux/reducers/auth/selector";
import { useDispatch, useSelector } from "react-redux";
import { setlogOut } from "../redux/actions/auth";
//function component syntax
const AppHeader = () => {
  //cannont use simple class because class in JS are classes for oop concept keyword
  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();
  const HeaderText = !authState.is_logged_in
    ? "Manage your contacts"
    : `Welcome,  ${authState.user_data.name || authState.user_data.email} !`;

  function handleAuthClick() {
    if (authState.is_logged_in) {
      dispatch(setlogOut());
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
//class component syntax
// class AppHeader extends React.Component {
//   render() {
//     return (
//       <Header as="h1" icon textAlign="center" dividing>
//         <Header.Content>Manage your contacts</Header.Content>
//       </Header>
//     );
//   }
// }

export default AppHeader;
