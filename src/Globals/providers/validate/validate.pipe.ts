/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { RegisterDto } from 'src/Authentication/dtos';

@Injectable()
export class JoiValidationPipe implements PipeTransform<RegisterDto> {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(this.modifyErrors(error));
    }
    
    return value;
  }

  errorReducer(accumulatedErrorObject, currentError) {
    return Object.assign(accumulatedErrorObject, {
      [currentError.context.label || currentError.context.key]:
        currentError.message.replace(new RegExp('"', 'ig'), ''),
    });
  }

  modifyErrors(errors) {
    return !errors.details
      ? errors.message
      : errors.details.reduce(this.errorReducer, {});
  }
}
