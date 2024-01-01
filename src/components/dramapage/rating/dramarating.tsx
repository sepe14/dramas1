"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/app/user-provider";
import styles from "../infobox.module.css";
import Rating from "./currentrating";
import UserRating from "./userrating";

type Rating = {
  id: number;
  value: number;
  usersId: number;
  titlesId: number;
  createdAt: Date;
  updatedAt: Date | null;
}[];

type DramaProps = {
  id: number;
  name: string;
  network: string;
  year: number;
  episodes: number;
  poster: string;
  viewingDate: number;
};

export default function DramaRating({
  dramaData,
  ratings,
}: {
  dramaData: DramaProps;
  ratings: Rating;
}) {
  const [isLoading, setLoading] = useState(false);

  function getCurrentRating(id: number) {
    const rating = ratingsData.find((rating) => rating.usersId === id);
    return rating;
  }

  const ratingsData = Object.values(ratings);

  const avarageRating =
    ratingsData.reduce((total, rating) => total + rating.value, 0) /
    ratingsData.length;

  const { currentUser } = useContext(UserContext);

  const currentUserRating = getCurrentRating(currentUser.id);

  return (
    <div className={styles.infobox}>
      <Rating
        isLoading={isLoading}
        setLoading={setLoading}
        rating={avarageRating}
        length={ratingsData.length}
      />
      <UserRating
        setLoading={setLoading}
        titlesId={dramaData.id}
        usersId={currentUser.id}
        rating={currentUserRating}
      />
    </div>
  );
}
