import { Suspense } from "react";
import styles from "./page.module.css";
import { DramaCards } from "@/components/dramacards";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import Filters from "@/components/filters";
import DramaBoard from "@/components/dramaboard";

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

export default async function Home({
  searchParams,
}: {
  searchParams: {
    id: string | undefined;
    orderByRelease: string | undefined;
    network: string | undefined;
  };
}) {
  const distinctNetworks = await prisma.titles.findMany({
    distinct: ["network"],
    select: { network: true },
  });

  return (
    <div>
      <Filters networks={distinctNetworks} />

      <Suspense fallback={<p>Betöltés...</p>}>
        <DramaBoard searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
