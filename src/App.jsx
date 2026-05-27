import { useState } from 'react';
import { authApi, bankingApi } from './api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');

  const handleLogin = async () => {
    try {
      // Zëvendëso me vlerat që ke në DB për testim
      const res = await authApi.login('1234567890123456', '1234');
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert('Login dështoi: ' + err.response?.data?.error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await bankingApi.withdraw(amount);
      alert('Tërheqje e suksesshme!');
      setAmount('');
    } catch (err) {
      alert('Gabim: ' + err.response?.data?.error);
    }
  };

  const handleClose = async () => {
    if (confirm('Jeni i sigurt?')) {
      await bankingApi.closeAccount();
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>BankApp</h1>
      {!token ? (
        <button onClick={handleLogin}>Login (Test User)</button>
      ) : (
        <div>
          <h3>Balanca: {balance ? `${balance} €` : '---'}</h3>
          <button onClick={async () => {
            const res = await bankingApi.getBalance();
            setBalance(res.data.user.balance);
          }}>Shiko Balancën</button>
          
          <div style={{ marginTop: '20px' }}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Shuma" />
            <button onClick={handleWithdraw}>Tërhiq</button>
          </div>

          <button onClick={handleClose} style={{ marginTop: '20px', color: 'red' }}>Mbyll Llogarinë</button>
        </div>
      )}
    </div>
  );
}

export default App;