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
          <Link href="/">Home</Link>
        </li>
        <li className={getClassNames("/create")}>
          <Link href="/create">Create account</Link>
        </li>
        <li className={getClassNames("/transfer")}>
          <Link href="/transfer">Transfer funds</Link>
        </li>
      </ul>
    </nav>
  );
};
