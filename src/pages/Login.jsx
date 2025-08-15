import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    const res = await login(email.trim(), password)
    setLoading(false)
    if (res.ok) navigate('/sinewave')
    else setError(res.message || 'Login failed')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white p-4'>
      <div className='w-full max-w-md card'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='h-10 w-10 rounded-2xl bg-primary-600 flex items-center justify-center text-white font-bold'>A</div>
          <div><h1 className='text-xl font-semibold text-gray-900'>Login</h1><p className='text-sm text-gray-500'>Sign in to continue</p></div>
        </div>
        <form onSubmit={onSubmit} className='space-y-4'>
          <div><label className='label'>Email</label><input className='input' type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='you@example.com' required/></div>
          <div><label className='label'>Password</label><input className='input' type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='At least 6 characters' minLength={6} required/></div>
          {error && <div className='text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-2'>{error}</div>}
          <button type='submit' className='btn btn-primary w-full' disabled={loading}>{loading?'Signing in…':'Sign in'}</button>
        </form>
        <p className='text-xs text-gray-500 text-center mt-3'>Tip: any email + password ≥ 6 works.</p>
      </div>
    </div>
  )
}
