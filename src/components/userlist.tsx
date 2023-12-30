"use client";

import { useState } from "react";

export default function UserList({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string>();

  return (
    <>
      <div>
        <select onChange={(e) => setUser(e.target.value)} name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      {children}
    </>
  );
}
