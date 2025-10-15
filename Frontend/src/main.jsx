import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import {BrowserRouter} from "react-router-dom"
import App from "./App";
import './index.css'

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-gulb5urxcam7lnzm.us.auth0.com"
    clientId="UyalNNyufCllTXqgyT8Wn5nRCEQ2E0TT"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
