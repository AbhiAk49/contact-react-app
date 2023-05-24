import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //Disable strict mode warning -->have findDOMNOde waring causing due to third party lib in addContact
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
