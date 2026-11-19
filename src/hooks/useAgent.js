import { useEffect, useRef, useState } from 'react'
import {
	initialChats,
	initialTasks,
	initialResults,
	stepNames,
	replies,
} from '../data.js'

let uid = 100

export default function useAgent() {
	const [chats, setChats] = useState(initialChats)
	const [activeId, setActiveId] = useState(1)
	const [tasks, setTasks] = useState(initialTasks)
	const [results, setResults] = useState(initialResults)
	const [busy, setBusy] = useState(false)
	const timers = useRef([])

	const active = chats.find(c => c.id === activeId)

	useEffect(() => () => timers.current.forEach(clearInterval), [])

	const patchChat = (id, fn) =>
		setChats(list => list.map(c => (c.id === id ? fn(c) : c)))

	const newChat = () => {
		const id = ++uid
		setChats(l => [
			{ id, title: 'Yangi suhbat', time: 'Hozir', messages: [] },
			...l,
		])
		setActiveId(id)
	}

	const clearChats = () => {
		const id = ++uid
		setChats([{ id, title: 'Yangi suhbat', time: 'Hozir', messages: [] }])
		setActiveId(id)
	}

	const send = (text, files) => {
		if (busy || (!text.trim() && !files.length)) return
		const chatId = activeId
		const aiId = ++uid
		const reply = replies[Math.floor(Math.random() * replies.length)]
		patchChat(chatId, c => ({
			...c,
			title: c.messages.length
				? c.title
				: text.slice(0, 34) || 'Fayl bilan suhbat',
			messages: [
				...c.messages,
				{ id: ++uid, role: 'user', text, files },
				{ id: aiId, role: 'ai', text: '', files: [], streaming: true },
			],
		}))
		setBusy(true)

		const base = ++uid
		const fresh = stepNames.map(([name, agent], i) => ({
			id: `t${base}-${i}`,
			name,
			agent,
			status: i === 0 ? 'running' : 'queued',
			progress: 0,
		}))
		setTasks(t => [...fresh, ...t].slice(0, 8))

		const prog = fresh.map(() => 0)
		let step = 0
		const taskTimer = setInterval(() => {
			prog[step] = Math.min(100, prog[step] + 20)
			if (prog[step] >= 100) step += 1
			const snapshot = [...prog]
			const current = step
			setTasks(list =>
				list.map(t => {
					const idx = fresh.findIndex(f => f.id === t.id)
					if (idx === -1) return t
					return {
						...t,
						progress: snapshot[idx],
						status:
							snapshot[idx] >= 100
								? 'done'
								: idx === current
									? 'running'
									: 'queued',
					}
				}),
			)
			if (current >= fresh.length) {
				clearInterval(taskTimer)
				setResults(r => [
					{
						id: `r${base}`,
						title: text.slice(0, 28) || 'Biriktirilgan fayl tahlili',
						kind: 'Xulosa',
						when: new Date().toLocaleTimeString('uz', {
							hour: '2-digit',
							minute: '2-digit',
						}),
						rows: [
							['Bajarilgan bosqich', String(fresh.length)],
							['Biriktirilgan fayl', String(files.length)],
							['Holat', 'Tayyor'],
						],
					},
					...r,
				])
			}
		}, 650)
		timers.current.push(taskTimer)

		let i = 0
		const typeTimer = setInterval(() => {
			i += 2
			patchChat(chatId, c => ({
				...c,
				messages: c.messages.map(m =>
					m.id === aiId
						? { ...m, text: reply.slice(0, i), streaming: i < reply.length }
						: m,
				),
			}))
			if (i >= reply.length) {
				clearInterval(typeTimer)
				setBusy(false)
			}
		}, 28)
		timers.current.push(typeTimer)
	}

	return {
		chats,
		activeId,
		setActiveId,
		active,
		tasks,
		results,
		busy,
		newChat,
		clearChats,
		send,
	}
}
