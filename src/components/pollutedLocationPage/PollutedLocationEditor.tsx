import React, { useState } from "react";
import usePollutedLocationUpdateForm from "../../hooks/usePollutedLocationUpdateForm";
import PollutedLocation from "../../types/PollutedLocation";
import PollutedLocationDetails from "./PollutedLocationDetails";
import PollutedLocationHeader from "./PollutedLocationHeader";
import PollutedLocationUpdateForm from "./PollutedLocationUpdateForm";

interface Props {
  pollutedLocation: PollutedLocation;
  updatePage: (updatedPollutedLocation: PollutedLocation) => void;
}

export const pollutedLocationPageModes = ["view", "edit"] as const;

const PollutedLocationEditor: React.FC<Props> = ({
  pollutedLocation,
  updatePage,
}) => {
  const {
    formData,
    request,
    resetRequest,
    handleSeverityOnChange,
    handleRadiusOnChange,
    handleNotesOnChange,
    handleSubmit,
    isFormValid,
    resetForm,
  } = usePollutedLocationUpdateForm({ pollutedLocation, updatePage });

  const [mode, setMode] =
    useState<typeof pollutedLocationPageModes[number]>("view");

  const content = () => {
    switch (mode) {
      case "edit":
        return (
          <PollutedLocationUpdateForm
            pollutedLocation={pollutedLocation}
            formData={formData}
            handleNotesOnChange={handleNotesOnChange}
            handleRadiusOnChange={handleRadiusOnChange}
            handleSeverityOnChange={handleSeverityOnChange}
          />
        );
      case "view":
      default:
        return <PollutedLocationDetails {...pollutedLocation} />;
    }
  };

  return (
    <>
      <PollutedLocationHeader
        currentMode={mode}
        setMode={setMode}
        {...pollutedLocation}
        updateData={{
          request,
          resetRequest,
          handleSubmit,
          isFormValid,
          resetForm: resetForm,
        }}
      />
      {content()}
    </>
  );
};

export default PollutedLocationEditor;
