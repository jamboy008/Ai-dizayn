import { useState } from 'react'

const label = { done: 'Bajarildi', running: 'Jarayonda', queued: 'Navbatda' }

export default function Panel({ tasks, results, open, onClose }) {
  const [tab, setTab] = useState('tasks')

  return (
    <aside className={`glass panel ${open ? 'open' : ''}`}>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'tasks'} className={tab === 'tasks' ? 'on' : ''} onClick={() => setTab('tasks')}>
          Vazifalar
        </button>
        <button role="tab" aria-selected={tab === 'results'} className={tab === 'results' ? 'on' : ''} onClick={() => setTab('results')}>
          Natijalar
        </button>
        <button className="icon-btn mob close" onClick={onClose} aria-label="Yopish">×</button>
      </div>

      {tab === 'tasks' && (
        <ul className="list">
          {tasks.map((t) => (
            <li key={t.id} className={`task ${t.status}`}>
              <div className="task-head">
                <span className="dot" />
                <strong>{t.name}</strong>
              </div>
              <div className="task-meta">
                <span>{t.agent}</span>
                <span>{label[t.status]}</span>
              </div>
              <div className="bar"><i style={{ width: `${t.progress}%` }} /></div>
            </li>
          ))}
        </ul>
      )}

      {tab === 'results' && (
        <ul className="list">
          {results.map((r) => (
            <li key={r.id} className="result">
              <div className="task-head">
                <strong>{r.title}</strong>
                <small>{r.when}</small>
              </div>
              <span className="kind">{r.kind}</span>
              <dl>
                {r.rows.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
