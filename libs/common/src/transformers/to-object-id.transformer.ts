import { Transform } from "class-transformer";
import { ObjectId } from "mongodb";

export function ToObjectId() {
  return Transform(({ value }) => {
    if (typeof value === "string" && ObjectId.isValid(value)) {
      return new ObjectId(value);
    }
    return value;
  });
}
