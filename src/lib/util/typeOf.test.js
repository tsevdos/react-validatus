import typeOf from "./typeOf";

describe("type: ", () => {
  it("returns true if input is string", () => {
    expect(typeOf(null)).toBe("null");
    expect(typeOf(undefined)).toBe("undefined");
    expect(typeOf({})).toBe("object");
    expect(typeOf([])).toBe("array");
    expect(typeOf("test")).toBe("string");
    expect(typeOf(12)).toBe("number");
    expect(typeOf(true)).toBe("boolean");
  });
});
