import Image from "next/image";
import { Suspense } from "react";
import styles from "./page.module.css";
import { DramaCards } from "@/components/dramacards";
import { GetServerSideProps } from "next";
import { prisma } from "@/db";

function getDramas() {
  return prisma.titles.findMany({
    orderBy: [
      {
        year: "desc",
      },
      {
        name: "asc",
      },
    ],
  });
}

export default async function Home() {
  const dramas = await getDramas();
  return (
    <div className={styles.grid}>
      {/* <Filters/> */}
      {dramas.map((drama) => (
        <DramaCards key={drama.id} {...drama} />
      ))}
    </div>
  );
}
