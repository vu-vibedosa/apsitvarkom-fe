import React from "react";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import PollutedLocation from "../../types/PollutedLocation";
import PollutedLocationCard, {
  PollutedLocationCardLoading,
} from "./PollutedLocationCard";
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

export interface PollutedLocationListProps {
  locationsRequest: ApiRequest<PollutedLocation[]>;
  googleMap: React.MutableRefObject<google.maps.Map | null>;
}

const PollutedLocationList: React.FC<PollutedLocationListProps> = ({
  locationsRequest,
  googleMap,
}) => {
  const { t } = useTranslation();

  const content = () => {
    switch (locationsRequest.status) {
      case "success":
        return (
          <div className="space-y-4 h-full">
            {locationsRequest.data.map((location) => (
              <PollutedLocationCard
                pollutedLocation={location}
                googleMap={googleMap}
                key={location.id}
              />
            ))}
          </div>
        );
      case "loading":
        return (
          <div className="space-y-4 h-full overflow-y-hidden">
            {[...Array(10)].map((_, index) => (
              <PollutedLocationCardLoading key={index} />
            ))}
          </div>
        );
      case "error":
      default:
        return (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center text-slate-600 text-sm">
              <div className="text-xl">
                <MdErrorOutline />
              </div>
              <div>{t("error", "Error")}</div>
              <div>
                {t(
                  "pollutedLocationLoadError",
                  "Failed to load polluted locations"
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return content();
};

export default PollutedLocationList;
