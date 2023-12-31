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

const init2: any = "alma";

import { createContext, useContext, useState } from "react";
import styles from "./main.module.css";
import { userAgentFromString } from "next/server";
import UserSelector from "@/components/userselector";
export const UserContext = createContext({
  currentUser: initialValue,
  setUser: init2,
});
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

  return (
    <>
      <UserContext.Provider
        value={{
          currentUser: currentUser ? currentUser : initialValue,
          setUser: setUser,
        }}
      >
        <UserSelector Users={Users} />
        <main className={styles.main}>{children}</main>
      </UserContext.Provider>
    </>
  );
}
