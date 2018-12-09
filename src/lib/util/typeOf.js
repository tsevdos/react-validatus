export default function typeOf (input) {
  let type = typeof input;

  if (input === null) {
    type = "null";
  }

  if (Array.isArray(input)) {
    type = "array";
  }

  return type;
}
