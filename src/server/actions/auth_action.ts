"use server";

import { CREDENTIALS } from "@/constants/auth_contant";
import { handleActionError } from "@/helper/handle_action_error";
import { signIn } from "@/lib/auth";
import db from "@/lib/prisma";
import { loginSchema, registerSchema } from "@/lib/zod/auth_schema";
import bcrypt from "bcryptjs";
import { RedirectType } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export const register = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const validation = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!validation.success) {
    return;
  }

  try {
    const userExist = await db.user.findUnique({
      where: { email: validation.data.email },
    });
    if (userExist) {
      return;
    }
    const hashedPassword = await bcrypt.hash(validation.data.password, 10);
    await db.user.create({
      data: {
        email: validation.data.email,
        name: validation.data.name,
        password: hashedPassword,
      },
    });

    redirect("/auth/login", RedirectType.replace);
  } catch (err) {
    await handleActionError(
      err,
      "register_error",
      "/auth/register",
      "Terjadi kesalahan saat pendaftaran."
    );
    return;
  }
};

export const login = async (formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const validatedSchema = loginSchema.safeParse({
      email,
      password,
    });

    if (!validatedSchema.success) {
      return;
    }
    const userExist = await db.user.findUnique({
      where: { email: validatedSchema.data.email },
    });
    if (!userExist) {
      return;
    }

    const result = await signIn(CREDENTIALS, {
      email,
      password,
      redirect: false,
    });

    if (result?.error || !result) {
      return;
    }

    redirect(result.url || "/", RedirectType.replace);
  } catch (e) {
    await handleActionError(
      e,
      "login_error",
      "/auth/login",
      "Terjadi kesalahan saat login."
    );
  }
};
