import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { PortfolioProvider } from "./context/protfolioContext";
import reportWebVitals from "./reportWebVitals";
import 'react-international-phone/style.css';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PortfolioProvider>
      <SnackbarProvider />
      <App />
    </PortfolioProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
