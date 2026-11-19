import { useEffect, useRef } from 'react'

export default function Particles() {
	const ref = useRef(null)

	useEffect(() => {
		const cv = ref.current
		const ctx = cv.getContext('2d')
		const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const mouse = { x: -999, y: -999 }
		let w = 0
		let h = 0
		let raf
		let dots = []

		const size = () => {
			const d = Math.min(window.devicePixelRatio || 1, 2)
			w = window.innerWidth
			h = window.innerHeight
			cv.width = w * d
			cv.height = h * d
			ctx.setTransform(d, 0, 0, d, 0, 0)
			const n = Math.round(Math.min(110, (w * h) / 14000))
			dots = Array.from({ length: n }, () => ({
				x: Math.random() * w,
				y: Math.random() * h,
				vx: (Math.random() - 0.5) * 0.35,
				vy: (Math.random() - 0.5) * 0.35,
				r: Math.random() * 1.6 + 0.6,
			}))
		}

		const draw = () => {
			ctx.clearRect(0, 0, w, h)
			for (const p of dots) {
				if (!still) {
					p.x += p.vx
					p.y += p.vy
					if (p.x < 0 || p.x > w) p.vx *= -1
					if (p.y < 0 || p.y > h) p.vy *= -1
					const dx = p.x - mouse.x
					const dy = p.y - mouse.y
					const d2 = dx * dx + dy * dy
					if (d2 < 16000) {
						const d = Math.sqrt(d2) || 1
						p.x += (dx / d) * 1.3
						p.y += (dy / d) * 1.3
					}
				}
				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
				ctx.fillStyle = 'rgba(255, 122, 89, 0.85)'
				ctx.fill()
			}
			for (let i = 0; i < dots.length; i++) {
				for (let j = i + 1; j < dots.length; j++) {
					const dx = dots[i].x - dots[j].x
					const dy = dots[i].y - dots[j].y
					const d = Math.sqrt(dx * dx + dy * dy)
					if (d < 130) {
						ctx.beginPath()
						ctx.moveTo(dots[i].x, dots[i].y)
						ctx.lineTo(dots[j].x, dots[j].y)
						ctx.strokeStyle = `rgba(255, 77, 94, ${(1 - d / 130) * 0.32})`
						ctx.lineWidth = 1
						ctx.stroke()
					}
				}
			}
			if (!still) raf = requestAnimationFrame(draw)
		}

		const move = e => {
			mouse.x = e.clientX
			mouse.y = e.clientY
		}

		size()
		draw()
		window.addEventListener('resize', size)
		window.addEventListener('mousemove', move)
		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', size)
			window.removeEventListener('mousemove', move)
		}
	}, [])

	return <canvas ref={ref} />
}
