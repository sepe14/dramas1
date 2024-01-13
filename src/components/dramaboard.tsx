import styles from "./page.module.css";
import { DramaCards } from "@/components/dramacards";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";

function getDramas(searchParams: {
  id: string | undefined;
  orderByRelease: string | undefined;
  network: string | undefined;
}) {
  return prisma.titles.findMany({
    orderBy: [
      {
        year: searchParams.orderByRelease
          ? searchParams.orderByRelease === "asc"
            ? Prisma.SortOrder.asc
            : Prisma.SortOrder.desc
          : "desc",
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
}: {
  searchParams: {
    id: string | undefined;
    orderByRelease: string | undefined;
    network: string | undefined;
  };
}) {
  const dramas = await getDramas(searchParams);

  return (
    <div className={styles.grid}>
      {dramas.map((drama) => (
        <DramaCards key={drama.id} {...drama} />
      ))}
    </div>
  );
}
