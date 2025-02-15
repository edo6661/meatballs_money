"use server";

import db from "@/lib/prisma";
import { registerSchema } from "@/lib/zod/auth_schema";
import { executeAction } from "@/utils/execute_action";
import bcrypt from "bcryptjs";

export const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");
      const validatedPayload = registerSchema.parse({
        name,
        email,
        password,
        confirmPassword,
      });
      console.log("validatedPayload", validatedPayload);
      const hashedPassword = await bcrypt.hash(validatedPayload.password, 10);

      try {
        await db.user.create({
          data: {
            email: validatedPayload.email,
            name: validatedPayload.name,
            password: hashedPassword,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });
};
