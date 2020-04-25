import { destinationInfo } from "../client/js/destinationInfo";

describe("destinationInfo", () => {
  test("destinationInfo should be defined", () => {
    expect(destinationInfo).toBeDefined();
  });
});

describe("destinationInfo", () => {
  test("destinationInfo should be a function", () => {
    expect(typeof destinationInfo).toBe("function");
  });
});
