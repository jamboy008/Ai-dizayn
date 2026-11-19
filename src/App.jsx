import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Chat from './components/Chat.jsx'
import Panel from './components/Panel.jsx'
import Login from './components/Login.jsx'
import Landing from './components/Landing.jsx'
import Settings from './components/Settings.jsx'
import Aurora from './components/Aurora.jsx'
import { useStored } from './hooks/useStored.js'
import useAuth from './hooks/useAuth.js'
import useAgent from './hooks/useAgent.js'

export default function App() {
	const auth = useAuth()
	const agent = useAgent()
	const [prefs, setPrefs] = useStored('cc_prefs', {
		accent: 'red',
		motion: true,
	})
	const [screen, setScreen] = useState('landing')
	const [authMode, setAuthMode] = useState('in')
	const [view, setView] = useState('chat')
	const [menu, setMenu] = useState(false)
	const [collapsed, setCollapsed] = useState(false)
	const [panel, setPanel] = useState(false)

	const { user } = auth

	const resetScreens = () => {
		setView('chat')
		setMenu(false)
		setScreen('landing')
	}

	const logout = () => {
		auth.logout()
		resetScreens()
	}

	const deleteAccount = () => {
		auth.deleteAccount()
		resetScreens()
	}

	const openAuth = mode => {
		setAuthMode(mode)
		setScreen('auth')
	}

	return (
		<div
			className='root'
			data-accent={prefs.accent}
			data-motion={prefs.motion ? 'on' : 'off'}
		>
			<Aurora on={prefs.motion} />

			{!user && screen === 'landing' && <Landing onAuth={openAuth} />}

			{!user && screen === 'auth' && (
				<Login
					key={authMode}
					mode={authMode}
					onLogin={auth.login}
					onRegister={auth.register}
					onBack={() => setScreen('landing')}
				/>
			)}

			{user && (
				<div className={`shell ${collapsed ? 'collapsed' : ''}`}>
					<Sidebar
						chats={agent.chats}
						activeId={agent.activeId}
						user={user}
						open={menu}
						collapsed={collapsed}
						onToggle={() =>
							window.innerWidth <= 760 ? setMenu(false) : setCollapsed(v => !v)
						}
						onSelect={id => {
							agent.setActiveId(id)
							setView('chat')
							setMenu(false)
						}}
						onNew={() => {
							agent.newChat()
							setView('chat')
							setMenu(false)
						}}
						onSettings={() => {
							setView('settings')
							setMenu(false)
						}}
						onLogout={logout}
					/>

					{view === 'chat' ? (
						<>
							<Chat
								chat={agent.active}
								busy={agent.busy}
								onSend={agent.send}
								onMenu={() => setMenu(v => !v)}
								onPanel={() => setPanel(v => !v)}
							/>
							<Panel
								tasks={agent.tasks}
								results={agent.results}
								open={panel}
								onClose={() => setPanel(false)}
							/>
						</>
					) : (
						<Settings
							user={user}
							prefs={prefs}
							setPrefs={setPrefs}
							onUpdateUser={auth.updateUser}
							onChangePassword={auth.changePassword}
							onClearChats={agent.clearChats}
							onLogout={logout}
							onDelete={deleteAccount}
							onBack={() => setView('chat')}
							onMenu={() => setMenu(v => !v)}
						/>
					)}

					{(menu || panel) && (
						<button
							className='scrim'
							aria-label='Yopish'
							onClick={() => {
								setMenu(false)
								setPanel(false)
							}}
						/>
					)}
				</div>
			)}
		</div>
	)
}
