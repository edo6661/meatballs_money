import * as z from "zod";

export const getRegisterSchema = (t?: (key: string) => string) => {
  return loginSchema
    .extend({
      name: z.string().min(3, {
        message: t ? t("name.min") : "Name must be at least 3 characters",
      }),
      confirmPassword: z.string().min(3, {
        message: t
          ? t("password.min")
          : "Password must be at least 3 characters",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t ? t("confirmPassword.match") : "Password not match",
    });
};

export const getLoginSchema = (t?: (key: string) => string) => {
  return z.object({
    email: z.string().email({
      message: t ? t("email.format") : "Invalid email",
    }),
    password: z.string().min(3, {
      message: t ? t("password.min") : "Password must be at least 3 characters",
    }),
  });
};

// ! kalo pake react-form
export type RegisterFormValues = z.infer<
  Awaited<ReturnType<typeof getRegisterSchema>>
>;
export type LoginFormValues = z.infer<
  Awaited<ReturnType<typeof getLoginSchema>>
>;

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters",
  }),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters",
    }),
    confirmPassword: z.string().min(3, {
      message: "Password must be at least 3 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
  });
