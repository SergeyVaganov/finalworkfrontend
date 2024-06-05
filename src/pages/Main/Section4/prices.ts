export type IPrices = typeof prices[0]


export const prices = [
    {
        name: 'Beginner',
        desciption: 'Для небольшого исследования',
        icon: '/img/gallery/beginner.svg',
        color: '#FFB64F',
        current: true,
        price: 799,
        oldPrice: 1200,
        descriptionPrice: 'или 150 ₽/мес. при рассрочке на 24 мес.',
        include: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7']
    },
    {
        name: 'Pro',
        desciption: 'Для HR и фрилансеров',
        icon: '/img/gallery/pro.svg',
        color: '#7CE3E1',
        current: false,
        price: 1299,
        oldPrice: 2600,
        descriptionPrice: 'или 279 ₽/мес. при рассрочке на 24 мес.',
        include: ['Все пункты тарифа Beginner', 'Экспорт истории', 'Рекомендации по приоритетам']
    },
    {
        name: 'Business',
        desciption: 'Для корпоративных клиентов',
        icon: '/img/gallery/business.svg',
        color: '#000000',
        current: false,
        price: 2379,
        oldPrice: 3700,
        descriptionPrice: ' ',
        include: ['Все пункты тарифа Pro', 'Безлимитное количество запросов', 'Приоритетная поддержка']
    },
]