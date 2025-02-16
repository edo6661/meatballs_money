"use server";

import { SignUpState } from "@/common/action_state";
import { CREDENTIALS } from "@/constants/auth_contant";
import { AUTH_VALIDATION } from "@/constants/il8n";
import { handleActionError } from "@/helper/handle_action_error";
import { signIn } from "@/lib/auth";
import db from "@/lib/prisma";
import { getRegisterSchema, loginSchema } from "@/lib/zod/auth_schema";
import bcrypt from "bcryptjs";
import { getTranslations } from "next-intl/server";
import { RedirectType } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export const register = async (
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> => {
  const t = await getTranslations(AUTH_VALIDATION);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const result = getRegisterSchema(t).safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!result.success) {
    return {
      formErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const userExist = await db.user.findUnique({
      where: { email: result.data.email },
    });
    if (userExist) {
      return {
        formErrors: {
          email: [t("email.exists")],
        },
      };
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    await db.user.create({
      data: {
        email: result.data.email,
        name: result.data.name,
        password: hashedPassword,
      },
    });
    return {
      message: t("success"),
    };
  } catch (err) {
    await handleActionError(
      err,
      "register_error",
      "/auth/register",
      "Terjadi kesalahan saat pendaftaran."
    );
    return {
      error: "Terjadi kesalahan saat pendaftaran.",
    };
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
