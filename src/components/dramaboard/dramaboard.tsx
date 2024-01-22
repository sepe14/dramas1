import styles from "./page.module.css";
import { DramaCards } from "@/components/dramaboard/dramacards";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import DramaBoardViewer from "./dramaboardviewer";

function getDramas(searchParams: {
  id: string | undefined;
  orderBy: string | undefined;
  order: string | undefined;
  network: string | undefined;
}) {
  const orderBy =
    searchParams.orderBy === "year" || searchParams.orderBy === "viewingDate"
      ? searchParams.orderBy
      : "year";

  const order =
    searchParams.order === "asc" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc;

  return prisma.titles.findMany({
    orderBy: [
      {
        [orderBy]: order,
      },
      {
        name: "asc",
      },
    ],
    where: {
      network: searchParams.network ? searchParams.network : undefined,
    },

    include: {
      ratings: true,
      categories: true, // Include ratings relation
    },
  });
}

export default async function DramaBoard({
  searchParams,
  networks,
  categories,
}: {
  searchParams: {
    id: string | undefined;
    orderBy: string | undefined;
    order: string | undefined;
    network: string | undefined;
    selected: string | undefined;
  };
  networks: { network: string }[];
  categories: {
    id: number;
    name: string;
  }[];
}) {
  const dramas = await getDramas(searchParams);

  const dramasWRating = dramas.map((drama) => {
    const averageRating =
      drama.ratings.reduce((sum, rating) => sum + rating.value, 0) /
      drama.ratings.length;
    return { ...drama, averageRating };
  });

  return (
    <DramaBoardViewer
      dramas={dramasWRating}
      networks={networks}
      categories={categories}
    />
  );
}
