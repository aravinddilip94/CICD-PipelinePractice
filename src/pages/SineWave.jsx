import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function SineWave() {
  const [A, setA] = useState(1)
  const [f, setF] = useState(1)
  const [phi, setPhi] = useState(0)

  const samples = 256
  const xs = Array.from({length: samples}, (_, i) => i / (samples-1) * (2*Math.PI))
  const ys = xs.map(x => A * Math.sin(f * x + phi))

  const data = {
    labels: xs.map(x => x.toFixed(2)),
    datasets: [{ label: 'Sine Wave', data: ys, borderWidth: 2, pointRadius: 0, tension: 0.25 }]
  }
  const options = {
    responsive: true, maintainAspectRatio: false,
    scales: { x: { ticks: { display: false } }, y: { suggestedMin: -Math.max(1,A)*1.2, suggestedMax: Math.max(1,A)*1.2 } }
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='card mb-6'>
        <h2 className='text-lg font-semibold mb-2'>Sine Wave Controls</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div><label className='label'>Amplitude (A): {A}</label><input type='range' min='0' max='5' step='0.1' value={A} onChange={e=>setA(parseFloat(e.target.value))} className='w-full'/></div>
          <div><label className='label'>Frequency (f): {f}</label><input type='range' min='0.2' max='5' step='0.1' value={f} onChange={e=>setF(parseFloat(e.target.value))} className='w-full'/></div>
          <div><label className='label'>Phase (φ): {phi.toFixed(2)} rad</label><input type='range' min='-3.14' max='3.14' step='0.01' value={phi} onChange={e=>setPhi(parseFloat(e.target.value))} className='w-full'/></div>
        </div>
      </div>
      <div className='card h-72'><Line data={data} options={options} /></div>
    </div>
  )
}
