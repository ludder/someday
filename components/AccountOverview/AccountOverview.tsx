import { useBank } from "../../contexts/BankContext";
import { formatAmount } from "../../utils";

export const AccountOverview = () => {
  const { state } = useBank();
  const accounts = state.accounts.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <h2>Account overview</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.name}</td>
              <td className="align-right">{formatAmount(account.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
