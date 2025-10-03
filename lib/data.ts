// lib/data.ts

import { MultiLangContent } from './types';

/**
 * Barcha tillar uchun asosiy kontent ma'lumotlari.
 * Admin panel ishlatilmasa, sayt bu ma'lumotlardan foydalanadi.
 */
export const defaultContent: MultiLangContent = {
    uzb: {
        header: {
            links: ["Bosh sahifa", "Biz Haqimizda", "Xizmatlar", "Natijalar", "Izohlar"],
        },
        about: {
            heading: "Biz Haqimizda",
            text: "ICP – Innovate, Create, Perform. Biz raqamli transformatsiya va innovatsion yechimlar orqali biznesingizni yangi bosqichga olib chiqamiz.",
            items: [
                {
                    icon: 'lightbulb',
                    title: "Innovatsiya",
                    description: "Biz doimo bozor tendensiyalarini o'rganamiz va mijozlarimiz uchun eng ilg'or texnologiyalarni joriy etamiz.",
                },
                {
                    icon: 'pentool',
                    title: "Yaratuvchanlik (Creativity)",
                    description: "Har bir loyihaga individual yondashamiz, funksionallikni yuqori darajadagi dizayn bilan uyg'unlashtiramiz.",
                },
                {
                    icon: 'rocket',
                    title: "Natijaga erishish",
                    description: "Biz va'da bergan natijalarga o'z vaqtida va yuqori sifatda erishishni asosiy ustuvor vazifa deb bilamiz.",
                },
            ],
        },
        services: {
            heading: "Bizning Xizmatlarimiz",
            text: "Raqamli o'sishingiz uchun zarur bo'lgan to'liq spektrdagi IT xizmatlarini taklif etamiz.",
            items: [
                {
                    icon: 'code',
                    title: "Web va Mobil Ilovani Ishlab Chiqish",
                    description: "Zamonaviy React, Next.js, va mobil texnologiyalarida yuqori tezlikda ishlaydigan va foydalanuvchiga qulay ilovalar yaratish.",
                },
                {
                    icon: 'design',
                    title: "UI/UX Dizayn",
                    description: "Mijozlaringizni jalb qiluvchi va ularni ushlab qoluvchi, estetik va intuitiv interfeyslar yaratish.",
                },
                {
                    icon: 'cloud',
                    title: "Cloud Arhitektura va DevOps",
                    description: "Amazon AWS, Google Cloud yechimlarida infratuzilmani avtomatlashtirish, optimallashtirish va Continuous Integration/Deployment (CI/CD) ni yo'lga qo'yish.",
                },
                {
                    icon: 'database',
                    title: "Big Data va Analitika",
                    description: "Katta hajmdagi ma'lumotlarni tahlil qilish, vizualizatsiya qilish va biznes qarorlar qabul qilish uchun xulosalar taqdim etish.",
                },
                {
                    icon: 'security',
                    title: "Kiberxavfsizlik Auditi",
                    description: "Ilovalaringiz va tizimlaringizdagi zaifliklarni aniqlash va ularni yo'q qilish, ma'lumotlaringiz xavfsizligini ta'minlash.",
                },
                {
                    icon: 'support',
                    title: "24/7 Texnik Qo'llab-quvvatlash",
                    description: "Tizimlaringizning uzluksiz ishlashini ta'minlash uchun doimiy monitoring va tezkor texnik yordam xizmatini taklif etamiz.",
                },
            ],
        },
        portfolio: {
            heading: "Bizning Natijalarimiz",
            text: "Bizning eng muvaffaqiyatli loyihalarimizga qisqacha nazar. Har bir loyiha mijozning maxsus ehtiyojlarini qondirish uchun yaratilgan.",
            items: [
                {
                    title: "E-commerce platformasi 'Sotuvchi'",
                    description: "Katta tovar aylanmasini boshqarish va sotuvchilarga qulay interfeys yaratish uchun masshtablanuvchi platforma.",
                    tag: "Web App",
                    link: "#"
                },
                {
                    title: "Hajm bo'yicha ma'lumot tahlili",
                    description: "Geolokatsion ma'lumotlarni qayta ishlash va mijozlar xatti-harakatini bashorat qilish uchun AI tizimi.",
                    tag: "Big Data / AI",
                    link: "#"
                },
                {
                    title: "Ichki CRM tizimi",
                    description: "Kompaniyaning barcha ichki jarayonlarini avtomatlashtirish uchun yagona va moslashtirilgan CRM.",
                    tag: "Enterprise Software",
                    link: "#"
                },
            ],
        },
        comments: {
            heading: "Mijozlarimizdan Izohlar",
            text: "Bizning ish sifatimiz haqida mijozlarimizning fikrlari.",
            form: {
                name: "Ismingiz",
                message: "Xabaringiz",
                submit: "Izoh Qoldirish",
                success: "Izohingiz muvaffaqiyatli qabul qilindi. U moderator tomonidan tasdiqlangandan so'ng ko'rsatiladi."
            },
            listHeading: "Tasdiqlangan Izohlar"
        },
        footer: {
            address: "Toshkent shahri, Yunusobod tumani, Amir Temur ko'chasi 13",
            phone: "+998 71 200 70 70",
            email: "info@icp-agency.uz",
            copyright: "ICP Innovate Create Perform © 2024. Barcha huquqlar himoyalangan.",
            contactsHeading: "Biz bilan bog'lanish"
        },
    },
    rus: {
        header: {
            links: ["Главная", "О нас", "Услуги", "Портфолио", "Отзывы"],
        },
        about: {
            heading: "О нас",
            text: "ICP – Innovate, Create, Perform. Мы выводим ваш бизнес на новый уровень с помощью цифровой трансформации и инновационных решений.",
            items: [
                {
                    icon: 'lightbulb',
                    title: "Инновации",
                    description: "Мы постоянно изучаем рыночные тенденции и внедряем передовые технологии для наших клиентов.",
                },
                {
                    icon: 'pentool',
                    title: "Креативность",
                    description: "Мы подходим к каждому проекту индивидуально, сочетая функциональность с высококлассным дизайном.",
                },
                {
                    icon: 'rocket',
                    title: "Результативность",
                    description: "Своевременное и качественное достижение обещанных результатов мы считаем приоритетной задачей.",
                },
            ],
        },
        services: {
            heading: "Наши Услуги",
            text: "Предлагаем полный спектр IT-услуг, необходимых для вашего цифрового роста.",
            items: [
                {
                    icon: 'code',
                    title: "Разработка Web и Мобильных Приложений",
                    description: "Создание высокоскоростных и удобных для пользователя приложений на современных технологиях React, Next.js и мобильных платформах.",
                },
                {
                    icon: 'design',
                    title: "UI/UX Дизайн",
                    description: "Создание эстетически приятных и интуитивно понятных интерфейсов, которые привлекают и удерживают ваших клиентов.",
                },
                {
                    icon: 'cloud',
                    title: "Облачная Архитектура и DevOps",
                    description: "Автоматизация, оптимизация инфраструктуры и внедрение CI/CD на решениях Amazon AWS, Google Cloud.",
                },
                {
                    icon: 'database',
                    title: "Big Data и Аналитика",
                    description: "Анализ, визуализация больших объемов данных и предоставление выводов для принятия бизнес-решений.",
                },
                {
                    icon: 'security',
                    title: "Аудит Кибербезопасности",
                    description: "Выявление и устранение уязвимостей в ваших приложениях и системах, обеспечение безопасности ваших данных.",
                },
                {
                    icon: 'support',
                    title: "Техническая Поддержка 24/7",
                    description: "Предоставляем постоянный мониторинг и оперативную техническую помощь для обеспечения бесперебойной работы ваших систем.",
                },
            ],
        },
        portfolio: {
            heading: "Наши Результаты",
            text: "Краткий обзор наших самых успешных проектов. Каждый проект был создан для удовлетворения конкретных потребностей клиента.",
            items: [
                {
                    title: "Платформа E-commerce 'Продавец'",
                    description: "Масштабируемая платформа для управления большим товарооборотом и удобным интерфейсом для продавцов.",
                    tag: "Web App",
                    link: "#"
                },
                {
                    title: "Анализ геоданных",
                    description: "Система ИИ для обработки геопространственных данных и прогнозирования поведения клиентов.",
                    tag: "Big Data / AI",
                    link: "#"
                },
                {
                    title: "Внутренняя система CRM",
                    description: "Единая и кастомизированная CRM для автоматизации всех внутренних процессов компании.",
                    tag: "Enterprise Software",
                    link: "#"
                },
            ],
        },
        comments: {
            heading: "Отзывы Наших Клиентов",
            text: "Мнения наших клиентов о качестве нашей работы.",
            form: {
                name: "Ваше имя",
                message: "Ваше сообщение",
                submit: "Оставить отзыв",
                success: "Ваш отзыв успешно принят. Он будет отображен после утверждения модератором."
            },
            listHeading: "Одобренные Отзывы"
        },
        footer: {
            address: "г. Ташкент, Юнусабадский район, ул. Амира Темура 13",
            phone: "+998 71 200 70 70",
            email: "info@icp-agency.uz",
            copyright: "ICP Innovate Create Perform © 2024. Все права защищены.",
            contactsHeading: "Свяжитесь с нами"
        },
    },
    eng: {
        header: {
            links: ["Home", "About Us", "Services", "Portfolio", "Comments"],
        },
        about: {
            heading: "About Us",
            text: "ICP – Innovate, Create, Perform. We elevate your business to the next level through digital transformation and innovative solutions.",
            items: [
                {
                    icon: 'lightbulb',
                    title: "Innovation",
                    description: "We constantly study market trends and implement cutting-edge technologies for our clients.",
                },
                {
                    icon: 'pentool',
                    title: "Creativity",
                    description: "We approach every project individually, combining high functionality with premium design.",
                },
                {
                    icon: 'rocket',
                    title: "Performance",
                    description: "We prioritize achieving promised results in a timely manner and with high quality.",
                },
            ],
        },
        services: {
            heading: "Our Services",
            text: "We offer a full spectrum of IT services necessary for your digital growth.",
            items: [
                {
                    icon: 'code',
                    title: "Web and Mobile App Development",
                    description: "Creating high-speed and user-friendly applications using modern React, Next.js, and mobile technologies.",
                },
                {
                    icon: 'design',
                    title: "UI/UX Design",
                    description: "Crafting aesthetic and intuitive interfaces that attract and retain your customers.",
                },
                {
                    icon: 'cloud',
                    title: "Cloud Architecture and DevOps",
                    description: "Automation, optimization of infrastructure, and implementation of CI/CD using Amazon AWS, Google Cloud solutions.",
                },
                {
                    icon: 'database',
                    title: "Big Data and Analytics",
                    description: "Analyzing, visualizing large volumes of data, and providing insights for making informed business decisions.",
                },
                {
                    icon: 'security',
                    title: "Cybersecurity Audit",
                    description: "Identifying and eliminating vulnerabilities in your applications and systems, ensuring the security of your data.",
                },
                {
                    icon: 'support',
                    title: "24/7 Technical Support",
                    description: "We provide continuous monitoring and prompt technical assistance to ensure the uninterrupted operation of your systems.",
                },
            ],
        },
        portfolio: {
            heading: "Our Results",
            text: "A brief overview of our most successful projects. Each project is tailored to meet the client's specific needs.",
            items: [
                {
                    title: "E-commerce Platform 'Seller'",
                    description: "A scalable platform for managing high turnover and providing a user-friendly interface for vendors.",
                    tag: "Web App",
                    link: "#"
                },
                {
                    title: "Geospatial Data Analysis",
                    description: "An AI system for processing geospatial data and predicting customer behavior.",
                    tag: "Big Data / AI",
                    link: "#"
                },
                {
                    title: "Internal CRM System",
                    description: "A unified and customized CRM to automate all internal company processes.",
                    tag: "Enterprise Software",
                    link: "#"
                },
            ],
        },
        comments: {
            heading: "Client Testimonials",
            text: "What our clients say about the quality of our work.",
            form: {
                name: "Your Name",
                message: "Your Message",
                submit: "Leave Comment",
                success: "Your comment has been successfully received. It will be displayed after moderator approval."
            },
            listHeading: "Approved Comments"
        },
        footer: {
            address: "Tashkent city, Yunusabad district, Amir Temur street 13",
            phone: "+998 71 200 70 70",
            email: "info@icp-agency.uz",
            copyright: "ICP Innovate Create Perform © 2024. All rights reserved.",
            contactsHeading: "Contact Us"
        },
    }
};
export const socialLinks = {
  telegram: "icp_company007",
  instagram: "taplink.cc/icp_it_company",
  linkedin: "ICP_IT_COMPANY",
  olx: "icp IT kompaniya",
  goldenpage: "icp IT company",
  address: "Toshkent shahar, Chilonzor tumani 99",
  email: "nurbekqodirov322@gmail.com",
};
