"use client";

import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import styles from "../infobox.module.css";
import { UserContext } from "@/app/user-provider";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Rating({
  isLoading,
  setLoading,
  rating,
  length,
}: {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  rating: number;
  length: number;
}) {
  const { currentUser, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(currentUser);
    setLoading(false);
  }, [rating]);

  return (
    <>
      <div className={styles.ratingbox}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <span>{length === 0 ? 0 : rating.toFixed(2)}</span>
        )}
        <span>/10</span>
        <p>{length} értékelés</p>
      </div>
    </>
  );
}
