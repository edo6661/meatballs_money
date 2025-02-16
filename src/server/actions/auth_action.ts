"use server";

import { CREDENTIALS } from "@/constants/auth_contant";
import { AUTH_VALIDATION, SHARED } from "@/constants/il8n";
import { handleActionError } from "@/helper/handle_action_error";
import { signIn } from "@/lib/auth";
import db from "@/lib/prisma";
import { getLoginSchema, getRegisterSchema } from "@/lib/zod/auth_schema";
import { SignUpState } from "@/types/auth_type";
import bcrypt from "bcryptjs";
import { getTranslations } from "next-intl/server";

export const register = async (
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> => {
  const t = await getTranslations(AUTH_VALIDATION);
  const s = await getTranslations(SHARED);
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
      message: t("successRegister"),
    };
  } catch (err) {
    await handleActionError(err);
    return {
      error: s("error.somethingWentWrong"),
    };
  }
};

export const login = async (
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> => {
  const t = await getTranslations(AUTH_VALIDATION);
  const s = await getTranslations(SHARED);
  const email = formData.get("email");
  const password = formData.get("password");

  const result = getLoginSchema(t).safeParse({
    email,
    password,
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
    if (!userExist) {
      return {
        formErrors: {
          email: [t("email.notExists")],
        },
      };
    }
    const comparePassword = await bcrypt.compare(
      result.data.password,
      userExist.password!
    );
    if (!comparePassword) {
      return {
        formErrors: {
          password: [t("password.notMatch")],
        },
      };
    }
    await signIn(CREDENTIALS, {
      email,
      password,
      redirect: false,
    });
    return {
      message: t("successLogin"),
    };
  } catch (err) {
    await handleActionError(err);
    return {
      error: s("error.somethingWentWrong"),
    };
  }
};
