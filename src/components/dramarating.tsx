"use client";

import { useContext } from "react";
import { UserContext } from "@/app/user-provider";
import styles from "./infobox.module.css";
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
  function getCurrentRating(id: number) {
    const rating = ratingsData.find((rating) => rating.usersId === id);
    return rating;
  }

  const ratingsData = Object.values(ratings);

  console.log(ratingsData);

  const avarageRating =
    ratingsData.reduce((total, rating) => total + rating.value, 0) /
    ratingsData.length;

  const currentUser = useContext(UserContext);

  console.log(currentUser);

  const currentUserRating = getCurrentRating(currentUser.id);

  console.log(currentUserRating);

  return (
    <div className={styles.infobox}>
      <Rating rating={avarageRating} length={ratingsData.length} />
      <UserRating
        titlesId={dramaData.id}
        usersId={currentUser.id}
        rating={currentUserRating}
      />
    </div>
  );
}
