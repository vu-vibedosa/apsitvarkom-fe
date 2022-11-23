import PollutedLocationForm from "../pollutedLocations/PollutedLocationForm";
import PollutedLocationList from "../pollutedLocations/PollutedLocationList";
import { useRoutes } from "react-router-dom";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import PollutedLocation from "../../types/PollutedLocation";
interface Props {
  locationsRequest: ApiRequest<PollutedLocation[]>;
}

const Sidebar: React.FC<Props> = ({ locationsRequest }) => {
  const routes = useRoutes([
    { path: "/form", element: <PollutedLocationForm /> },
    {
      path: "/",
      element: <PollutedLocationList locationsRequest={locationsRequest} />,
    },
  ]);
  return routes;
};

// eslint-disable-next-line react/prop-types
const SidebarWrapper: React.FC<Props> = ({ locationsRequest }) => {
  return (
    <div>
      <Sidebar locationsRequest={locationsRequest} />
    </div>
  );
};

export default SidebarWrapper;
