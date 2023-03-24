import React from "react";
import { Header } from "semantic-ui-react";
// Semantic UI - https://react.semantic-ui.com/elements/header/
//function component syntax
const AppHeader = () => (
  //cannont use simple class because class in JS are classes for oop concept keyword
  <Header as="h1" icon textAlign="center" dividing>
    <Header.Content>Manage your contacts</Header.Content>
  </Header>
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
