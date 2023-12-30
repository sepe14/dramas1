"use client";

import styles from "./infobox.module.css";

export default function Rating({
  rating,
  length,
}: {
  rating: number;
  length: number;
}) {
  return (
    <>
      <div className={styles.ratingbox}>
        <span>{rating}</span>
        <span>/10</span>
        <p>{length} értékelés</p>
      </div>
    </>
  );
}
