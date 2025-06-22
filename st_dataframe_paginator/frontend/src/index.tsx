import React from "react";
import { createRoot } from "react-dom/client";
import { StreamlitProvider } from "streamlit-component-lib-react-hooks";
import MyComponent from "./StDataframePaginator";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StreamlitProvider>
      <MyComponent />
    </StreamlitProvider>
  </React.StrictMode>,
);
