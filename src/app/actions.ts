"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function saveCategories(category: number, selected: number[]) {
  selected.forEach(async (dramaId) => {
    try {
      const updatedDrama = await prisma.titles.update({
        where: { id: dramaId },
        data: {
          categories: {
            connect: { id: category },
          },
        },
      });

      return updatedDrama;
    } catch (error) {
      // todo
    }
  });
  revalidatePath("/");
  return "succes";
}

export async function saveNewCategory(currentState: any, formData: FormData) {
  const schema = z.string();
  const categoryName = String(formData.get("name"));
  const validatedFields = schema.safeParse(categoryName);

  if (validatedFields.success && categoryName != null) {
    try {
      const save = await prisma.category.create({
        data: {
          name: categoryName,
        },
      });
      revalidatePath("/");
      return "succes";
    } catch (error) {
      return error;
    }
  }
}
