"use client";

import { UserContext } from "@/app/user-provider";
import saveRating from "@/app/dramas/[dramaid]/actions";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import ShowCurrentUsersRating from "./currentusersrating";
import RatingForm from "./ratingform";

type Rating = {
  id: number;
  value: number;
  usersId: number;
  titlesId: number;
  createdAt: Date;
  updatedAt: Date | null;
};

export default function UserRating({
  setLoading,
  titlesId,
  usersId,
  rating,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  titlesId: number;
  usersId: number;
  rating: Rating | undefined;
}) {
  const [key, setKey] = useState(0);
  const [isEditing, setEditing] = useState(false);

  // This effect runs after the page revalidates.
  useEffect(() => {
    setKey((prevKey) => prevKey + 1); // Update the key to trigger a re-render.
    setEditing(false);
  }, [useContext(UserContext)]);

  const saveRatingId = saveRating.bind(null, titlesId, usersId, rating);

  return (
    <>
      {rating ? (
        <ShowCurrentUsersRating
          setEditing={setEditing}
          isEditing={isEditing}
          usersrating={rating.value}
        />
      ) : (
        <RatingForm
          saveRatingId={saveRatingId}
          rating={undefined}
          key={key}
          setLoading={setLoading}
        />
      )}

      {isEditing && rating && (
        <RatingForm
          saveRatingId={saveRatingId}
          rating={rating.value}
          key={key}
          setLoading={setLoading}
        />
      )}
    </>
  );
}
