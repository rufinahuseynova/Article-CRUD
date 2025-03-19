import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import App from "./App";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider value={defaultSystem}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ChakraProvider>
);
