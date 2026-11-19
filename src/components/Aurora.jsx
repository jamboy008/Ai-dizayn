import { useEffect, useRef } from 'react'

const paths = [
	{ ax: 22, ay: 16, fx: 0.071, fy: 0.053, px: 0, py: 1.2 },
	{ ax: 30, ay: 22, fx: 0.057, fy: 0.077, px: 2.1, py: 0.4 },
	{ ax: 20, ay: 18, fx: 0.083, fy: 0.049, px: 4.0, py: 2.6 },
	{ ax: 34, ay: 20, fx: 0.043, fy: 0.061, px: 1.0, py: 3.3 },
]

const names = ['o1', 'o2', 'o3', 'o4']

export default function Aurora({ on }) {
	const refs = useRef([])
	const target = useRef(0)
	const k = useRef(0)
	const t = useRef(0)
	const last = useRef(0)
	const raf = useRef(0)
	const running = useRef(false)

	useEffect(() => {
		const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		target.current = on && !still ? 1 : 0
		if (running.current) return
		running.current = true
		last.current = performance.now()

		const frame = now => {
			const dt = Math.min(0.1, (now - last.current) / 1000)
			last.current = now
			t.current += dt
			k.current += (target.current - k.current) * (1 - Math.exp(-dt * 1.2))

			if (target.current === 0 && k.current < 0.001) {
				k.current = 0
				refs.current.forEach(el => {
					if (el) el.style.transform = ''
				})
				running.current = false
				return
			}

			refs.current.forEach((el, i) => {
				if (!el) return
				const p = paths[i]
				const x = p.ax * k.current * Math.sin(t.current * p.fx + p.px)
				const y = p.ay * k.current * Math.cos(t.current * p.fy + p.py)
				const s = 1 + 0.06 * k.current * Math.sin(t.current * p.fx * 1.3 + p.py)
				el.style.transform = `translate3d(${x}vw, ${y}vh, 0) scale(${s})`
			})

			raf.current = requestAnimationFrame(frame)
		}

		raf.current = requestAnimationFrame(frame)
	}, [on])

	useEffect(
		() => () => {
			cancelAnimationFrame(raf.current)
			running.current = false
		},
		[],
	)

	return (
		<div className='aurora' aria-hidden='true'>
			{names.map((n, i) => (
				<span
					key={n}
					ref={el => (refs.current[i] = el)}
					className={`orb ${n}`}
				/>
			))}
		</div>
	)
}
