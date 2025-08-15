import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { createContext, useContext, useMemo, useState } from 'react'
import Login from './pages/Login.jsx'
import SineWave from './pages/SineWave.jsx'
import ProfileForm from './pages/ProfileForm.jsx'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(() => sessionStorage.getItem('auth') === 'true')
  const [user, setUser] = useState(() => {
    const u = sessionStorage.getItem('user'); return u ? JSON.parse(u) : null
  })

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 250))
    if (email && password && password.length >= 6) {
      const u = { email }
      setIsAuth(true); setUser(u)
      sessionStorage.setItem('auth', 'true')
      sessionStorage.setItem('user', JSON.stringify(u))
      return { ok: true }
    }
    return { ok: false, message: 'Invalid credentials' }
  }
  const logout = () => { setIsAuth(false); setUser(null); sessionStorage.clear() }
  const value = useMemo(() => ({ isAuth, user, login, logout }), [isAuth, user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function Private({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? children : <Navigate to='/login' replace />
}

function Navbar() {
  const { pathname } = useLocation()
  const { logout, user } = useAuth()
  const navItem = (to, label) => (
    <Link to={to} className={`px-3 py-2 rounded-lg ${pathname===to?'bg-primary-600 text-white':'text-gray-700 hover:bg-gray-100'}`}>{label}</Link>
  )
  return (
    <header className='bg-white border-b'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 justify-between'>
        <div className='flex items-center gap-2'>
          <div className='h-9 w-9 rounded-xl bg-primary-600 text-white font-bold grid place-items-center'>A</div>
          <span className='font-semibold'>Auth App</span>
        </div>
        <nav className='flex gap-2'>
          {navItem('/sinewave','Sine Wave')}
          {navItem('/profiles','Profiles')}
        </nav>
        <div className='flex items-center gap-3'>
          <span className='text-sm text-gray-600 hidden sm:block'>{user?.email}</span>
          <button onClick={logout} className='btn btn-primary'>Logout</button>
        </div>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sinewave' element={<Private><><Navbar /><SineWave /></></Private>} />
        <Route path='/profiles' element={<Private><><Navbar /><ProfileForm /></></Private>} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </AuthProvider>
  )
}
