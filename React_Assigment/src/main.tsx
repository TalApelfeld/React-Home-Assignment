import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import DefaultLayout from "./Layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import Introductory from "./pages/Introductory";
import ExperimentPage1 from "./pages/ExperimentPage1";
import ExperimentPage2 from "./pages/ExperimentPage2";
import ExperimentPage3 from "./pages/ExperimentPage3";
import NotFound404 from "./pages/NotFound404";
import ExperimentProvider from "./context/experiment/ExperimentProvider";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    errorElement: <NotFound404 />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/About", element: <Introductory /> },
      { path: "/ex1", element: <ExperimentPage1 /> },
      { path: "/ex2", element: <ExperimentPage2 /> },
      { path: "/stats", element: <ExperimentPage3 /> },
    ],
  },
  { path: "*", element: <NotFound404 /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExperimentProvider>
      <RouterProvider router={router} />
    </ExperimentProvider>
  </StrictMode>
);
