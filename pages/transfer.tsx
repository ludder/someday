
import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { useBank } from '../contexts/BankContext'

const Home: NextPage = () => {
  const router = useRouter()
  const { state: { accounts }, dispatch } = useBank();
  const [fromAccount, setFromAccount] = useState(0);
  const [toAccount, setToAccount] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <div className={styles.container}>
      <h2>Transfer funds</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        dispatch({
          type: 'transfer',
          fromAccount, toAccount, amount
        })
        router.push('/')
      }}>
        <label htmlFor='from_account'>From account:</label>
        <select name="from_account" id="from_account" defaultValue={fromAccount}
          onChange={(event) => setFromAccount(Number(event.target.value))}>
          <option value={0}>Select from account</option>
          {accounts.map(account => (
            <option key={account.id} value={account.id}>{account.name}</option>
          ))}
        </select>

        <br />

        <label htmlFor='to_account'>To account:</label>
        <select name="to_account" id="to_account" defaultValue={toAccount}
          onChange={(event) => setToAccount(Number(event.target.value))}>
          <option value={0}>Select to account</option>
          {accounts
            .filter(account => account.id !== fromAccount)
            .map(account => (
              <option key={account.id} value={account.id}>{account.name}</option>
            ))}
        </select>

        <br />

        <label htmlFor='amount'>Amount:</label>
        <input type="number" id="amount" name="amount" value={amount}
          onChange={(event) => setAmount(Number(event.target.value))} />

        <button type="submit"
          disabled={fromAccount === 0 || toAccount === 0 || amount === 0}>
          Transfer</button>
      </form>
    </div >

  )
}

export default Home
