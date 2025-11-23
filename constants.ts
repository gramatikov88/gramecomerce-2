import { Product, Category, Order, PromoCode } from './types';
import { Smartphone, Laptop, Tv, Shirt, Home, Monitor, Zap, Heart, ShoppingCart, User, Search, Menu, X, MessageCircle, Send, ChevronRight, Star } from 'lucide-react';

export const CATEGORIES: Category[] = [
  { id: 'phones', name: 'Телефони, Таблети & Лаптопи', icon: 'smartphone', subcategories: ['Мобилни телефони', 'Таблети', 'Лаптопи', 'Аксесоари'] },
  { id: 'tv', name: 'TV, Електроника & Гейминг', icon: 'tv', subcategories: ['Телевизори', 'Аудио Hi-Fi', 'Конзоли', 'Игри'] },
  { id: 'appliances', name: 'Големи електроуреди', icon: 'home', subcategories: ['Хладилници', 'Перални', 'Съдомиялни', 'Климатици'] },
  { id: 'fashion', name: 'Мода', icon: 'shirt', subcategories: ['Дамска мода', 'Мъжка мода', 'Обувки', 'Часовници'] },
  { id: 'home', name: 'Дом, Градина & Petshop', icon: 'home', subcategories: ['Мебели', 'Кухня', 'Осветление', 'За домашни любимци'] },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Смартфон Apple iPhone 15 Pro, 128GB, 5G, Blue Titanium",
    price: 2199.00,
    oldPrice: 2449.00,
    image: "https://picsum.photos/400/400?random=1",
    rating: 4.8,
    reviews: 124,
    isGenius: true,
    category: "Телефони",
    description: "iPhone 15 Pro. Изкован от титан и оборудван с революционния чип A17 Pro, персонализиран Action бутон и най-мощната камера система в iPhone досега.",
    features: ["Титан с аерокосмическо качество", "Чип A17 Pro", "48MP основна камера", "USB-C конектор"],
    specs: {
      "Производител": "Apple",
      "Дисплей": "6.1 inch OLED",
      "Процесор": "A17 Pro",
      "Памет": "128 GB",
      "RAM": "8 GB",
      "Батерия": "3274 mAh",
      "Цвят": "Blue Titanium"
    }
  },
  {
    id: 2,
    title: "Лаптоп Apple MacBook Air 13-inch, M2, 8GB RAM, 256GB SSD",
    price: 2399.00,
    oldPrice: 2699.00,
    image: "https://picsum.photos/400/400?random=2",
    rating: 4.9,
    reviews: 85,
    isGenius: true,
    category: "Лаптопи",
    description: "Новият MacBook Air с чип M2 е по-тънък, по-лек и по-бърз. С невероятен дисплей Liquid Retina и до 18 часа живот на батерията.",
    features: ["Apple M2 чип", "13.6-инчов Liquid Retina дисплей", "1080p FaceTime HD камера", "MagSafe 3 зареждане"],
    specs: {
      "Производител": "Apple",
      "Дисплей": "13.6 inch Liquid Retina",
      "Процесор": "Apple M2",
      "Памет": "256 GB SSD",
      "RAM": "8 GB",
      "Батерия": "До 18 часа",
      "Цвят": "Midnight"
    }
  },
  {
    id: 3,
    title: "Телевизор Samsung LED 55CU7172, 55\" (138 см), Smart, 4K Ultra HD",
    price: 849.00,
    oldPrice: 1099.00,
    image: "https://picsum.photos/400/400?random=3",
    rating: 4.5,
    reviews: 342,
    isGenius: false,
    category: "Телевизори",
    description: "Насладете се на кристално чиста картина с PurColor и Crystal Processor 4K. Smart Hub събира цялото ви любимо съдържание на едно място.",
    features: ["Crystal Processor 4K", "PurColor технология", "Smart Hub (Tizen OS)", "Q-Symphony звук"],
    specs: {
      "Производител": "Samsung",
      "Дисплей": "55 inch LED",
      "Резолюция": "3840 x 2160 4K",
      "Smart TV": "Да",
      "OS": "Tizen",
      "Цвят": "Черен"
    }
  },
  {
    id: 4,
    title: "Пералня Samsung WW80T554DAW/S7, 8 кг, 1400 об/мин, Клас B",
    price: 949.00,
    oldPrice: 1299.00,
    image: "https://picsum.photos/400/400?random=4",
    rating: 4.7,
    reviews: 56,
    isGenius: true,
    category: "Перални",
    description: "Иновативна технология EcoBubble за мощно почистване дори при ниски температури. AI Control персонализира прането като запомня навиците ви.",
    features: ["EcoBubble™ технология", "AI Control", "AddWash™ вратичка", "Хигиенна пара"],
    specs: {
      "Производител": "Samsung",
      "Капацитет": "8 кг",
      "Обороти": "1400 об/мин",
      "Енергиен клас": "Клас B",
      "Шум": "72 dB",
      "Цвят": "Бял"
    }
  },
  {
    id: 5,
    title: "Еспресо машина Philips Series 2200 EP2220/10",
    price: 549.00,
    oldPrice: 799.00,
    image: "https://picsum.photos/400/400?random=5",
    rating: 4.6,
    reviews: 890,
    isGenius: true,
    category: "Кафемашини",
    description: "Насладете се на вкусния вкус и аромат на кафе от пресни зърна, при идеалната температура, благодарение на интелигентната система за приготвяне.",
    features: ["Керамични мелачки", "Класическа приставка за мляко", "Сензорен дисплей", "AquaClean филтър"],
    specs: {
      "Производител": "Philips",
      "Тип": "Автоматична",
      "Налягане": "15 bar",
      "Резервоар вода": "1.8 л",
      "Капацитет кафе": "275 гр",
      "Цвят": "Черен"
    }
  },
  {
    id: 6,
    title: "Конзола PlayStation 5 (PS5) Slim, 1TB SSD",
    price: 1049.00,
    image: "https://picsum.photos/400/400?random=6",
    rating: 5.0,
    reviews: 1240,
    isGenius: true,
    category: "Гейминг",
    description: "PlayStation 5 Slim предлага нови възможности за игра, които не сте очаквали. Светкавично зареждане с ултра-бърз SSD и по-дълбоко потапяне.",
    features: ["Тънък дизайн", "1TB SSD съхранение", "Ray Tracing", "4K-TV Gaming до 120Hz"],
    specs: {
      "Производител": "Sony",
      "Платформа": "PlayStation 5",
      "Съхранение": "1 TB SSD",
      "Резолюция": "8K Output",
      "Контролер": "DualSense",
      "Цвят": "Бял"
    }
  },
  {
    id: 7,
    title: "Мъжка тениска Nike, Памук, Черен",
    price: 49.00,
    oldPrice: 79.00,
    image: "https://picsum.photos/400/400?random=7",
    rating: 4.2,
    reviews: 23,
    isGenius: false,
    category: "Мода",
    description: "Класическа тениска Nike Sportswear, изработена от мек памук за ежедневен комфорт. Емблематичното лого на гърдите добавя спортен стил.",
    features: ["100% Памук", "Стандартна кройка", "Обло деколте", "Бродирано лого"],
    specs: {
      "Производител": "Nike",
      "Материал": "100% Памук",
      "Цвят": "Черен",
      "Стил": "Ежедневен",
      "Сезон": "Всесезонен"
    }
  },
  {
    id: 8,
    title: "AirPods Pro (2nd generation) с MagSafe Case (USB-C)",
    price: 529.00,
    oldPrice: 599.00,
    image: "https://picsum.photos/400/400?random=8",
    rating: 4.8,
    reviews: 450,
    isGenius: true,
    category: "Аудио",
    description: "AirPods Pro (2-ро поколение) с MagSafe кутия за зареждане (USB-C) предлагат до 2 пъти повече активно шумопотискане от предишното поколение.",
    features: ["H2 Apple Silicon чип", "Адаптивно аудио", "Персонализиран пространствен звук", "Устойчивост на прах и пот"],
    specs: {
      "Производител": "Apple",
      "Тип": "In-ear",
      "Свързаност": "Bluetooth 5.3",
      "Батерия": "До 6 часа",
      "Кутия": "MagSafe USB-C",
      "Цвят": "Бял"
    }
  }
];

