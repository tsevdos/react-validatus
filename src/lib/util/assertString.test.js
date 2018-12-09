import assertString from "./assertString";

describe("assertString: ", () => {
  it("returns true if input is string", () => {
    expect(assertString("test")).toBe(true);
    expect(assertString("12")).toBe(true);
    expect(assertString("true")).toBe(true);
    expect(assertString("false")).toBe(true);
    expect(assertString("12/15/2018")).toBe(true);
    expect(assertString("2019")).toBe(true);
    expect(assertString("000996000")).toBe(true);
  });

  it("throws an error if input is not a string", () => {
    expect(() => assertString({ a: "test" })).toThrowError("Expected string but received object.");
    expect(() => assertString(["test"])).toThrowError("Expected string but received array.");
    expect(() => assertString(12)).toThrowError("Expected string but received number.");
    expect(() => assertString(true)).toThrowError("Expected string but received boolean.");
    expect(() => assertString(null)).toThrowError("Expected string but received null.");
    expect(() => assertString(undefined)).toThrowError("Expected string but received undefined.");
  });
});
