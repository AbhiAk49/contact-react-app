import React from "react";
import { Heading, Center, Divider } from "@chakra-ui/react";
//function component syntax
const AppHeader = () => (
  //cannont use simple class because class in JS are classes for oop concept keyword
  <>
    <Center>
      <Heading as="h1" pb="12px">
        Manage your contacts
      </Heading>
    </Center>
    <div style={{'paddingBottom': '12px'}}>
      <Divider />
    </div>
  </>
);
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
