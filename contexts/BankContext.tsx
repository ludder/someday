// Thanks to https://kentcdodds.com/blog/how-to-use-react-context-effectively for quick setup
import * as React from "react";

type Account = {
  id: number;
  name: string;
  balance: number;
};
type Action =
  | {
      type: "add_account";
      account: Omit<Account, "id">;
    }
  | {
      type: "transfer";
      fromAccount: number;
      toAccount: number;
      amount: number;
    };
type TransactionLog = {
  date: string;
  fromAccount: number;
  toAccount: number;
  amount: number;
};
type Dispatch = (action: Action) => void;
type State = { accounts: Account[]; transactions: TransactionLog[] };
type BankProviderProps = { children: React.ReactNode };

const BankStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function generateId(accounts: Account[]) {
  const accountIds = accounts.map((account) => account.id);
  return Math.max(...accountIds) + 1;
}

function bankReducer(state: State, action: Action) {
  switch (action.type) {
    case "add_account": {
      const newAccount = {
        id: generateId(state.accounts),
        ...action.account,
      };
      const accounts = [...state.accounts, newAccount];
      return { ...state, accounts };
    }

    case "transfer": {
      const fromAccount = state.accounts.find(
        (account) => account.id === action.fromAccount
      );
      const toAccount = state.accounts.find(
        (account) => account.id === action.toAccount
      );

      if (!fromAccount || !toAccount) {
        throw new Error("Account not found");
      }

      const restAccounts = state.accounts.filter(
        (account) =>
          account.id !== action.fromAccount && account.id !== action.toAccount
      );

      const fromAccountBalance = fromAccount.balance - action.amount;
      const toAccountBalance = toAccount.balance + action.amount;

      const updatedFromAccount = {
        ...fromAccount,
        balance: fromAccountBalance,
      };
      const updatedToAccount = { ...toAccount, balance: toAccountBalance };

      const accounts = [updatedFromAccount, updatedToAccount, ...restAccounts];

      const transaction: TransactionLog = {
        date: new Date().toISOString(),
        fromAccount: action.fromAccount,
        toAccount: action.toAccount,
        amount: action.amount,
      };
      const transactions = [...state.transactions, transaction];

      return { ...state, accounts, transactions };
    }
  }
}

const defaultState = {
  accounts: [
    {
      id: 1,
      name: "Joris",
      balance: 1_000,
    },
    {
      id: 2,
      name: "Pim",
      balance: 2_000,
    },
  ],
  transactions: [],
};

function BankProvider({ children }: BankProviderProps) {
  const [state, dispatch] = React.useReducer(bankReducer, defaultState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <BankStateContext.Provider value={value}>
      {children}
    </BankStateContext.Provider>
  );
}

function useBank() {
  const context = React.useContext(BankStateContext);
  if (context === undefined) {
    throw new Error("useBank must be used within a BankProvider");
  }
  return context;
}

export { BankProvider, useBank };
