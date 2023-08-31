import { FieldError } from './field_errors';

export type APIErrorResult = {
    errorsMessages: Array<FieldError>
}