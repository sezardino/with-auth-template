import LoginPage from "@/pages/auth/login";
import RegistrationPage from "@/pages/auth/registration";
import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";
import { ApplicationUrls } from "./const";

export const router = createBrowserRouter([
  {
    path: ApplicationUrls.home,
    children: [
      {
        path: ApplicationUrls.home,
        index: true,
        Component: HomePage,
      },
      {
        path: ApplicationUrls.auth.index,
        children: [
          {
            path: ApplicationUrls.auth.login,
            index: true,
            Component: LoginPage,
          },
          { path: ApplicationUrls.auth.register, Component: RegistrationPage },
        ],
      },
    ],
  },
]);
