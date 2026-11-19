import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

const langs = [
  ['', 'Avto'],
  ['uz-UZ', 'O‘zbekcha'],
  ['ru-RU', 'Русский'],
  ['en-US', 'English'],
]

export default function Mic({ onText }) {
  const [open, setOpen] = useState(false)
  const [devices, setDevices] = useState([])
  const [deviceId, setDeviceId] = useState('')
  const [activeId, setActiveId] = useState('')
  const [level, setLevel] = useState(0)
  const [lang, setLang] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [error, setError] = useState('')
  const wrap = useRef(null)
  const rec = useRef(null)

  useEffect(() => {
    if (!open) return
    const out = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', out)
    return () => document.removeEventListener('mousedown', out)
  }, [open])

  useEffect(() => {
    if (!open) return
    let stream
    let ctx
    let raf
    let dead = false
    setError('')
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: deviceId ? { deviceId: { exact: deviceId } } : true,
        })
        if (dead) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        const list = await navigator.mediaDevices.enumerateDevices()
        setDevices(list.filter((d) => d.kind === 'audioinput'))
        setActiveId(stream.getAudioTracks()[0].getSettings().deviceId || '')
        ctx = new AudioContext()
        const an = ctx.createAnalyser()
        an.fftSize = 256
        ctx.createMediaStreamSource(stream).connect(an)
        const data = new Uint8Array(an.frequencyBinCount)
        const tick = () => {
          an.getByteFrequencyData(data)
          const avg = data.reduce((a, b) => a + b, 0) / data.length
          setLevel(Math.min(100, avg * 2.4))
          raf = requestAnimationFrame(tick)
        }
        tick()
      } catch {
        setError('Mikrofonga ruxsat berilmagan yoki qurilma topilmadi')
      }
    }
    start()
    return () => {
      dead = true
      cancelAnimationFrame(raf)
      stream?.getTracks().forEach((t) => t.stop())
      ctx?.close()
      setLevel(0)
    }
  }, [open, deviceId])

  useEffect(() => () => rec.current?.stop(), [])

  const toggle = () => {
    if (listening) {
      rec.current?.stop()
      return
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setError('Brauzer ovozni matnga aylantirishni qo‘llamaydi. Chrome yoki Edge ishlating')
      setOpen(true)
      return
    }
    const r = new SR()
    r.lang = lang || navigator.language
    r.continuous = true
    r.interimResults = false
    r.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) onText(e.results[i][0].transcript.trim())
      }
    }
    r.onend = () => setListening(false)
    r.onerror = () => setListening(false)
    rec.current = r
    r.start()
    setListening(true)
  }

  const selected = deviceId || activeId
  const langName = langs.find((l) => l[0] === lang)[1]

  return (
    <div className="mic" ref={wrap}>
      <div className={`mic-group ${listening ? 'live' : ''}`}>
        <button onClick={toggle} aria-label={listening ? 'Yozishni to‘xtatish' : 'Ovoz yozish'}>
          <Icon name="mic" size={19} />
        </button>
        <button className="chev" onClick={() => setOpen((v) => !v)} aria-label="Mikrofon sozlamalari">
          <Icon name="chevron" size={14} />
        </button>
      </div>

      {open && (
        <div className="pop mic-pop">
          <div className="meter">
            <Icon name="mic" size={16} />
            <div className="meter-bar"><i style={{ width: `${level}%` }} /></div>
          </div>
          {error && <p className="err">{error}</p>}
          {devices.map((d, i) => (
            <button key={d.deviceId} className="pop-item" onClick={() => setDeviceId(d.deviceId)}>
              <span className="grow">{d.label || `Mikrofon ${i + 1}`}</span>
              {selected === d.deviceId && <Icon name="check" size={16} />}
            </button>
          ))}
          <div className="sep" />
          <small className="pop-title">Diktant sozlamalari</small>
          <button className="pop-item" onClick={() => setLangOpen((v) => !v)}>
            <span className="grow">Til</span>
            <span className="muted">{langName}</span>
            <Icon name="chevron" size={14} />
          </button>
          {langOpen &&
            langs.map(([code, name]) => (
              <button
                key={name}
                className="pop-item sub"
                onClick={() => {
                  setLang(code)
                  setLangOpen(false)
                }}
              >
                <span className="grow">{name}</span>
                {lang === code && <Icon name="check" size={16} />}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
