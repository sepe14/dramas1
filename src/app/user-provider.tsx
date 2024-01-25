"use client";

import { createContext, useContext, useState } from "react";
import styles from "./main.module.css";
import { userAgentFromString } from "next/server";
import UserSelector from "@/components/userselector";
import { User } from "@/app/layout.tsx"

const initialValue: User = {
  id: 100,
  name: "alma",
  email: "alma",
  isAdmin: false,
  createdAt: null,
  updatedAt: null,
};

const init2: any = "alma";


export const UserContext = createContext({
  currentUser: initialValue,
  setUser: init2,
});


export default function UserProvider({
  children,
  Users,
}: {
  children: React.ReactNode;
  Users: User[];
}) {
  // set the user with id 1 as default
  const initialUser = Users.find((user) => user.id === 1)
  const [currentUser, setUser] = useState(initialUser);

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
