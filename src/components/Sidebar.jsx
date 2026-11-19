import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

export default function Sidebar({
	chats,
	activeId,
	user,
	open,
	collapsed,
	onSelect,
	onNew,
	onToggle,
	onSettings,
	onLogout,
}) {
	const [q, setQ] = useState('')
	const [acc, setAcc] = useState(false)
	const accRef = useRef(null)

	useEffect(() => {
		if (!acc) return
		const out = e => {
			if (accRef.current && !accRef.current.contains(e.target)) setAcc(false)
		}
		document.addEventListener('mousedown', out)
		return () => document.removeEventListener('mousedown', out)
	}, [acc])

	const initials = user.name
		.split(' ')
		.filter(Boolean)
		.map(w => w[0])
		.slice(0, 2)
		.join('')
		.toUpperCase()

	const filtered = chats.filter(c =>
		c.title.toLowerCase().includes(q.toLowerCase()),
	)
	const groups = filtered.reduce((a, c) => {
		;(a[c.time] = a[c.time] || []).push(c)
		return a
	}, {})

	return (
		<aside
			className={`glass sidebar ${open ? 'open' : ''} ${collapsed ? 'slim' : ''}`}
		>
			<div className='brand'>
				<span className='logo' />
				<strong className='hide-slim'>Command Center</strong>
				<button
					className='icon-btn ghost toggle'
					onClick={onToggle}
					aria-label='Panelni yig‘ish'
				>
					<Icon name='panel' />
				</button>
			</div>

			<button className='nav-btn primary' onClick={onNew}>
				<Icon name='edit' />
				<span className='hide-slim'>Yangi suhbat</span>
			</button>

			<label className='search hide-slim'>
				<Icon name='search' size={16} />
				<input
					value={q}
					onChange={e => setQ(e.target.value)}
					placeholder='Suhbatlarni qidirish'
				/>
			</label>

			<nav className='history hide-slim' aria-label='Suhbatlar tarixi'>
				{Object.entries(groups).map(([time, list]) => (
					<div key={time} className='group'>
						<h3>{time}</h3>
						{list.map(c => (
							<button
								key={c.id}
								className={`chat-item ${c.id === activeId ? 'active' : ''}`}
								onClick={() => onSelect(c.id)}
							>
								{c.title}
							</button>
						))}
					</div>
				))}
				{filtered.length === 0 && <p className='none'>Hech narsa topilmadi</p>}
			</nav>

			<div className='account' ref={accRef}>
				{acc && (
					<div className='pop acc-pop'>
						<button
							className='pop-item'
							onClick={() => {
								setAcc(false)
								onSettings()
							}}
						>
							<Icon name='gear' />
							<span className='grow'>Sozlamalar</span>
						</button>
						<button
							className='pop-item'
							onClick={() => {
								setAcc(false)
								onLogout()
							}}
						>
							<Icon name='logout' />
							<span className='grow'>Chiqish</span>
						</button>
					</div>
				)}
				<button
					className='user-av'
					onClick={() => setAcc(v => !v)}
					aria-label='Akkaunt menyusi'
				>
					{initials}
				</button>
				<span className='who hide-slim'>{user.name}</span>
				<button
					className='icon-btn ghost hide-slim'
					onClick={() => setAcc(v => !v)}
					aria-label='Akkaunt sozlamalari'
				>
					<Icon name='gear' />
				</button>
			</div>
		</aside>
	)
}
