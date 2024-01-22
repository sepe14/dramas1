import { Dispatch, SetStateAction } from "react";
import styles from "./cerka.module.css";

export default function Cerka({
  setEditing,
  isEditing,
}: {
  setEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
}) {
  function handleClick(): void {
    setEditing(!isEditing);
  }

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => handleClick()}
        className={styles.cerka}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          {!isEditing ? (
            <path
              fill="white"
              d="M1.999 22h3.623a3 3 0 0 0 2.12-.878l14.79-14.789l-4.866-4.865L2.878 16.256a3 3 0 0 0-.879 2.122zm2-2v-1.622a1 1 0 0 1 .293-.707l2.158-2.158l2.037 2.036l-2.158 2.158a1 1 0 0 1-.707.293zm5.902-3.865l-2.037-2.037l9.802-9.801l2.037 2.036z"
            ></path>
          ) : (
            <path
              fill="white"
              d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6L8.4 17Zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
            ></path>
          )}
        </svg>
      </div>
    </>
  );
}
