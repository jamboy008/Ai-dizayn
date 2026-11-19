import { useState } from 'react'

export default function Login({
	mode: startMode,
	onLogin,
	onRegister,
	onBack,
}) {
	const [mode, setMode] = useState(startMode === 'up' ? 'up' : 'in')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [show, setShow] = useState(false)
	const [error, setError] = useState('')

	const up = mode === 'up'

	const submit = e => {
		e.preventDefault()
		if (up && !name.trim()) return setError('Ismingizni kiriting')
		if (!/^\S+@\S+\.\S+$/.test(email.trim()))
			return setError('Email noto‘g‘ri kiritilgan')
		if (password.length < 6)
			return setError('Parol kamida 6 ta belgidan iborat bo‘lsin')
		setError(up ? onRegister(name, email, password) : onLogin(email, password))
	}

	const switchMode = () => {
		setMode(up ? 'in' : 'up')
		setError('')
	}

	return (
		<div className='login'>
			<form className='glass auth-card' onSubmit={submit} noValidate>
				<button type='button' className='link back' onClick={onBack}>
					← Bosh sahifa
				</button>
				<div className='auth-brand'>
					<span className='logo' />
					<strong>Command Center</strong>
				</div>
				<div>
					<h1>{up ? 'Hisob yaratish' : 'Qaytganingiz bilan'}</h1>
					<p className='sub'>
						{up
							? 'Agentlarni boshqarish uchun ro‘yxatdan o‘ting.'
							: 'Agentlar va jarayonlaringizni davom ettirish uchun kiring.'}
					</p>
				</div>

				<div className='form'>
					{up && (
						<label className='field'>
							Ism
							<input
								value={name}
								onChange={e => setName(e.target.value)}
								autoComplete='name'
							/>
						</label>
					)}
					<label className='field'>
						Email
						<input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							autoComplete='email'
						/>
					</label>
					<label className='field'>
						Parol
						<span className='pw'>
							<input
								type={show ? 'text' : 'password'}
								value={password}
								onChange={e => setPassword(e.target.value)}
								autoComplete={up ? 'new-password' : 'current-password'}
							/>
							<button type='button' onClick={() => setShow(v => !v)}>
								{show ? 'Yashirish' : 'Ko‘rsatish'}
							</button>
						</span>
					</label>
					{error && (
						<p className='note err' role='alert'>
							{error}
						</p>
					)}
					<button className='btn' type='submit'>
						{up ? 'Ro‘yxatdan o‘tish' : 'Kirish'}
					</button>
				</div>

				<p className='sub center'>
					{up ? 'Hisobingiz bormi?' : 'Hisobingiz yo‘qmi?'}{' '}
					<button type='button' className='link' onClick={switchMode}>
						{up ? 'Kirish' : 'Ro‘yxatdan o‘tish'}
					</button>
				</p>
			</form>
		</div>
	)
}
