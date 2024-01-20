"use client";

import Image, { StaticImageData } from "next/image";
import defaultImage from "../../../public/default_poster.png";
import styles from "./dramacards.module.css";
import Link from "next/link";
import { clsx } from "clsx";

type DramaProps = {
  id: number;
  name: string;
  network: string;
  year: number;
  episodes: number;
  poster: string;
  viewingDate: number;
};

export function DramaCards({
  id,
  name,
  network,
  year,
  episodes,
  poster,
  viewingDate,
  selected,
  setSelected,
}: DramaProps & any) {
  const posterUrl = poster === "default_poster.png" ? defaultImage : poster;

  function handleSelecting(id: number) {
    if (selected.includes(id)) {
      setSelected(selected.filter((s: number) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  return (
    <div
      className={clsx(
        styles.outerCard,
        selected.includes(id) && styles.selected
      )}
    >
      <div className={styles.card}>
        <div className={styles.checkboxWrapper}>
          {" "}
          <input
            onClick={() => handleSelecting(id)}
            type="checkbox"
            name=""
            id=""
            className={styles.checkbox}
            defaultChecked={selected.includes(id)}
            checked={selected.includes(id)}
          />
        </div>

        <div className={styles.boritokep}>
          <Image
            src={posterUrl}
            alt={`${name} posztere`}
            width={210}
            height={300}
          />
        </div>
        <div>
          <Link href={`/dramas/${id}`}>
            <h3>{name}</h3>
          </Link>
          <p>{network}</p>
          <p>{year}</p>
          <p>{episodes}</p>
          <p>Megnézve: {viewingDate}</p>
          <p>{id}</p>
        </div>
      </div>
      <div className={styles.background}>
        <Image
          src={posterUrl}
          alt={`${name} posztere`}
          width={50}
          height={100}
        />
      </div>
    </div>
  );
}
