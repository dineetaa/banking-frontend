import { useState } from 'react'
import { login } from '../api'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');

  /* 1. ZGJIDHJA PER HAPESIREN: Fshijme kufizimet e React/Vite */
  * { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important; /* Heq limitin e gjerësisë nga skedarët e tjerë CSS */
    background-color: #0a0f1e;
    overflow-x: hidden;
  }

  /* 2. FULL SCREEN ROOT */
  .login-root {
    display: flex;
    min-height: 100vh;
    width: 100%; /* Perdorimi i 100% në vend të 100vw eviton spostimet nga scrollbar-i */
    font-family: 'Sora', sans-serif;
  }

  /* --- PJESA E MAJTË (Dekori) --- */
  .login-left {
    flex: 1; 
    background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #2563eb 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3rem;
    position: relative;
    overflow: hidden;
  }

  .login-left::before { content: ''; position: absolute; top: -80px; right: -80px; width: 320px; height: 320px; background: rgba(255,255,255,0.05); border-radius: 50%; }
  .login-left::after { content: ''; position: absolute; bottom: -100px; left: -60px; width: 380px; height: 380px; background: rgba(255,255,255,0.04); border-radius: 50%; }

  .login-brand { display: flex; align-items: center; gap: 12px; position: relative; z-index: 1; }
  .login-brand-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .login-brand-name { font-size: 20px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }
  
  .login-left-content { position: relative; z-index: 1; }
  .login-left-title { font-size: 38px; font-weight: 600; color: #fff; letter-spacing: -1px; line-height: 1.15; margin-bottom: 1rem; }
  .login-left-sub { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.6; }
  .login-left-footer { font-size: 12px; color: rgba(255,255,255,0.3); position: relative; z-index: 1; }

  /* --- PJESA E DJATHTË (Forma) --- */
  .login-right {
    flex: 1; 
    background: #0a0f1e;
    display: flex;
    align-items: center; 
    justify-content: center; 
    padding: 2rem;
  }

  .login-form-container {
    width: 100%;
    max-width: 400px; 
  }

  .login-form-title { font-size: 26px; font-weight: 600; color: #f9fafb; letter-spacing: -0.5px; margin-bottom: 6px; }
  .login-form-sub { font-size: 13px; color: #6b7280; margin-bottom: 2.5rem; }
  
  .field { margin-bottom: 1.2rem; }
  .field label { display: block; font-size: 11px; font-weight: 500; color: #9ca3af; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 8px; }
  
  .field input {
    width: 100%;
    background: #111827;
    border: 1px solid #1f2d45;
    border-radius: 10px;
    padding: 14px 16px;
    font-size: 16px; 
    color: #f9fafb;
    font-family: 'Sora', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }

  .field input:focus { border-color: #2563eb; }
  .field input::placeholder { color: #2d3748; }

  .auth-error { background: #1f0a0a; border: 1px solid #7f1d1d; border-radius: 8px; padding: 10px 14px; color: #f87171; font-size: 13px; margin-bottom: 1.2rem; }
  
  .btn-primary { width: 100%; background: #2563eb; color: #fff; border: none; border-radius: 10px; padding: 14px; font-size: 14px; font-weight: 500; font-family: 'Sora', sans-serif; cursor: pointer; margin-top: 0.5rem; transition: background 0.2s; }
  .btn-primary:hover { background: #1d4ed8; }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  
  .auth-switch { text-align: center; margin-top: 1.8rem; font-size: 13px; color: #6b7280; }
  .auth-switch span { color: #2563eb; cursor: pointer; font-weight: 500; }
  .auth-switch span:hover { color: #60a5fa; }

  /* --- RESPONSIVE MOBILE --- */
  @media (max-width: 768px) {
    .login-root {
      flex-direction: column;
    }
    .login-left {
      display: none; 
    }
    .login-right {
      min-height: 100vh;
      align-items: flex-start;
      padding-top: 15vh;
    }
  }
`

export default function Login({ onLogin, onSwitch }) {
  const [card_number, setCard] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    if (!card_number || !pin) return setError('Please fill in all fields')
    setLoading(true)
    setError('')
    const data = await login(card_number, pin)
    setLoading(false)
    if (data.token) onLogin(data.token)
    else setError(data.error || 'Login failed')
  }

  const onKey = (e) => e.key === 'Enter' && handle()

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        
        <div className="login-left">
          <div className="login-brand">
            <div className="login-brand-icon">PressBank</div>
            <span className="login-brand-name">PressBank</span>
          </div>
          <div className="login-left-content">
            <div className="login-left-title">Banking made simple.</div>
            <div className="login-left-sub">Manage your money, track spending,<br />and stay in control — all in one place.</div>
          </div>
          <div className="login-left-footer">© 2026 PressBank. All rights reserved.</div>
        </div>

        <div className="login-right">
          <div className="login-form-container">
            <div className="login-form-title">Welcome back</div>
            <div className="login-form-sub">Sign in to your account</div>

            {error && <div className="auth-error">{error}</div>}

            <div className="field">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234567890123456"
                value={card_number}
                onChange={e => setCard(e.target.value)}
                onKeyDown={onKey}
              />
            </div>

            <div className="field">
              <label>PIN</label>
              <input
                type="password"
                placeholder="••••"
                value={pin}
                onChange={e => setPin(e.target.value)}
                onKeyDown={onKey}
              />
            </div>

            <button className="btn-primary" onClick={handle} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="auth-switch">
              Don't have an account? <span onClick={onSwitch}>Register</span>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}