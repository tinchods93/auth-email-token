import { ZodSchema } from 'zod';
import SchemaException from '../errors/SchemaException';

export default class SchemaValidator {
  constructor(private schema: ZodSchema) {}

  public validate(data: any) {
    try {
      return this.schema.parse(data);
    } catch (error) {
      console.log('SCHEMA VALIDATION ERROR', error);
      throw new SchemaException(error).handle();
    }
  }
}
