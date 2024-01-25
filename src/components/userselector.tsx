import { UserContext } from "@/app/user-provider";
import { useContext } from "react";
import styles from "../app/main.module.css";
import { User } from "@/app/layout";

export default function UserSelector({ Users }: { Users: User[] }) {
  const { currentUser, setUser } = useContext(UserContext);

  function handleClick(user: User) {
    // set the clicked user as context
    if (user) {
      setUser(user);
    }
  }

  return (
    <div className={styles.userselect}>
      <ul>
        {Users.map((user) => (
          <li
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
