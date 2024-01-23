"use client";

import Filters from "./filters";
import styles from "./page.module.css";
import { DramaCards } from "./dramacards";
import { useState } from "react";
import ToolBar from "./toolbar";
import { DramasProp } from "./dramaboard";

export default function DramaBoardViewer({
  dramas,
  networks,
  categories,
}: {
  dramas: DramasProp;
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
