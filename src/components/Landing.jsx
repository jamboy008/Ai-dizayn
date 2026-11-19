import Icon from './Icon.jsx'
import Particles from './Particles.jsx'
import { Reveal, Count } from './Motion.jsx'

const stats = [
	{ to: 12400, dec: 0, suf: '+', label: 'Faol foydalanuvchi' },
	{ to: 1.8, dec: 1, suf: ' mln+', label: 'Bajarilgan vazifa' },
	{ to: 4.9, dec: 1, suf: '/5', label: 'O‘rtacha reyting' },
	{ to: 99.9, dec: 1, suf: '%', label: 'Ishlash vaqti' },
]

const dist = [
	['5', 88],
	['4', 9],
	['3', 2],
	['2', 1],
	['1', 0],
]

const features = [
	[
		'panel',
		'Ko‘p agentli boshqaruv',
		'Har bir agent o‘z vazifasini bajaradi: yig‘adi, tahlil qiladi, yuboradi. Siz esa hammasini bitta oynadan boshqarasiz.',
	],
	[
		'check',
		'Real vaqtda kuzatuv',
		'Qaysi agent nima qilayotgani, qaysi bosqichda ekani va qancha qolgani doim ko‘rinib turadi.',
	],
	[
		'clip',
		'Fayl tahlili',
		'Hujjat, jadval yoki skrinshot biriktiring. Agent uni o‘qib, kerakli xulosani tayyorlaydi.',
	],
	[
		'mic',
		'Ovozli buyruqlar',
		'Yozishga vaqt yo‘qmi? Vazifani ovoz bilan ayting, matn avtomatik yoziladi.',
	],
	[
		'globe',
		'Veb-qidiruv',
		'Agentlar internetdan yangi ma’lumot topib, jarayonga qo‘shadi.',
	],
	[
		'gear',
		'Moslashuvchan sozlamalar',
		'Ranglar, animatsiya va profil o‘zingizga moslab sozlanadi.',
	],
]

const steps = [
	[
		'Vazifa bering',
		'Nimani avtomatlashtirmoqchi ekaningizni oddiy tilda yozing yoki ayting.',
	],
	[
		'Agentlar bajaradi',
		'Vazifa bosqichlarga bo‘linadi va agentlar uni birin-ketin bajaradi.',
	],
	[
		'Natijani oling',
		'Tayyor hisobot, jadval yoki xulosa natijalar bo‘limida sizni kutadi.',
	],
]

const quotes = [
	[
		'Haftalik hisobot tayyorlash avval ikki soat olardi. Endi dushanba ertalab o‘zi tayyor turadi.',
		'Dilnoza R.',
		'Marketing rahbari',
	],
	[
		'Eng yoqqani vazifalar paneli. Agent qayerda to‘xtab qolganini darrov ko‘raman.',
		'Sardor K.',
		'Jamoa lideri',
	],
	[
		'Boshqa AI vositalariga o‘xshamaydi. Menga chat emas, ishni bajaradigan jamoa kerak edi.',
		'Aziza M.',
		'Tadbirkor',
	],
]

const apps = [
	'Telegram',
	'Google Sheets',
	'Slack',
	'Notion',
	'GitHub',
	'Email',
	'Webhook',
	'CRM',
	'Excel',
	'Calendar',
]

