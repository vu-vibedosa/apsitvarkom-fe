import PollutedLocationForm from "../pollutedLocations/PollutedLocationForm";
import PollutedLocationList from "../pollutedLocations/PollutedLocationList";
import { useRoutes } from "react-router-dom";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import PollutedLocation from "../../types/PollutedLocation";

interface Props {
  locationsRequest: ApiRequest<PollutedLocation[]>;
  googleMap: google.maps.Map | null;
}

const Sidebar: React.FC<Props> = ({ locationsRequest, googleMap }) => {
  const routes = useRoutes([
    { path: "/form", element: <PollutedLocationForm /> },
    {
      path: "/",
      element: (
        <PollutedLocationList
          locationsRequest={locationsRequest}
          googleMap={googleMap}
        />
      ),
    },
  ]);
  return routes;
};

// eslint-disable-next-line react/prop-types
const SidebarWrapper: React.FC<Props> = ({ locationsRequest, googleMap }) => {
  return (
    <div>
      <Sidebar locationsRequest={locationsRequest} googleMap={googleMap} />
    </div>
  );
};

export default SidebarWrapper;
