"use server";
import db from "@/lib/prisma";
export const getAllTemplates = async () => {
  try {
    return await db.template.findMany();
  } catch (err) {
    console.log(err);
  }
};
export const getTemplateById = async (id: string) => {
  try {
    return await db.template.findUnique({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
