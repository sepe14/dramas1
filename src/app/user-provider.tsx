"use client";

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

const initialValue: User = {
  id: 100,
  name: "alma",
  email: "alma",
  isAdmin: false,
  createdAt: null,
  updatedAt: null,
};

import { createContext, useContext, useState } from "react";
import styles from "./main.module.css";
import { userAgentFromString } from "next/server";
export const UserContext = createContext<User>(initialValue);
export default function UserProvider({
  children,
  Users,
}: {
  children: React.ReactNode;
  Users: {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
  }[];
}) {
  const [currentUser, setUser] = useState(Users.find((user) => user.id === 1));

  function handleClick(user: User) {
    if (user) {
      setUser(user);
    }
  }

  return (
    <>
      <div className={styles.userselect}>
        <ul>
          {Users.map((user) => (
            <li
              className={user === currentUser ? styles.selected : ""}
              key={user.id}
              onClick={() => handleClick(user)}
            >
              <div></div>
              <p>{user.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <UserContext.Provider value={currentUser ? currentUser : initialValue}>
        <main className={styles.main}>{children}</main>
      </UserContext.Provider>
    </>
  );
}
