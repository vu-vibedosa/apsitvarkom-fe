import CleaningEventResponse, {
  mapToCleaningEvent,
} from "./CleaningEventResponse";

describe("Mapping from CleaningEventResponse to CleaningEvent", () => {
  test("Empty object", () => {
    const input: CleaningEventResponse = {};

    expect(mapToCleaningEvent(input)).toEqual({});
  });

  test("Valid startTime date", () => {
    const dateString = "2022-09-19T20:18:01.050Z";
    const input: CleaningEventResponse = {
      startTime: dateString,
    };

    expect(mapToCleaningEvent(input).startTime?.toISOString()).toEqual(
      dateString
    );
  });

  test("Invalid startTime date", () => {
    const dateString = "this-is-not-a-date";
    const input: CleaningEventResponse = {
      startTime: dateString,
    };

    expect(mapToCleaningEvent(input).startTime).toBeUndefined();
  });
});

export default {};
