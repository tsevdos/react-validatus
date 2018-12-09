import isRequired from "./isRequired";

describe("isRequired", () => {
  it("returns true if input is not empty (even with whitespace)", () => {
    expect(isRequired("test")).toBe(true);
    expect(isRequired("12")).toBe(true);
    expect(isRequired("true")).toBe(true);
    expect(isRequired("false")).toBe(true);
    expect(isRequired("12/15/2018")).toBe(true);
    expect(isRequired("2019")).toBe(true);
    expect(isRequired("000996000")).toBe(true);
    expect(isRequired("   ")).toBe(true);
    expect(isRequired("  test    ")).toBe(true);
    expect(isRequired("test    ")).toBe(true);
  });

  it("returns false if input is empty", () => {
    expect(isRequired("")).toBe(false);
  });

  it("return false if input contains only whitespace", () => {
    expect(isRequired("     ", { ignore_whitespace: true })).toBe(false);
  });
});
