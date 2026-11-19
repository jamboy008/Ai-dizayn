import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import Mic from './Mic.jsx'

const ideas = [
  ['doc', 'Hisobot tayyorlash', 'Haftalik hisobotni yig‘ib, jamoaga yuboradigan agent yarat: '],
  ['edit', 'Jarayon tuzish', 'Quyidagi jarayonni bosqichlarga bo‘l va avtomatlashtir: '],
  ['globe', 'Ma’lumot qidirish', 'Internetdan ma’lumot topib, qisqa xulosa tayyorla: '],
]

export default function Composer({ text, setText, files, addFiles, removeFile, onSubmit, busy, hero }) {
  const [menu, setMenu] = useState(false)
  const [web, setWeb] = useState(true)
  const [think, setThink] = useState(false)
  const fileRef = useRef(null)
  const taRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const key = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault()
        fileRef.current.click()
      }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [])

  useEffect(() => {
    if (!menu) return
    const out = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false)
    }
    document.addEventListener('mousedown', out)
    return () => document.removeEventListener('mousedown', out)
  }, [menu])

  useEffect(() => {
    const el = taRef.current
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [text])

  const shot = async () => {
    setMenu(false)
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      const v = document.createElement('video')
      v.srcObject = stream
      await v.play()
      const c = document.createElement('canvas')
      c.width = v.videoWidth
      c.height = v.videoHeight
      c.getContext('2d').drawImage(v, 0, 0)
      stream.getTracks().forEach((t) => t.stop())
      c.toBlob((b) => b && addFiles([new File([b], 'skrinshot.png', { type: 'image/png' })]))
    } catch {
      return
    }
  }

  const canSend = !busy && (text.trim() || files.length)

  return (
    <div className="composer-wrap">
      <div className="composer">
        {files.length > 0 && (
          <div className="chips">
            {files.map((f, i) => (
              <span key={i} className="chip">
                {f.name} · {f.size}
                <button onClick={() => removeFile(i)} aria-label="Olib tashlash">×</button>
              </span>
            ))}
          </div>
        )}
        <div className="row">
          <input ref={fileRef} type="file" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = '' }} />
          <div className="plus" ref={menuRef}>
            <button className="round" onClick={() => setMenu((v) => !v)} aria-label="Qo‘shish">
              <Icon name="plus" size={20} />
            </button>
            {menu && (
              <div className="pop plus-pop">
                <button className="pop-item" onClick={() => { setMenu(false); fileRef.current.click() }}>
                  <Icon name="clip" />
                  <span className="grow">Fayl yuklash</span>
                  <kbd>Ctrl+U</kbd>
                </button>
                <button className="pop-item" onClick={shot}>
                  <Icon name="camera" />
                  <span className="grow">Skrinshot olish</span>
                </button>
                <div className="sep" />
                <button className="pop-item" onClick={() => setThink((v) => !v)}>
                  <Icon name="bulb" />
                  <span className="grow">Chuqur fikrlash</span>
                  {think && <Icon name="check" size={16} />}
                </button>
                <button className="pop-item" onClick={() => setWeb((v) => !v)}>
                  <Icon name="globe" />
                  <span className="grow">Veb-qidiruv</span>
                  {web && <Icon name="check" size={16} />}
                </button>
              </div>
            )}
          </div>
          <textarea
            ref={taRef}
            rows={1}
            value={text}
            placeholder="Agentga vazifa bering..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onSubmit()
              }
            }}
          />
          <Mic onText={(t) => setText((p) => (p ? `${p} ${t}` : t))} />
          <button className="round send" onClick={onSubmit} disabled={!canSend} aria-label="Yuborish">
            <Icon name="up" size={19} />
          </button>
        </div>
      </div>
      {hero && !text && !files.length && (
        <div className="ideas">
          {ideas.map(([icon, label, prefill]) => (
            <button key={label} onClick={() => { setText(prefill); taRef.current.focus() }}>
              <Icon name={icon} size={17} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
