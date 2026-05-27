const API = 'https://banking-api-wo4z.onrender.com';

const headers = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` })
});

export const login = (card_number, pin) =>
  fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ card_number, pin })
  }).then(r => r.json());

export const register = (data) =>
  fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(r => r.json());

export const getBalance = (token) =>
  fetch(`${API}/account/balance`, {
    headers: headers(token)
  }).then(r => r.json());

export const withdraw = (token, amount) =>
  fetch(`${API}/account/withdraw`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({ amount })
  }).then(r => r.json());

export const deposit = (token, amount) =>
  fetch(`${API}/account/deposit`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({ amount })
  }).then(r => r.json());

export const closeAccount = (token) =>
  fetch(`${API}/account/account`, {
    method: 'DELETE',
    headers: headers(token)
  }).then(r => r.json());