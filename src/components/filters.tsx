"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import styles from "./page.module.css";

export default function Filters({
  networks,
}: {
  networks: { network: string }[];
}) {
  // https://nextjs.org/docs/app/api-reference/functions/use-search-params#examples

  const router = useRouter();
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
      <div className={styles.network}>
        {networks.map((network, index) => (
          <Link
            href={
              // <pathname>?sort=desc
              pathname + "?" + createQueryString("network", network.network)
            }
            key={index}
          >
            <p>{network.network}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
