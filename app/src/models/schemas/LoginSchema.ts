import { z } from 'zod';

export const LoginSchema = z
  .object({
    email: z.string().email().describe('Email must be a valid email address.'),
    password: z
      .string()
      .min(6)
      .describe('Password must be at least 6 characters long.'),
  })
  .strict();
