import { createRoot } from "react-dom/client";
import App from "./components/App";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "bear-react-carousel/dist/index.css";
import ToggleColorMode from "./context/ToggleColorMode";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToggleColorMode>
      <CssBaseline />
      <App />
    </ToggleColorMode>
  </Provider>,
);
