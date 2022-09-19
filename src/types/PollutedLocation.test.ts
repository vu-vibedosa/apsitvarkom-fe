import PollutedLocationDTO from "./backEnd/PollutedLocationDTO";
import PollutedLocation, { mapToPollutedLocationDTO } from "./PollutedLocation";

describe("Mapping from PollutedLocation to PollutedLocationDTO", () => {
  test("Empty object", () => {
    const input: PollutedLocation = {};

    expect(mapToPollutedLocationDTO(input)).toEqual({});
  });

  test("Converts spotted date", () => {
    const dateString = "2011-10-05T14:48:00.000Z";
    const input: PollutedLocation = {
      spotted: new Date(dateString),
    };

    expect(mapToPollutedLocationDTO(input).spotted).toEqual(dateString);
  });

  const baseMock: Partial<PollutedLocation> = {
    id: "normal-guid-here",
    progress: 15,
    radius: 3,
    spotted: new Date(),
    severity: "moderate",
    notes: "Lorem ipsum",
  };

  test("Missing nested object's fields", () => {
    const input: PollutedLocation = {
      ...baseMock,
      location: {},
    };

    expect(mapToPollutedLocationDTO(input).location).toStrictEqual({});
  });

  test("Full object", () => {
    const dateString = "2022-04-24T14:54:40.020Z";
    const input: PollutedLocation = {
      ...baseMock,
      spotted: new Date(dateString),
      location: {
        latitude: 1,
        longitude: 2,
      },
    };

    const expectedDTO: PollutedLocationDTO = {
      ...input,
      spotted: dateString,
    };

    expect(mapToPollutedLocationDTO(input)).toEqual(expectedDTO);
  });
});

export default {};
