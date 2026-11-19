import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import Composer from './Composer.jsx'

export default function Chat({ chat, busy, onSend, onMenu, onPanel }) {
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])
  const [drag, setDrag] = useState(false)
  const endRef = useRef(null)
  const empty = chat.messages.length === 0

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [chat.messages])

  const addFiles = (list) => {
    const next = Array.from(list).map((f) => ({
      name: f.name,
      size: f.size > 1048576 ? `${(f.size / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`,
    }))
    setFiles((p) => [...p, ...next])
  }

  const submit = () => {
    if (busy || (!text.trim() && !files.length)) return
    onSend(text, files)
    setText('')
    setFiles([])
  }

  const composer = (
    <Composer
      text={text}
      setText={setText}
      files={files}
      addFiles={addFiles}
      removeFile={(i) => setFiles((p) => p.filter((_, j) => j !== i))}
      onSubmit={submit}
      busy={busy}
      hero={empty}
    />
  )

  return (
    <main
      className="chat"
      onDragOver={(e) => {
        e.preventDefault()
        setDrag(true)
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setDrag(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        setDrag(false)
        addFiles(e.dataTransfer.files)
      }}
    >
      <header className="topbar glass">
        <button className="icon-btn mob" onClick={onMenu} aria-label="Menyu">
          <Icon name="menu" />
        </button>
        <h1>{chat.title}</h1>
        <span className={`pulse ${busy ? 'on' : ''}`}>{busy ? 'Agent ishlamoqda' : 'Tayyor'}</span>
        <button className="icon-btn mob" onClick={onPanel} aria-label="Vazifalar">
          <Icon name="panelR" />
        </button>
      </header>

      {empty ? (
        <div className="hero">
          <div className="core" />
          <h2>Qanday jarayonni avtomatlashtiramiz?</h2>
          {composer}
        </div>
      ) : (
        <>
          <div className="stream">
            {chat.messages.map((m) => (
              <article key={m.id} className={`msg ${m.role}`}>
                {m.role === 'ai' && <span className="avatar" />}
                <div className="bubble">
                  {m.files.length > 0 && (
                    <div className="chips">
                      {m.files.map((f, i) => (
                        <span key={i} className="chip">{f.name}</span>
                      ))}
                    </div>
                  )}
                  <p>
                    {m.text}
                    {m.streaming && <i className="caret" />}
                  </p>
                </div>
              </article>
            ))}
            <div ref={endRef} />
          </div>
          <div className="dock">{composer}</div>
        </>
      )}
      {drag && <div className="dropzone">Faylni shu yerga tashlang</div>}
    </main>
  )
}
