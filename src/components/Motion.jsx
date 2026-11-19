import { useEffect, useRef, useState } from 'react'

function useShown() {
	const ref = useRef(null)
	const [shown, setShown] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		if (!('IntersectionObserver' in window)) {
			setShown(true)
			return
		}
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					setShown(true)
					io.disconnect()
				}
			},
			{ threshold: 0.2 },
		)
		io.observe(el)
		return () => io.disconnect()
	}, [])

	return [ref, shown]
}

export function Reveal({ children, delay = 0, className = '' }) {
	const [ref, shown] = useShown()
	return (
		<div
			ref={ref}
			className={`reveal ${shown ? 'in' : ''} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	)
}

export function Count({ to, decimals = 0, suffix = '', dur = 1800 }) {
	const [ref, shown] = useShown()
	const [v, setV] = useState(0)

	useEffect(() => {
		if (!shown) return
		let raf
		const t0 = performance.now()
		const tick = t => {
			const p = Math.min(1, (t - t0) / dur)
			setV(to * (1 - Math.pow(1 - p, 3)))
			if (p < 1) raf = requestAnimationFrame(tick)
		}
		raf = requestAnimationFrame(tick)
		return () => cancelAnimationFrame(raf)
	}, [shown, to, dur])

	const text = v
		.toLocaleString('en-US', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		})
		.replace(/,/g, ' ')

	return (
		<span ref={ref}>
			{text}
			{suffix}
		</span>
	)
}
