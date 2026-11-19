import { useState } from 'react'
import Icon from './Icon.jsx'

const accents = [
	['red', 'Qizil', '#e5243b'],
	['ember', 'Olov', '#f0641e'],
	['rose', 'Atirgul', '#d61f7a'],
]

const tabs = [
	['profile', 'Profil'],
	['look', 'Ko‘rinish'],
	['security', 'Xavfsizlik'],
	['account', 'Hisob'],
]

export default function Settings({
	user,
	prefs,
	setPrefs,
	onUpdateUser,
	onChangePassword,
	onClearChats,
	onLogout,
	onDelete,
	onBack,
	onMenu,
}) {
	const [tab, setTab] = useState('profile')
	const [name, setName] = useState(user.name)
	const [saved, setSaved] = useState('')
	const [oldPw, setOldPw] = useState('')
	const [newPw, setNewPw] = useState('')
	const [pwMsg, setPwMsg] = useState({ text: '', ok: false })
	const [cleared, setCleared] = useState(false)
	const [confirm, setConfirm] = useState(false)

	const saveProfile = e => {
		e.preventDefault()
		if (!name.trim()) return setSaved('')
		onUpdateUser({ name: name.trim() })
		setSaved('Saqlandi')
	}

	const savePassword = e => {
		e.preventDefault()
		if (newPw.length < 6)
			return setPwMsg({
				text: 'Yangi parol kamida 6 ta belgidan iborat bo‘lsin',
				ok: false,
			})
		const err = onChangePassword(oldPw, newPw)
		if (err) return setPwMsg({ text: err, ok: false })
		setOldPw('')
		setNewPw('')
		setPwMsg({ text: 'Parol o‘zgartirildi', ok: true })
	}

	return (
		<section className='settings'>
			<header className='topbar glass'>
				<button className='icon-btn mob' onClick={onMenu} aria-label='Menyu'>
					<Icon name='menu' />
				</button>
				<h1>Sozlamalar</h1>
				<button className='btn ghost small' onClick={onBack}>
					← Suhbatga qaytish
				</button>
			</header>

			<div className='set-body'>
				<nav className='glass set-nav' aria-label='Sozlamalar bo‘limlari'>
					{tabs.map(([id, label]) => (
						<button
							key={id}
							className={tab === id ? 'active' : ''}
							onClick={() => setTab(id)}
						>
							{label}
						</button>
					))}
				</nav>

				<div className='set-content'>
					{tab === 'profile' && (
						<form className='glass set-card' onSubmit={saveProfile}>
							<h2>Profil</h2>
							<label className='field'>
								Ism
								<input
									value={name}
									onChange={e => {
										setName(e.target.value)
										setSaved('')
									}}
								/>
							</label>
							<label className='field'>
								Email
								<input value={user.email} disabled />
							</label>
							<div className='actions'>
								<button className='btn' type='submit'>
									Saqlash
								</button>
								{saved && <span className='note ok'>{saved}</span>}
							</div>
						</form>
					)}

					{tab === 'look' && (
						<div className='glass set-card'>
							<h2>Ko‘rinish</h2>
							<div>
								<p className='label'>Asosiy rang</p>
								<div className='swatches'>
									{accents.map(([id, label, color]) => (
										<button
											key={id}
											className={prefs.accent === id ? 'swatch on' : 'swatch'}
											style={{ '--c': color }}
											onClick={() => setPrefs({ ...prefs, accent: id })}
											aria-label={label}
											aria-pressed={prefs.accent === id}
										>
											<i />
											<span>{label}</span>
										</button>
									))}
								</div>
							</div>
							<div className='row-set'>
								<div>
									<p className='label'>Fon animatsiyasi</p>
									<p className='sub'>Orqadagi rangli nurlar harakati</p>
								</div>
								<button
									className='switch'
									role='switch'
									aria-checked={prefs.motion}
									onClick={() => setPrefs({ ...prefs, motion: !prefs.motion })}
									aria-label='Fon animatsiyasi'
								/>
							</div>
						</div>
					)}

					{tab === 'security' && (
						<>
							<form className='glass set-card' onSubmit={savePassword}>
								<h2>Parolni o‘zgartirish</h2>
								<label className='field'>
									Joriy parol
									<input
										type='password'
										value={oldPw}
										onChange={e => setOldPw(e.target.value)}
										autoComplete='current-password'
									/>
								</label>
								<label className='field'>
									Yangi parol
									<input
										type='password'
										value={newPw}
										onChange={e => setNewPw(e.target.value)}
										autoComplete='new-password'
									/>
								</label>
								<div className='actions'>
									<button className='btn' type='submit'>
										Parolni yangilash
									</button>
									{pwMsg.text && (
										<span className={`note ${pwMsg.ok ? 'ok' : 'err'}`}>
											{pwMsg.text}
										</span>
									)}
								</div>
							</form>
							<div className='glass set-card'>
								<h2>Suhbatlar tarixi</h2>
								<p className='sub'>
									Barcha suhbatlar o‘chiriladi. Bu amalni qaytarib bo‘lmaydi.
								</p>
								<div className='actions'>
									<button
										className='btn ghost'
										onClick={() => {
											onClearChats()
											setCleared(true)
										}}
									>
										Tarixni tozalash
									</button>
									{cleared && <span className='note ok'>Tarix tozalandi</span>}
								</div>
							</div>
						</>
					)}

					{tab === 'account' && (
						<>
							<div className='glass set-card'>
								<h2>Seansni tugatish</h2>
								<p className='sub'>{user.email} hisobidan chiqasiz.</p>
								<div className='actions'>
									<button className='btn ghost' onClick={onLogout}>
										Chiqish
									</button>
								</div>
							</div>
							<div className='glass set-card danger-zone'>
								<h2>Hisobni o‘chirish</h2>
								<p className='sub'>
									Hisobingiz butunlay o‘chiriladi. Bu amalni qaytarib bo‘lmaydi.
								</p>
								<div className='actions'>
									{!confirm ? (
										<button
											className='btn danger'
											onClick={() => setConfirm(true)}
										>
											Hisobni o‘chirish
										</button>
									) : (
										<>
											<button className='btn danger' onClick={onDelete}>
												Ha, o‘chirish
											</button>
											<button
												className='btn ghost'
												onClick={() => setConfirm(false)}
											>
												Bekor qilish
											</button>
										</>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	)
}
