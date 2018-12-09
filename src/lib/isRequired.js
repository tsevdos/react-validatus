import assertString from "./util/assertString";

export default function isRequired(str, options = { ignore_whitespace: false }) {
  assertString(str);
  const strLength = options.ignore_whitespace ? str.trim().length : str.length;

  return !(strLength === 0);
}
