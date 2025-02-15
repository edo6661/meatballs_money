import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
  });
