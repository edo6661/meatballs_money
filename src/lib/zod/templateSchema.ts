import * as z from "zod";

export const templateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
});
