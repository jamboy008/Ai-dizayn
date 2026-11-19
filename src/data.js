export const initialChats = [
  {
    id: 1,
    title: 'Haftalik hisobot avtomatlashtirish',
    time: 'Bugun',
    messages: [
      { id: 1, role: 'user', text: 'Har dushanba mijozlar hisobotini yig‘ib, jamoaga yuborib turadigan agent kerak.', files: [] },
      { id: 2, role: 'ai', text: 'Tushundim. Agent ma’lumotni CRM dan oladi, jadvalga jamlaydi va dushanba soat 09:00 da jamoaga yuboradi. Xohlasangiz yuborish vaqtini o‘zgartirishimiz mumkin.', files: [] },
    ],
  },
  { id: 2, title: 'Mijozlar so‘rovini saralash', time: 'Bugun', messages: [] },
  { id: 3, title: 'Ombor qoldig‘i ogohlantirishi', time: 'Kecha', messages: [] },
  { id: 4, title: 'Telegram bot javoblari', time: 'Kecha', messages: [] },
  { id: 5, title: 'Narxlar monitoringi', time: 'Shu hafta', messages: [] },
]

export const initialTasks = [
  { id: 't1', name: 'CRM dan ma’lumot olish', agent: 'Yig‘uvchi', status: 'done', progress: 100 },
  { id: 't2', name: 'Jadvalga jamlash', agent: 'Tahlilchi', status: 'running', progress: 64 },
  { id: 't3', name: 'Jamoaga xabar yuborish', agent: 'Xabarchi', status: 'queued', progress: 0 },
]

export const initialResults = [
  {
    id: 'r1',
    title: 'Mijozlar hisoboti',
    kind: 'Jadval',
    when: '09:02',
    rows: [
      ['Yangi mijozlar', '128'],
      ['Faol buyurtmalar', '342'],
      ['Qaytarilgan', '7'],
    ],
  },
]

export const stepNames = [
  ['So‘rovni tahlil qilish', 'Tahlilchi'],
  ['Manbalardan ma’lumot yig‘ish', 'Yig‘uvchi'],
  ['Natijani shakllantirish', 'Yozuvchi'],
]

export const replies = [
  'Vazifani qabul qildim va uni bosqichlarga bo‘ldim. Avval ma’lumotni yig‘aman, keyin natijani jamlab, o‘ng paneldagi natijalar bo‘limiga qo‘yaman.',
  'Yaxshi, agentlar ishga tushirildi. Jarayonni o‘ng tomondagi vazifalar bo‘limida kuzatib borishingiz mumkin.',
]
