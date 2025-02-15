"use server";

import db from "@/lib/prisma";
import { templateSchema } from "@/lib/zod/template_schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTemplate = async (data: z.infer<typeof templateSchema>) => {
  try {
    const template = await db.template.create({
      data: {
        ...data,
      },
    });
    await db.template.create({
      data: {
        ...data,
      },
    });
    revalidatePath("/templates");
    return template;
  } catch (e) {
    console.error(e);
  }
};

export const updateTemplate = async (data: z.infer<typeof templateSchema>) => {
  try {
    const template = await db.template.update({
      where: { id: data.name },
      data: {
        ...data,
      },
    });
    revalidatePath("/templates");
    return template;
  } catch (e) {
    console.error(e);
  }
};

export const deleteTemplate = async (id: string) => {
  try {
    await db.template.delete({
      where: { id },
    });
    revalidatePath("/templates");
  } catch (e) {
    console.error(e);
  }
};
