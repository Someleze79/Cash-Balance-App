import React, { useReducer, useContext, createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

// Create Context
const AccountContext = createContext();

// Initial State
const initialState = { balance: 0 };

// Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case 'DEPOSIT':
      return { ...state, balance: state.balance + action.payload };
    case 'WITHDRAW':
      return { ...state, balance: state.balance - action.payload };
    case 'INTEREST':
      return { ...state, balance: state.balance * 1.05 };
    case 'CHARGES':
      return { ...state, balance: state.balance * 0.85 };
    default:
      return state;
  }
}

// Provider Component
function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AccountContext.Provider value={{ state, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
}

// Custom Hook
function useAccount() {
  return useContext(AccountContext);
}

// Reusable Button Component
function ActionButton({ label, onClick }) {
  return (
    <Button variant="primary" className="m-2" onClick={onClick}>
      {label}
    </Button>
  );
}

// Balance Display Component
function Balance() {
  const { state } = useAccount();
  return (
    <h2 className="text-center my-4">Current Balance: R{state.balance.toFixed(2)}</h2>
  );
}

// Controls Component
function Controls() {
  const { dispatch } = useAccount();
  const [amount, setAmount] = useState(0);

  const handleAmount = (e) => setAmount(Number(e.target.value));

  return (
    <div className="text-center">
      <input
        type="number"
        className="form-control w-25 mx-auto my-3"
        placeholder="Enter amount"
        value={amount}
        onChange={handleAmount}
      />
      <div>
        <ActionButton label="Deposit" onClick={() => dispatch({ type: 'DEPOSIT', payload: amount })} />
        <ActionButton label="Withdraw" onClick={() => dispatch({ type: 'WITHDRAW', payload: amount })} />
        <ActionButton label="Add Interest (5%)" onClick={() => dispatch({ type: 'INTEREST' })} />
        <ActionButton label="Charges (15%)" onClick={() => dispatch({ type: 'CHARGES' })} />
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <AccountProvider>
      <div className="container text-center mt-5">
        <h1 className="display-4 mb-4">Cash Balance Manager</h1>
        <Balance />
        <Controls />
      </div>
    </AccountProvider>
  );
}

export default App;