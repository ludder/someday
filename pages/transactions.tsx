import type { NextPage } from "next";
import { useBank } from "../contexts/BankContext";
import { TransactionsOverview } from "../components/AccountOverview/TransactionsOverview";

const TransactionsPage: NextPage = () => {
  const {
    state: { transactions = [] },
  } = useBank();

  return <TransactionsOverview />;
};

export default TransactionsPage;
