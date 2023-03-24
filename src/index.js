import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //Disable strict mode warning -->have findDOMNOde waring causing due to third party lib in addContact
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
);
