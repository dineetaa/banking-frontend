import { useState } from 'react'
import { register } from '../api'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');

  /* 1. RESETIMI TOTAL - Zhduk hapsirat e padukshme të React/Vite */
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
    max-width: none !important; /* Heq çdo limit gjerësie default */
    background-color: #0a0f1e;
    overflow-x: hidden;
  }

  /* 2. FULL SCREEN ROOT */
  .login-root {
    display: flex;
    min-height: 100vh;
    width: 100%;
    font-family: 'Sora', sans-serif;
  }

  /* --- PJESA E MAJTË (Dekori) --- */
  .login-left {
    flex: 1; /* Merr fiks gjysmën e ekranit */
    background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #2563eb 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3rem;
    position: relative;
    overflow: hidden;
  }

  .login-left::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 320px; height: 320px;
    background: rgba(255,255,255,0.05);
    border-radius: 50%;
  }

  .login-left::after {
    content: '';
    position: absolute;
    bottom: -100px; left: -60px;
    width: 380px; height: 380px;
    background: rgba(255,255,255,0.04);
    border-radius: 50%;
  }

  .login-brand { display: flex; align-items: center; gap: 12px; position: relative; z-index: 1; }
  .login-brand-icon { width: 40px; height: 40px; background: rgba(255,255,255,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
  .login-brand-name { font-size: 20px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }

  .login-left-content { position: relative; z-index: 1; }
  .login-left-title { font-size: 38px; font-weight: 600; color: #fff; letter-spacing: -1px; line-height: 1.15; margin-bottom: 1rem; }
  .login-left-sub { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.6; }
  .login-left-footer { font-size: 12px; color: rgba(255,255,255,0.3); position: relative; z-index: 1; }

  /* --- PJESA E DJATHTË (Forma) --- */
  .login-right {
    flex: 1; /* Merr gjysmën tjetër fiks */
    background: #0a0f1e;
    display: flex;
    align-items: center; /* Qendërzim vertikal */
    justify-content: center; /* Qendërzim horizontal */
    padding: 2rem;
  }

  /* 3. CONTAINERI I FORMËS - Nuk e lejon formën të merret anash apo të zgjatet shëmtuar */
  .login-form-container {
    width: 100%;
    max-width: 420px;
  }

  .login-form-title { font-size: 26px; font-weight: 600; color: #f9fafb; letter-spacing: -0.5px; margin-bottom: 6px; }
  .login-form-sub { font-size: 13px; color: #6b7280; margin-bottom: 2.5rem; }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .field { margin-bottom: 1.2rem; }
  .field label { display: block; font-size: 11px; font-weight: 500; color: #9ca3af; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 8px; }

  .field input {
    width: 100%;
    background: #111827;
    border: 1px solid #1f2d45;
    border-radius: 10px;
    padding: 14px 16px;
    font-size: 16px; /* ZGJIDHJA PËR IPHONE: Ndalon auto-zoom kur klikohet inputi */
    color: #f9fafb;
    font-family: 'Sora', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }

  .field input:focus { border-color: #2563eb; }
  .field input::placeholder { color: #2d3748; }

  .auth-error { background: #1f0a0a; border: 1px solid #7f1d1d; border-radius: 8px; padding: 10px 14px; color: #f87171; font-size: 13px; margin-bottom: 1.2rem; }
  .auth-success { background: #0a1f0f; border: 1px solid #14532d; border-radius: 8px; padding: 10px 14px; color: #4ade80; font-size: 13px; margin-bottom: 1.2rem; }

  .btn-primary { width: 100%; background: #2563eb; color: #fff; border: none; border-radius: 10px; padding: 14px; font-size: 14px; font-weight: 500; font-family: 'Sora', sans-serif; cursor: pointer; margin-top: 0.5rem; transition: background 0.2s; }
  .btn-primary:hover { background: #1d4ed8; }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

  .auth-switch { text-align: center; margin-top: 1.8rem; font-size: 13px; color: #6b7280; }
  .auth-switch span { color: #2563eb; cursor: pointer; font-weight: 500; }
  .auth-switch span:hover { color: #60a5fa; }

  /* --- OPTIMIZIMI PËR IPHONE / SMARTPHONES --- */
  @media (max-width: 768px) {
    .login-root {
      flex-direction: column;
    }
    .login-left {
      display: none; /* Fshehim dekorin në telefona që të mos zërë vend kot */
    }
    .login-right {
      min-height: 100vh;
      align-items: flex-start; /* E ngremë formën pak lart që kur të dalë tastiera të mos mbulohet */
      padding-top: 10vh;
    }
  }
`

export default function Register({ onSwitch }) {
  const [form, setForm] = useState({ first_name: '', last_name: '', card_number: '', pin: '' })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handle = async () => {
    if (!form.first_name || !form.last_name || !form.card_number || !form.pin)
      return setError('Please fill in all fields')
    setLoading(true)
    setError('')
    setMsg('')
    const data = await register(form)
    setLoading(false)
    if (data.userId) {
      setMsg('Account created! You can now sign in.')
      setForm({ first_name: '', last_name: '', card_number: '', pin: '' })
    } else {
      setError(data.error || 'Registration failed')
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">

        {/* Left Decorative Side */}
        <div className="login-left">
          <div className="login-brand">
            <div className="login-brand-icon">💳</div>
            <span className="login-brand-name">NexBank</span>
          </div>
          <div className="login-left-content">
            <div className="login-left-title">Open an account today.</div>
            <div className="login-left-sub">Join thousands of users managing<br />their finances with NexBank.</div>
          </div>
          <div className="login-left-footer">© 2026 NexBank. All rights reserved.</div>
        </div>

        {/* Right Form Side */}
        <div className="login-right">
          <div className="login-form-container">
            <div className="login-form-title">Create account</div>
            <div className="login-form-sub">Open your account in seconds</div>

            {error && <div className="auth-error">{error}</div>}
            {msg && <div className="auth-success">{msg}</div>}

            <div className="row">
              <div className="field">
                <label>First Name</label>
                <input placeholder="John" value={form.first_name} onChange={set('first_name')} />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input placeholder="Doe" value={form.last_name} onChange={set('last_name')} />
              </div>
            </div>

            <div className="field">
              <label>Card Number</label>
              <input
                placeholder="1234567890123456"
                value={form.card_number}
                onChange={set('card_number')}
                maxLength={16}
              />
            </div>

            <div className="field">
              <label>PIN</label>
              <input
                type="password"
                placeholder="Choose a PIN"
                value={form.pin}
                onChange={set('pin')}
              />
            </div>

            <button className="btn-primary" onClick={handle} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <div className="auth-switch">
              Already have an account? <span onClick={onSwitch}>Sign in</span>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}