const go = id =>
	document
		.getElementById(id)
		?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function Landing({ onAuth }) {
	return (
		<>
			<div className='landing-bg' aria-hidden='true'>
				<Particles />
			</div>
			<div className='landing'>
				<header className='l-nav glass'>
					<div className='l-brand'>
						<span className='logo' />
						<strong>Command Center</strong>
					</div>
					<nav className='l-links' aria-label='Bo‘limlar'>
						<button onClick={() => go('imkoniyatlar')}>Imkoniyatlar</button>
						<button onClick={() => go('korsatkichlar')}>Ko‘rsatkichlar</button>
						<button onClick={() => go('fikrlar')}>Fikrlar</button>
					</nav>
					<div className='l-actions'>
						<button className='btn ghost small' onClick={() => onAuth('in')}>
							Kirish
						</button>
						<button className='btn small' onClick={() => onAuth('up')}>
							Boshlash
						</button>
					</div>
				</header>

				<section className='l-hero'>
					<span className='ring r1' aria-hidden='true' />
					<span className='ring r2' aria-hidden='true' />
					<p className='badge'>
						<i />
						Yangi: ko‘p agentli ish jarayonlari
					</p>
					<h1>Jarayonlaringizni agentlarga topshiring</h1>
					<p className='lead'>
						Command Center vazifani bosqichlarga bo‘ladi, agentlarni ishga
						tushiradi va natijani sizga tayyor holda beradi. Hammasi bitta
						boshqaruv oynasida.
					</p>
					<div className='cta'>
						<button className='btn big' onClick={() => onAuth('up')}>
							Bepul boshlash
						</button>
						<button className='btn ghost big' onClick={() => onAuth('in')}>
							Hisobga kirish
						</button>
					</div>
					<div className='trust'>
						<span className='stars' aria-label='5 dan 4.9 reyting'>
							★★★★★
						</span>
						<span>4.9 reyting · 12 400+ foydalanuvchi ishonadi</span>
					</div>

					<div className='stage'>
						<span className='float f1'>Yig‘uvchi · tayyor</span>
						<span className='float f2'>Tahlilchi · jarayonda</span>
						<span className='float f3'>Xabarchi · navbatda</span>
						<div className='preview glass'>
							<div className='pv-bar'>
								<i />
								<i />
								<i />
								<span>Command Center</span>
							</div>
							<div className='pv-body'>
								<aside className='pv-side'>
									<b>Suhbatlar</b>
									<span className='on'>Haftalik hisobot</span>
									<span>Mijozlar so‘rovi</span>
									<span>Ombor ogohlantirishi</span>
									<span>Narxlar monitoringi</span>
								</aside>
								<div className='pv-chat'>
									<p className='pv-u'>
										Har dushanba hisobotni yig‘ib, jamoaga yubor
									</p>
									<p className='pv-a'>
										Agentlarni ishga tushirdim
										<i className='caret' />
									</p>
									<div className='pv-tasks'>
										<div className='pv-t'>
											<span>CRM dan ma’lumot olish</span>
											<div>
												<i style={{ animationDelay: '0s' }} />
											</div>
										</div>
										<div className='pv-t'>
											<span>Jadvalga jamlash</span>
											<div>
												<i style={{ animationDelay: '1.4s' }} />
											</div>
										</div>
										<div className='pv-t'>
											<span>Jamoaga xabar yuborish</span>
											<div>
												<i style={{ animationDelay: '2.8s' }} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<div className='marquee' aria-label='Integratsiyalar'>
					<div className='track'>
						{[...apps, ...apps].map((a, i) => (
							<span key={i}>{a}</span>
						))}
					</div>
				</div>

				<section className='l-sec' id='korsatkichlar'>
					<Reveal>
						<h2>Raqamlar o‘zi gapiradi</h2>
					</Reveal>
					<div className='stats'>
						{stats.map((s, i) => (
							<Reveal key={s.label} delay={i * 90} className='stat glass'>
								<strong>
									<Count to={s.to} decimals={s.dec} suffix={s.suf} />
								</strong>
								<span>{s.label}</span>
							</Reveal>
						))}
					</div>
					<Reveal className='rating glass'>
						<div className='r-big'>
							<strong>4.9</strong>
							<span className='stars'>★★★★★</span>
							<small>2 340 ta sharh asosida</small>
						</div>
						<div className='r-bars'>
							{dist.map(([n, pct]) => (
								<div key={n} className='rbar'>
									<span>{n} yulduz</span>
									<div>
										<i style={{ '--w': `${pct}%` }} />
									</div>
									<em>{pct}%</em>
								</div>
							))}
						</div>
					</Reveal>
				</section>

				<section className='l-sec' id='imkoniyatlar'>
					<Reveal>
						<h2>Chatdan ko‘proq: ishni bajaradigan jamoa</h2>
					</Reveal>
					<div className='features'>
						{features.map(([icon, title, text], i) => (
							<Reveal key={title} delay={(i % 3) * 90} className='feat glass'>
								<span className='f-ico'>
									<Icon name={icon} size={22} />
								</span>
								<h3>{title}</h3>
								<p>{text}</p>
							</Reveal>
						))}
					</div>
				</section>

				<section className='l-sec'>
					<Reveal>
						<h2>Qanday ishlaydi</h2>
					</Reveal>
					<ol className='steps'>
						{steps.map(([title, text], i) => (
							<Reveal key={title} delay={i * 120} className='step'>
								<span className='num'>{i + 1}</span>
								<h3>{title}</h3>
								<p>{text}</p>
							</Reveal>
						))}
					</ol>
				</section>

				<section className='l-sec' id='fikrlar'>
					<Reveal>
						<h2>Foydalanuvchilar fikri</h2>
					</Reveal>
					<div className='quotes'>
						{quotes.map(([text, name, role], i) => (
							<Reveal key={name} delay={i * 90} className='quote glass'>
								<span className='stars'>★★★★★</span>
								<p>{text}</p>
								<footer>
									<span className='q-av'>{name[0]}</span>
									<div>
										<strong>{name}</strong>
										<small>{role}</small>
									</div>
								</footer>
							</Reveal>
						))}
					</div>
				</section>

				<section className='l-sec'>
					<Reveal className='final glass'>
						<h2>Birinchi agentingizni bugun ishga tushiring</h2>
						<p>Ro‘yxatdan o‘tish bir daqiqa oladi. Karta kerak emas.</p>
						<button className='btn big' onClick={() => onAuth('up')}>
							Bepul boshlash
						</button>
					</Reveal>
				</section>

				<footer className='l-foot'>
					<div className='l-brand'>
						<span className='logo' />
						<strong>Command Center</strong>
					</div>
					<span>© 2026 Command Center. Barcha huquqlar himoyalangan.</span>
				</footer>
			</div>
		</>
	)
}
