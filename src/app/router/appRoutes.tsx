import { ROUTES } from "@/shared/constants/router";
import AppLayout from "../layout/AppLayout";
import NotFound from "../page/NotFound";
import { Home } from "../page/app/Home";

export const appRoutes = {
  path: ROUTES.APP.HOME,
  element: <AppLayout />,
  errorElement: <NotFound />,
  children: [
    {
      index: true,
      element: <Home />,
    },
  ],
};
