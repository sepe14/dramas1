"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import styles from "./dramacards.module.css";

export default function Filters({
  networks,
  selected,
}: {
  networks: { network: string }[];
  selected: number[];
}) {
  // https://nextjs.org/docs/app/api-reference/functions/use-search-params#examples

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.network}>
          {networks.map((network, index) => (
            <Link
              href={
                // <pathname>?sort=desc
                pathname + "?" + createQueryString("network", network.network)
              }
              key={index}
            >
              <p
                style={{
                  backgroundColor:
                    network.network === searchParams.get("network")
                      ? "white"
                      : "black",
                  color:
                    network.network === searchParams.get("network")
                      ? "black"
                      : "white",
                }}
              >
                {network.network}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
