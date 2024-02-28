import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {db} from "./api/db";

localStorage.setItem("users", JSON.stringify(db.users));
localStorage.setItem("movies", JSON.stringify(db.movies));

/* <RouterProvider router={router}></RouterProvider> */
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
