import bcrypt from 'bcrypt';
import { getUserByEmail } from '../users/userRepository';
import ExistingUserEntity from '../users/entities/existingUserEntity';
import { LoginInputType } from './types/authenticationTypes';
import LoginException from '../errors/LoginException';
import { LoginSchema } from '../models/schemas/LoginSchema';
import SchemaValidator from '../models/SchemaValidator';

export async function Login(input: LoginInputType) {
  const schemaValidation = new SchemaValidator(LoginSchema).validate(input);
  console.log('schemaValidation', schemaValidation);

  const user = await getUserByEmail({ email: input.email });

  if (!user) {
    throw new LoginException().handle();
  }

  const isPasswordCorrect = bcrypt.compareSync(input.password, user?.password);

  if (!isPasswordCorrect) {
    throw new LoginException().handle();
  }

  return new ExistingUserEntity(user).get();
}
