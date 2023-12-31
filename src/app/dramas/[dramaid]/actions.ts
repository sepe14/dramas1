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
import { title } from "process";

export default async function saveRating(
  titlesId: number,
  usersId: number,
  ratingData: ratingData | undefined,
  formData: FormData
) {
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
