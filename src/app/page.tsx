import { Suspense } from "react";
import { prisma } from "@/db";
import Filters from "@/components/dramaboard/filters";
import DramaBoard from "@/components/dramaboard/dramaboard";
import GridSkeleton from "@/components/gridskeleton";

export type searchParamsProp = {
  id: string | undefined;
  orderBy: string | undefined;
  order: string | undefined;
  network: string | undefined;
};

export default async function Home({
  searchParams,
}: {
  searchParams: searchParamsProp;
}) {
  // get list of unique networks
  const distinctNetworks = await prisma.titles.findMany({
    distinct: ["network"],
    select: { network: true },
  });

  // get list of categories
  const categories = await prisma.category.findMany();

  // generate new key on param change to rerender Suspense
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
