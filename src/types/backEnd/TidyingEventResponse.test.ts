import TidyingEventResponse, {
  mapToTidyingEvent,
} from "./TidyingEventResponse";

describe("Mapping from TidyingEventResponse to TidyingEvent", () => {
  test("Empty object", () => {
    const input: TidyingEventResponse = {};

    expect(mapToTidyingEvent(input)).toEqual({});
  });

  test("Valid startTime date", () => {
    const dateString = "2022-09-19T20:18:01.050Z";
    const input: TidyingEventResponse = {
      startTime: dateString,
    };

    expect(mapToTidyingEvent(input).startTime?.toISOString()).toEqual(
      dateString
    );
  });

  test("Invalid startTime date", () => {
    const dateString = "this-is-not-a-date";
    const input: TidyingEventResponse = {
      startTime: dateString,
    };

    expect(mapToTidyingEvent(input).startTime).toBeUndefined();
  });
});

export default {};
