import styles from "./page.module.css";
import { DramaCards } from "@/components/dramacards";
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
  });
}

export default async function DramaBoard({
  searchParams,
  networks,
}: {
  searchParams: {
    id: string | undefined;
    orderBy: string | undefined;
    order: string | undefined;
    network: string | undefined;
    selected: string | undefined;
  };
  networks: { network: string }[];
}) {
  const dramas = await getDramas(searchParams);

  return <DramaBoardViewer dramas={dramas} networks={networks} />;
}
