import typeOf from "./typeOf";

export default function assertString(input) {
  const isString = typeOf(input) === "string";

  if (!isString) {
    throw new TypeError(`Expected string but received ${typeOf(input)}.`);
  }

  return true;
}
