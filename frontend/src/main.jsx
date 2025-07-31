import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./views/Home/Home";
import PrepareBattle from "./views/Battle/PrepareBattle/PrepareBattle";
import RoomBattle from "./views/Battle/Room/Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/prepare/battle/:id",
    element: <PrepareBattle />,
  },

  {
    path: "/battle/room/:id",
    element: <RoomBattle />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
