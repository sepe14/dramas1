import { Suspense } from "react";
import styles from "./page.module.css";
import { DramaCards } from "@/components/dramaboard/dramacards";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import Filters from "@/components/dramaboard/filters";
import DramaBoard from "@/components/dramaboard/dramaboard";
import GridSkeleton from "@/components/gridskeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    id: string | undefined;
    orderBy: string | undefined;
    order: string | undefined;
    network: string | undefined;
    selected: string | undefined;
  };
}) {
  const distinctNetworks = await prisma.titles.findMany({
    distinct: ["network"],
    select: { network: true },
  });

  const categories = await prisma.category.findMany();
  const keyString = `id=${searchParams.id}&network=${searchParams?.network}`;
  return (
    <div>
      <Suspense
        key={keyString}
        fallback={
          <>
            <Filters selected={[]} networks={distinctNetworks} />
            <GridSkeleton />
          </>
        }
      >
        <DramaBoard
          searchParams={searchParams}
          networks={distinctNetworks}
          categories={categories}
        />
      </Suspense>
    </div>
  );
}
