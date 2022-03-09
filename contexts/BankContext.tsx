// Thanks to https://kentcdodds.com/blog/how-to-use-react-context-effectively for quick setup
import * as React from 'react'

// type Action = { type: 'increment' } | { type: 'decrement' }
type Action = {
  type: 'add' | 'remove'
}
type Dispatch = (action: Action) => void
type Account = {
  id: number;
  name: string;
  balance: number;
}
type State = { accounts: Account[] }
type BankProviderProps = { children: React.ReactNode }

const BankStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function bankReducer(state: State, action: Action) {
  switch (action.type) {
    case 'add': {
      return state;
    }
    case 'remove': {
      return state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const defaultState = {
  accounts: [
    {
      id: 1,
      name: 'Joris',
      balance: 1_000,
    },
    {
      id: 2,
      name: 'Pim',
      balance: 2_000,
    },
  ]
}

function BankProvider({ children }: BankProviderProps) {
  const [state, dispatch] = React.useReducer(bankReducer, defaultState)
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch }
  return (
    <BankStateContext.Provider value={value}>
      {children}
    </BankStateContext.Provider>
  )
}

function useBank() {
  const context = React.useContext(BankStateContext)
  if (context === undefined) {
    throw new Error('useBank must be used within a BankProvider')
  }
  return context
}

export { BankProvider, useBank }
