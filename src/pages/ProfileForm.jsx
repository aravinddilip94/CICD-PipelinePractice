import { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

function saveProfile(p) {
  const data = JSON.parse(localStorage.getItem('profiles') || '[]')
  data.push(p)
  localStorage.setItem('profiles', JSON.stringify(data))
}
function loadProfiles() {
  try { return JSON.parse(localStorage.getItem('profiles') || '[]') } catch { return [] }
}

export default function ProfileForm() {
  const [form, setForm] = useState({ name:'', mobile:'', age:'', height:'', location:'' })
  const [photo, setPhoto] = useState(null)
  const [profiles, setProfiles] = useState([])
  const webcamRef = useRef(null)
  const [mirror, setMirror] = useState(true)

  useEffect(() => { setProfiles(loadProfiles()) }, [])

  const capture = () => {
    if (!webcamRef.current) return
    const imageSrc = webcamRef.current.getScreenshot()
    setPhoto(imageSrc)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!/^[0-9]{10}$/.test(form.mobile)) { alert('Mobile must be 10 digits'); return }
    const profile = { ...form, photo, id: Date.now() }
    saveProfile(profile)
    setProfiles(loadProfiles())
    setForm({ name:'', mobile:'', age:'', height:'', location:'' })
    setPhoto(null)
    alert('Profile saved')
  }

  const input = (key, props={}) => (
    <div>
      <label className='label capitalize'>{key}</label>
      <input className='input' value={form[key]} onChange={e=>setForm(s=>({...s, [key]: e.target.value}))} {...props} />
    </div>
  )

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
        <div className='card'>
          <h2 className='text-lg font-semibold mb-4'>Create Profile</h2>
          <form onSubmit={onSubmit} className='space-y-4'>
            {input('name', { placeholder: 'Customer name', required: true })}
            {input('mobile', { placeholder: '10-digit mobile', required: true })}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {input('age', { type:'number', min:1, max:120, placeholder:'Age', required: true })}
              {input('height', { type:'number', min:30, max:250, placeholder:'Height (cm)', required: true })}
              {input('location', { placeholder:'Location', required: true })}
            </div>

            <div>
              <label className='label'>Camera</label>
              <div className='rounded-2xl overflow-hidden border'>
                <Webcam
                  ref={webcamRef}
                  mirrored={mirror}
                  screenshotFormat='image/jpeg'
                  videoConstraints={{ facingMode: 'user', width: 640, height: 480 }}
                  className='w-full h-auto'
                />
              </div>
              <div className='flex items-center gap-3 mt-3'>
                <button type='button' className='btn btn-primary' onClick={capture}>Capture Photo</button>
                <label className='flex items-center gap-2 text-sm text-gray-600'>
                  <input type='checkbox' checked={mirror} onChange={e=>setMirror(e.target.checked)} />
                  Mirror preview
                </label>
              </div>
            </div>

            {photo && (<div><label className='label'>Captured Preview</label><img src={photo} alt='preview' className='rounded-xl border w-64' /></div>)}

            <button className='btn btn-primary' type='submit'>Save Profile</button>
          </form>
        </div>

        <div className='card'>
          <h2 className='text-lg font-semibold mb-4'>Saved Profiles</h2>
          {profiles.length === 0 ? (
            <p className='text-gray-600'>No profiles yet.</p>
          ) : (
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {profiles.map(p => (
                <li key={p.id} className='border rounded-xl p-3 flex gap-3 items-center'>
                  {p.photo ? <img src={p.photo} alt='' className='w-16 h-16 rounded-lg object-cover' /> : <div className='w-16 h-16 rounded-lg bg-gray-200'></div>}
                  <div className='text-sm'>
                    <div className='font-medium'>{p.name}</div>
                    <div className='text-gray-600'>{p.mobile}</div>
                    <div className='text-gray-600'>{p.age} yrs, {p.height} cm</div>
                    <div className='text-gray-600'>{p.location}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
