import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { RegisterDto } from 'src/Authentication/dtos';
export declare class JoiValidationPipe implements PipeTransform<RegisterDto> {
    private schema;
    constructor(schema: ObjectSchema);
    transform(value: any, metadata: ArgumentMetadata): any;
    errorReducer(accumulatedErrorObject: any, currentError: any): any;
    modifyErrors(errors: any): any;
}
