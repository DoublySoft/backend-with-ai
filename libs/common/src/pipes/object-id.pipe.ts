import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Injectable()
export class ObjectIdPipe implements PipeTransform<string, ObjectId> {
  transform(value: string): ObjectId {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException(`Invalid ObjectId: ${value}`);
    }
    return new ObjectId(value);
  }
}
