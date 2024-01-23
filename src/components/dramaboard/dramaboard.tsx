import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import DramaBoardViewer from "./dramaboardviewer";
import { searchParamsProp } from "@/app/page";

export type DramasProp = {
  id: number;
  name: string;
  network: string;
  year: number;
  episodes: number;
  poster: string;
  viewingDate: number;
  createdAt: Date;
  updatedAt: Date | null;
  categories: {
    id: number;
    name: string;
  }[];
  ratings: {
    id: number;
    value: number;
    usersId: number;
    titlesId: number;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
  averageRating?: number;
}[];

function getDramas(searchParams: searchParamsProp) {
  let orderBy = "year";

  if (
    searchParams.orderBy === "year" ||
    searchParams.orderBy === "viewingDate"
  ) {
    orderBy = searchParams.orderBy;
  }

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
      categories: true,
    },
  });
}

function addAvarageRating(dramas: DramasProp): DramasProp {
  const dramaWithAvarage = dramas.map((drama) => {
    const averageRating =
      drama.ratings.reduce((sum, rating) => sum + rating.value, 0) /
      drama.ratings.length;
    return { ...drama, averageRating };
  });
  return dramaWithAvarage;
}

export default async function DramaBoard({
  searchParams,
  networks,
  categories,
}: {
  searchParams: searchParamsProp;
  networks: { network: string }[];
  categories: {
    id: number;
    name: string;
  }[];
}) {
  // load the dramas based on the search parameters
  const dramas = await getDramas(searchParams);

  // calculate avarage ratings because it can't be done with prisma
  const dramasWithAvarageRating = addAvarageRating(dramas);

  return (
    <DramaBoardViewer
      dramas={dramasWithAvarageRating}
      networks={networks}
      categories={categories}
    />
  );
}
