import React from "react";
import { Header } from 'semantic-ui-react'
//function component syntax
const AppHeader = () => {
  return (
    //cannont use simple class because class in JS are classes for oop concept keyword
    <Header as='h1' icon textAlign='center' dividing>
      <Header.Content>Manage your contacts</Header.Content>
    </Header>
  );
};

export default AppHeader;
