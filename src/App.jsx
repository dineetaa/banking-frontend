import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [page, setPage] = useState('login')

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const logout = () => {
    setToken(null)
    setPage('login')
  }

  if (token) return <Dashboard token={token} onLogout={logout} />

  return (
    <div>
      {page === 'login'
        ? <Login onLogin={setToken} onSwitch={() => setPage('register')} />
        : <Register onSwitch={() => setPage('login')} />
      }
    </div>
  )
}