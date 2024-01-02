import { UserContext } from "@/app/user-provider";
import { useContext } from "react";
import styles from "../app/main.module.css";

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export default function UserSelector({ Users }: { Users: User[] }) {
  const { currentUser, setUser } = useContext(UserContext);

  function handleClick(user: User) {
    if (user) {
      setUser(user);
    }
  }

  return (
    <div className={styles.userselect}>
      <ul>
        {Users.map((user) => (
          <li
            className={user === currentUser ? styles.selected : ""}
            key={user.id}
            style={{
              border: user.id === currentUser.id ? "1px solid white" : "none",
            }}
            onClick={() => handleClick(user)}
          >
            <div></div>
            <p>{user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
