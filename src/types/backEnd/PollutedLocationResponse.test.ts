import { severityLevels } from "../PollutedLocation";
import PollutedLocationResponse, {
  mapToPollutedLocation,
} from "./PollutedLocationResponse";
import TidyingEventResponse from "./TidyingEventResponse";

describe("Mapping from PollutedLocationResponse to PollutedLocation", () => {
  test("Empty object", () => {
    const input: PollutedLocationResponse = {};

    expect(mapToPollutedLocation(input)).toEqual({});
  });

  test("Valid spotted date", () => {
    const dateString = "2022-09-19T20:18:01.050Z";
    const input: PollutedLocationResponse = {
      spotted: dateString,
    };

    expect(mapToPollutedLocation(input).spotted?.toISOString()).toEqual(
      dateString
    );
  });

  test("Invalid spotted date", () => {
    const dateString = "this-is-not-a-date";
    const input: PollutedLocationResponse = {
      spotted: dateString,
    };

    expect(mapToPollutedLocation(input).spotted).toBeUndefined();
  });

  test("Invalid severity", () => {
    const input: PollutedLocationResponse = {
      severity: "foo",
    };

    expect(mapToPollutedLocation(input).severity).toBeUndefined();
  });

  test("Valid severity", () => {
    const input: PollutedLocationResponse = {
      severity: severityLevels[0],
    };

    expect(mapToPollutedLocation(input).severity).toBe(severityLevels[0]);
  });

  test("Valid severity case insensitive", () => {
    const input: PollutedLocationResponse = {
      severity: severityLevels[1].toUpperCase(),
    };

    expect(mapToPollutedLocation(input).severity).toBe(severityLevels[1]);
  });

  test("Missing nested object's fields", () => {
    const input: PollutedLocationResponse = {
      location: {},
    };

    expect(mapToPollutedLocation(input).location).toStrictEqual({});
  });

  test("Several valid event instances", () => {
    const inst1: TidyingEventResponse = {
      startTime: "this-is-not-a-date-format",
      id: "123",
      notes: "abc",
    };
    const inst2: TidyingEventResponse = {
      startTime: "2022-09-19T20:18:01.050Z",
      pollutedLocationId: "456",
    };

    const input: PollutedLocationResponse = {
      events: [inst1, inst2],
    };

    const mappedLocationEvents = mapToPollutedLocation(input).events ?? [];
    expect(mappedLocationEvents[0].id).toEqual(inst1.id);
    expect(mappedLocationEvents[0].notes).toEqual(inst1.notes);
    expect(mappedLocationEvents[0].startTime?.toISOString()).toBeUndefined();
    expect(mappedLocationEvents[1].startTime?.toISOString()).toEqual(
      inst2.startTime
    );
    expect(mappedLocationEvents[1].pollutedLocationId).toEqual(
      inst2.pollutedLocationId
    );
  });

  test("Empty events array", () => {
    const input: PollutedLocationResponse = {
      events: undefined,
    };

    expect(mapToPollutedLocation(input).events).toStrictEqual([]);
  });
});

export default {};