export const HERO_SLIDES = [
  { id: 1, image: "https://picsum.photos/1200/400?random=10", title: "Crazy Days", subtitle: "Само 3 дни супер оферти" },
  { id: 2, image: "https://picsum.photos/1200/400?random=11", title: "IT & Mobile", subtitle: "Технологии на бъдещето" },
  { id: 3, image: "https://picsum.photos/1200/400?random=12", title: "Дом и Градина", subtitle: "Уют за твоя дом" },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Иван Петров',
    email: 'ivan@example.com',
    date: '2024-05-15',
    total: 2199.00,
    status: 'delivered',
    items: [
      { ...PRODUCTS[0], quantity: 1 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Мария Георгиева',
    email: 'maria@example.com',
    date: '2024-05-18',
    total: 898.00,
    status: 'shipped',
    items: [
      { ...PRODUCTS[2], quantity: 1 },
      { ...PRODUCTS[6], quantity: 1 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Георги Димитров',
    email: 'georgi@example.com',
    date: '2024-05-20',
    total: 549.00,
    status: 'pending',
    items: [
      { ...PRODUCTS[4], quantity: 1 }
    ]
  }
];

export const MOCK_PROMOS: PromoCode[] = [
  { id: 'p1', code: 'GENIUS', type: 'percent', value: 10, isActive: true },
  { id: 'p2', code: 'SUMMER', type: 'fixed', value: 20, isActive: true },
  { id: 'p3', code: 'WELCOME50', type: 'fixed', value: 50, isActive: false },
];