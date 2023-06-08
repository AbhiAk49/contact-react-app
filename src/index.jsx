import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App";
import { Provider } from "react-redux";
import store from "./redux/store";
const root = createRoot(document.getElementById("root"));
root.render(
  //Disable strict mode warning -->have findDOMNOde waring causing due to third party lib in addContact
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
