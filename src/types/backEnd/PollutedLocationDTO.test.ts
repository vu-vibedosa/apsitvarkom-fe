import { severityLevels } from "../PollutedLocation";
import PollutedLocationDTO, {
  mapToPollutedLocation,
} from "./PollutedLocationDTO";

describe("Mapping from PollutedLocationDTO to PollutedLocation", () => {
  test("Empty object", () => {
    const input: PollutedLocationDTO = {};

    expect(mapToPollutedLocation(input)).toEqual({});
  });

  test("Valid spotted date", () => {
    const dateString = "2022-09-19T20:18:01.050Z";
    const input: PollutedLocationDTO = {
      spotted: dateString,
    };

    expect(mapToPollutedLocation(input).spotted?.toISOString()).toEqual(
      dateString
    );
  });

  test("Invalid spotted date", () => {
    const dateString = "this-is-not-a-date";
    const input: PollutedLocationDTO = {
      spotted: dateString,
    };

    expect(mapToPollutedLocation(input).spotted).toBeUndefined();
  });

  test("Invalid severity", () => {
    const input: PollutedLocationDTO = {
      severity: "foo",
    };

    expect(mapToPollutedLocation(input).severity).toBeUndefined();
  });

  test("Valid severity", () => {
    const input: PollutedLocationDTO = {
      severity: severityLevels[0],
    };

    expect(mapToPollutedLocation(input).severity).toBe(severityLevels[0]);
  });

  test("Valid severity case insensitive", () => {
    const input: PollutedLocationDTO = {
      severity: severityLevels[1].toUpperCase(),
    };

    expect(mapToPollutedLocation(input).severity).toBe(severityLevels[1]);
  });

  test("Missing nested object's fields", () => {
    const input: PollutedLocationDTO = {
      coordinates: {},
    };

    expect(mapToPollutedLocation(input).coordinates).toStrictEqual({});
  });
});

export default {};
