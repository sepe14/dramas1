"use client";

import Filters from "./filters";
import styles from "./page.module.css";
import { DramaCards } from "./dramacards";
import { useEffect, useState } from "react";
import ToolBar from "./toolbar";

export default function DramaBoardViewer({
  dramas,
  networks,
  categories,
}: {
  dramas: {
    averageRating: number;
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
  }[];
  networks: { network: string }[];
  categories: {
    id: number;
    name: string;
  }[];
}) {
  const [selected, setSelected] = useState<number[]>([]);

  function resetSelected() {
    setSelected([]);
  }

  return (
    <>
      <div className={styles.grid}>
        {" "}
        {selected.length > 0 && <div className={styles.hideFilters}></div>}
        <Filters selected={selected} networks={networks} />
        {selected.length > 0 && (
          <ToolBar
            resetSelected={resetSelected}
            selected={selected}
            categories={categories}
          />
        )}
        {dramas.map((drama) => (
          <DramaCards
            selected={selected}
            setSelected={setSelected}
            key={drama.id}
            {...drama}
          />
        ))}
      </div>
    </>
  );
}
