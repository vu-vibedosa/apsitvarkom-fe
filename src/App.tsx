import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MapPage from "./pages/MapPage";
import PollutedLocationPage from "./pages/PollutedLocationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MapPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "location/:id",
    element: <PollutedLocationPage />,
    errorElement: <ErrorPage />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
