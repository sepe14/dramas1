"use server";

type ratingData = {
  id: number;
  value: number;
  usersId: number;
  titlesId: number;
  createdAt: Date;
  updatedAt: Date | null;
};

import { prisma } from "@/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  value: z
    .number({
      invalid_type_error: "Az értékelésnek 1 és 10 között kell lennie!",
    })
    .max(10)
    .min(1),
});

export default async function saveRating(
  titlesId: number,
  usersId: number,
  ratingData: ratingData | undefined,
  formData: FormData
) {
  const validatedFields = schema.safeParse({
    value: Number(formData.get("rating")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const value = Number(formData.get("rating"));

  if (!ratingData) {
    const Ratings = await prisma.ratings.create({
      data: {
        value,
        usersId,
        titlesId,
      },
    });
  }

  if (ratingData) {
    const Ratings = await prisma.ratings.update({
      where: {
        usersId: ratingData.usersId,
        titlesId: ratingData.titlesId,
        id: ratingData.id,
      },
      data: {
        value,
      },
    });
  }

  revalidateTag("ratings");
}
