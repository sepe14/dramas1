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
    id: number;
    name: string;
    network: string;
    year: number;
    episodes: number;
    poster: string;
    viewingDate: number;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
  networks: { network: string }[];
  categories: {
    id: number;
    name: string;
  }[];
}) {
  const [selected, setSelected] = useState([]);

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
