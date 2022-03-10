import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AccountOverview } from "../components/AccountOverview/AccountOverview";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Someday Bank</title>
        <meta
          name="description"
          content="This bank doesn't cost you any money"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccountOverview />
    </div>
  );
};

export default Home;
