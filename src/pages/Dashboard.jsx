import { useState, useEffect } from 'react'
import { getBalance, withdraw, deposit, closeAccount } from '../api'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important;
    background: #0a0f1e;
  }

  .dash-root {
    min-height: 100vh;
    width: 100%;
    background: #0a0f1e;
    font-family: 'Sora', sans-serif;
    color: #f9fafb;
    display: flex;
    flex-direction: column;
  }

  .dash-nav {
    background: #111827;
    border-bottom: 1px solid #1f2d45;
    padding: 0 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    flex-shrink: 0;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.3px;
  }

  .nav-logo-icon {
    width: 30px;
    height: 30px;
    background: #2563eb;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }

  .nav-user {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .nav-avatar {
    width: 32px;
    height: 32px;
    background: #1e3a5f;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: #60a5fa;
    flex-shrink: 0;
  }

  .nav-name {
    font-size: 13px;
    color: #9ca3af;
  }

  .btn-logout {
    background: transparent;
    border: 1px solid #1f2d45;
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 500;
    color: #9ca3af;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-logout:hover {
    border-color: #374151;
    color: #f9fafb;
  }

  .dash-body {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 0;
    width: 100%;
  }

  /* --- ZGJIDHJA PËR 3D FLIP NË IPHONE --- */
  .card-col {
    grid-row: 1 / 3;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid #1f2d45;
  }

  .card-scene {
    width: 100%;
    perspective: 1200px;
    -webkit-perspective: 1200px; /* Safari */
    cursor: pointer;
  }

  .card-3d {
    width: 100%;
    height: 240px;
    position: relative;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d; /* Safari */
    transition: transform 0.75s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-3d.flipped {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
  }

  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden; /* Safari */
    overflow: hidden;
    transform: translateZ(0); /* Izolon shtresat harduerike në iOS */
    -webkit-transform: translateZ(0);
  }

  .card-front {
    background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
    padding: 2rem 2.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transform: rotateY(0deg);
    -webkit-transform: rotateY(0deg);
    z-index: 2;
  }

  /* FIX: Detyrojmë rrethet dekorative të mos bëjnë glitch në prapavijë */
  .card-front::before {
    content: '';
    position: absolute;
    top: -50px; right: -50px;
    width: 200px; height: 200px;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .card-front::after {
    content: '';
    position: absolute;
    bottom: -70px; right: 70px;
    width: 220px; height: 220px;
    background: rgba(255,255,255,0.03);
    border-radius: 50%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .card-back {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 1;
  }

  .card-back-strip {
    width: 100%;
    height: 50px;
    background: #0a0818;
    margin-top: 32px;
    margin-bottom: 20px;
  }

  .card-back-content {
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .card-back-cvv-row {
    background: rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-back-cvv-label {
    font-size: 11px;
    color: rgba(255,255,255,0.5);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .card-back-cvv-val {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 6px;
  }

  .card-back-hint {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.3px;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    z-index: 1;
  }

  .card-bank-name {
    font-size: 17px;
    font-weight: 600;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .card-chip {
    width: 42px;
    height: 32px;
    background: linear-gradient(135deg, #d4af37, #f5d769, #b8960c);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }

  .card-chip::before {
    content: '';
    position: absolute;
    top: 50%; left: 0; right: 0;
    height: 1px;
    background: rgba(0,0,0,0.2);
    transform: translateY(-50%);
  }

  .card-chip::after {
    content: '';
    position: absolute;
    left: 50%; top: 0; bottom: 0;
    width: 1px;
    background: rgba(0,0,0,0.2);
    transform: translateX(-50%);
  }

  .card-balance-section {
    position: relative;
    z-index: 1;
  }

  .card-balance-label {
    font-size: 11px;
    color: rgba(255,255,255,0.55);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .card-balance-amount {
    font-size: 34px;
    font-weight: 600;
    color: #fff;
    letter-spacing: -1px;
  }

  .card-balance-amount span {
    font-size: 18px;
    font-weight: 400;
    opacity: 0.7;
    margin-right: 3px;
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    z-index: 1;
  }

  .card-holder-label {
    font-size: 10px;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .card-holder-name {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .card-network {
    display: flex;
    align-items: center;
  }

  .card-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    opacity: 0.9;
  }

  .card-circle-1 {
    background: #eb001b;
    margin-right: -12px;
    z-index: 1;
  }

  .card-circle-2 {
    background: #f79e1b;
  }

  .card-flip-hint {
    text-align: center;
    font-size: 11px;
    color: #374151;
    margin-top: 14px;
    letter-spacing: 0.3px;
  }

  /* ACTIONS COLUMN */
  .actions-col {
    display: flex;
    flex-direction: column;
  }

  .action-panel {
    flex: 1;
    padding: 2.5rem;
    border-bottom: 1px solid #1f2d45;
  }

  .action-panel:last-child {
    border-bottom: none;
  }

  .action-title {
    font-size: 11px;
    font-weight: 500;
    color: #6b7280;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }

  .action-input {
    width: 100%;
    background: #0d1424;
    border: 1px solid #1f2d45;
    border-radius: 10px;
    padding: 13px 16px;
    font-size: 16px;
    color: #f9fafb;
    font-family: 'Sora', sans-serif;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 12px;
  }

  .action-input:focus {
    border-color: #2563eb;
  }

  .action-input::placeholder {
    color: #2d3748;
  }

  .btn-deposit {
    width: 100%;
    background: #064e3b;
    color: #4ade80;
    border: 1px solid #065f46;
    border-radius: 10px;
    padding: 13px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-deposit:hover { background: #065f46; }

  .btn-withdraw {
    width: 100%;
    background: #1e3a5f;
    color: #60a5fa;
    border: 1px solid #1e40af;
    border-radius: 10px;
    padding: 13px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-withdraw:hover { background: #1e40af; }

  .msg-success {
    background: #0a1f0f;
    border: 1px solid #14532d;
    border-radius: 8px;
    padding: 10px 14px;
    color: #4ade80;
    font-size: 12px;
    margin-top: 10px;
  }

  .msg-error {
    background: #1f0a0a;
    border: 1px solid #7f1d1d;
    border-radius: 8px;
    padding: 10px 14px;
    color: #f87171;
    font-size: 12px;
    margin-top: 10px;
  }

  .danger-panel {
    padding: 2rem 2.5rem;
    border-top: 1px solid #2d1515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .danger-info h4 {
    font-size: 14px;
    font-weight: 500;
    color: #f87171;
    margin-bottom: 4px;
  }

  .danger-info p {
    font-size: 12px;
    color: #4b5563;
  }

  .btn-danger {
    background: #1f0a0a;
    color: #f87171;
    border: 1px solid #7f1d1d;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 500;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .btn-danger:hover { background: #450a0a; }

  .loading {
    min-height: 100vh;
    background: #0a0f1e;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    color: #6b7280;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .dash-nav { padding: 0 1rem; }
    .nav-name { display: none; }
    .dash-body { grid-template-columns: 1fr; grid-template-rows: auto; }
    .card-col { grid-row: auto; border-right: none; border-bottom: 1px solid #1f2d45; padding: 2rem 1.2rem; }
    .card-3d { height: 210px; }
    .card-front, .card-back { padding: 1.5rem; }
    .card-balance-amount { font-size: 28px; }
    .action-panel { padding: 2rem 1.2rem; }
    .danger-panel { padding: 2rem 1.2rem; flex-direction: column; align-items: flex-start; gap: 1.2rem; }
    .btn-danger { width: 100%; text-align: center; }
  }
`

export default function Dashboard({ token, onLogout }) {
  const [user, setUser] = useState(null)
  const [flipped, setFlipped] = useState(false)
  const [depositAmt, setDepositAmt] = useState('')
  const [withdrawAmt, setWithdrawAmt] = useState('')
  const [depositMsg, setDepositMsg] = useState({ text: '', type: '' })
  const [withdrawMsg, setWithdrawMsg] = useState({ text: '', type: '' })

  const load = async () => {
    const data = await getBalance(token)
    if (data.user) setUser(data.user)
    else onLogout()
  }

  useEffect(() => { load() }, [])

  const initials = user ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase() : ''

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmt)
    if (!amount || amount <= 0) return setDepositMsg({ text: 'Enter a valid amount', type: 'error' })
    const data = await deposit(token, amount)
    setDepositMsg({ text: data.message || data.error, type: data.message ? 'success' : 'error' })
    setDepositAmt('')
    if (data.message) load()
  }

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmt)
    if (!amount || amount <= 0) return setWithdrawMsg({ text: 'Enter a valid amount', type: 'error' })
    const data = await withdraw(token, amount)
    setWithdrawMsg({ text: data.message || data.error, type: data.message ? 'success' : 'error' })
    setWithdrawAmt('')
    if (data.message) load()
  }

  const handleClose = async () => {
    if (!confirm('Are you sure you want to permanently close your account?')) return
    await closeAccount(token)
    onLogout()
  }

  if (!user) return <div className="loading"><style>{styles}</style>Loading...</div>

  const balance = parseFloat(user.balance).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">

        <nav className="dash-nav">
          <div className="nav-logo">
            <div className="nav-logo-icon"></div>
            NexBank
          </div>
          <div className="nav-user">
            <div className="nav-avatar">{initials}</div>
            <span className="nav-name">{user.first_name} {user.last_name}</span>
            <button className="btn-logout" onClick={onLogout}>Sign out</button>
          </div>
        </nav>

        <div className="dash-body">

          {/* LEFT — Virtual Card */}
          <div className="card-col">
            <div className="card-scene" onClick={() => setFlipped(f => !f)}>
              <div className={`card-3d ${flipped ? 'flipped' : ''}`}>

                <div className="card-face card-front">
                  <div className="card-top">
                    <span className="card-bank-name">PressBank</span>
                    <div className="card-chip" />
                  </div>
                  <div className="card-balance-section">
                    <div className="card-balance-label">Available Balance</div>
                    <div className="card-balance-amount">
                      <span>$</span>{balance}
                    </div>
                  </div>
                  <div className="card-bottom">
                    <div>
                      <div className="card-holder-label">Card Holder</div>
                      <div className="card-holder-name">{user.first_name} {user.last_name}</div>
                    </div>
                    <div className="card-network">
                      <div className="card-circle card-circle-1" />
                      <div className="card-circle card-circle-2" />
                    </div>
                  </div>
                </div>

                <div className="card-face card-back">
                  <div className="card-back-strip" />
                  <div className="card-back-content">
                    <div className="card-back-cvv-row">
                      <span className="card-back-cvv-label">CVV</span>
                      <span className="card-back-cvv-val">•••</span>
                    </div>
                    <div className="card-back-hint">NexBank Checking · Valid Thru 12/28</div>
                  </div>
                </div>

              </div>
            </div>
            <div className="card-flip-hint">click card to flip</div>
          </div>

          {/* RIGHT — Actions */}
          <div className="actions-col">
            <div className="action-panel">
              <div className="action-title">Deposit</div>
              <input
                className="action-input"
                type="number"
                placeholder="Amount ($)"
                value={depositAmt}
                onChange={e => setDepositAmt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleDeposit()}
              />
              <button className="btn-deposit" onClick={handleDeposit}>+ Deposit Funds</button>
              {depositMsg.text && (
                <div className={depositMsg.type === 'success' ? 'msg-success' : 'msg-error'}>
                  {depositMsg.text}
                </div>
              )}
            </div>

            <div className="action-panel">
              <div className="action-title">Withdraw</div>
              <input
                className="action-input"
                type="number"
                placeholder="Amount ($)"
                value={withdrawAmt}
                onChange={e => setWithdrawAmt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleWithdraw()}
              />
              <button className="btn-withdraw" onClick={handleWithdraw}>− Withdraw Funds</button>
              {withdrawMsg.text && (
                <div className={withdrawMsg.type === 'success' ? 'msg-success' : 'msg-error'}>
                  {withdrawMsg.text}
                </div>
              )}
            </div>

            <div className="danger-panel">
              <div className="danger-info">
                <h4>Close Account</h4>
                <p>Permanently delete your account and all data.</p>
              </div>
              <button className="btn-danger" onClick={handleClose}>Close Account</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}