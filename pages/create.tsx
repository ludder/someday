import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useBank } from "../contexts/BankContext";

const Home: NextPage = () => {
  const router = useRouter();
  const { state, dispatch } = useBank();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);

  return (
    <div className={styles.container}>
      <h2>Create account</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch({
            type: "add_account",
            account: { name, balance },
          });
          router.push("/");
        }}
      >
        <label htmlFor="name">Name</label>

        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="balance">Balance</label>
        <input
          type="number"
          id="balance"
          name="balance"
          value={balance}
          onChange={(event) => setBalance(Number(event.target.value))}
        />
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};

export default Home;
