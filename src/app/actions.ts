"use server";

import { prisma } from "@/db";

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
  return "succes";
}

export async function saveNewCategory(Formadata: FormData) {}
