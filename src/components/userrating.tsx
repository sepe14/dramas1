"use client";

import saveRating from "@/app/dramas/[dramaid]/actions";

type Rating = {
  id: number;
  value: number;
  usersId: number;
  titlesId: number;
  createdAt: Date;
  updatedAt: Date | null;
};

export default function UserRating({
  titlesId,
  usersId,
  rating,
}: {
  titlesId: number;
  usersId: number;
  rating: Rating | undefined;
}) {
  const saveRatingId = saveRating.bind(null, titlesId, usersId, rating);
  return (
    <form action={saveRatingId}>
      <input
        type="number"
        name="rating"
        id="rating-inp"
        defaultValue={rating?.value}
      />
      <button type="submit">Mentés</button>
    </form>
  );
}
