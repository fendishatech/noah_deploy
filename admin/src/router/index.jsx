import { createBrowserRouter } from "react-router-dom";
import { Login, OTP, PublicLayout, Home } from "../views";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/otp/:phone_no",
    element: <OTP />,
  },
  {
    path: "/home",
    element: <PublicLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
