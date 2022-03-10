import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Nav.module.css";

export const Nav = () => {
  const router = useRouter();

  const getClassNames = (route: string) => {
    return router.asPath === route
      ? styles.item.concat(" ", styles.active)
      : styles.item;
  };

  return (
    <nav>
      <ul className={styles.list}>
        <li className={getClassNames("/")}>
          <Link href="/">Account overview</Link>
        </li>
        <li className={getClassNames("/create")}>
          <Link href="/create">Create account</Link>
        </li>
        <li className={getClassNames("/transfer")}>
          <Link href="/transfer">Transfer funds</Link>
        </li>
        <li className={getClassNames("/transactions")}>
          <Link href="/transactions">Transactions</Link>
        </li>
      </ul>
    </nav>
  );
};
