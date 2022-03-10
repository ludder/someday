import { useBank } from "../../contexts/BankContext";
import { formatAmount } from "../../utils";

export const TransactionsOverview = () => {
  const {
    state: { transactions },
  } = useBank();

  return (
    <>
      <h2>Transactions log</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>From account</th>
            <th>To account</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ date, fromAccount, toAccount, amount }) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{fromAccount}</td>
              <td>{toAccount}</td>
              <td className="align-right">{formatAmount(amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
