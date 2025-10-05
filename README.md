# 🎯 TIPAZO - Платформа для Чаевых

**TIPAZO** - это современное мобильное приложение для системы чаевых, построенное на React Native с Expo. Приложение позволяет работникам получать чаевые от клиентов через QR-коды, криптовалютные кошельки и традиционные банковские переводы.

## 📱 О приложении

TIPAZO - это инновационная платформа, которая революционизирует способ получения чаевых. Приложение объединяет традиционные методы оплаты с современными криптовалютными решениями, создавая универсальную экосистему для работников сферы услуг.

### 🌟 Основные возможности

- **💳 Множественные способы оплаты**: QR-коды, криптовалюты, банковские переводы
- **🔐 Безопасная аутентификация**: Интеграция с Supabase
- **📊 Аналитика доходов**: Отслеживание чаевых и статистика
- **🎯 Система целей**: Постановка и отслеживание финансовых целей
- **💬 Система отзывов**: Взаимодействие между работниками и клиентами
- **📱 Кроссплатформенность**: iOS и Android

## 🏗️ Технический стек

### Frontend
- **React Native** - Кроссплатформенная разработка
- **Expo SDK 54** - Фреймворк для React Native
- **TypeScript** - Типизированный JavaScript
- **Expo Router** - Навигация
- **Zustand** - Управление состоянием
- **NativeWind** - Стилизация

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - База данных
- **Supabase Auth** - Аутентификация
- **Supabase Realtime** - Реальное время

### Дополнительные технологии
- **tRPC** - Типобезопасные API
- **React Query** - Управление серверным состоянием
- **Lucide React Native** - Иконки
- **React Native SVG** - Векторная графика

## 📋 Структура проекта

```
tipazo/
├── app/                    # Экранные компоненты (Expo Router)
│   ├── (auth)/            # Аутентификация
│   ├── (client)/         # Клиентские экраны
│   ├── (tabs)/           # Основные табы
│   └── profile/          # Профиль пользователя
├── components/            # Переиспользуемые компоненты
├── lib/                   # Утилиты и конфигурация
│   ├── supabase.ts       # Конфигурация Supabase
│   ├── api.ts            # API клиент
│   └── trpc.ts           # tRPC конфигурация
├── store/                 # Zustand хранилища
├── types/                 # TypeScript типы
├── utils/                 # Вспомогательные функции
├── hooks/                 # Пользовательские хуки
└── constants/            # Константы приложения
```

## 🚀 Быстрый старт

### Предварительные требования

- **Node.js** (версия 18 или выше)
- **npm** или **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **Git**

### Установка

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/uruguayo77/Tipazo-v.1.0.0-oct-2025.git
cd Tipazo-v.1.0.0-oct-2025
```

2. **Установите зависимости**
```bash
npm install
```

3. **Настройте переменные окружения**
```bash
# Скопируйте файл примера
cp .env.example .env

# Отредактируйте .env файл
# EXPO_PUBLIC_RORK_API_BASE_URL=http://your-backend-url
# JWT_SECRET=your-jwt-secret
```

4. **Запустите приложение**
```bash
# Запуск в режиме разработки
npm start

# Или для конкретной платформы
npm run android
npm run ios
npm run web
```

## 📱 Сборка приложения

### Development Build
```bash
# Установите EAS CLI
npm install -g @expo/eas-cli

# Войдите в аккаунт Expo
eas login

# Создайте development build
eas build --profile development --platform android
```

### Production Build
```bash
# Создайте production build
eas build --profile production --platform android

# Для iOS
eas build --profile production --platform ios
```

### Обновления (OTA)
```bash
# Публикация обновления
eas update --branch production --message "Новая версия приложения"
```

## 🗄️ База данных

### Основные таблицы

- **`tipazo_users`** - Пользователи системы
- **`tipazo_workers`** - Профили работников
- **`tipazo_tips`** - Чаевые
- **`tipazo_transactions`** - Транзакции
- **`tipazo_goals`** - Цели пользователей
- **`tipazo_subscriptions`** - Подписки
- **`tipazo_payment_methods`** - Способы оплаты
- **`tipazo_comments`** - Отзывы и комментарии

### Типы пользователей

- **`admin`** - Администраторы системы
- **`worker`** - Работники (получают чаевые)
- **`client`** - Клиенты (отправляют чаевые)

## 🔧 Разработка

### Структура экранов

```
app/
├── (auth)/
│   ├── login.tsx          # Вход в систему
│   ├── register.tsx       # Регистрация
│   └── welcome.tsx        # Приветственный экран
├── (client)/
│   ├── scan.tsx           # Сканирование QR
│   ├── tip-amount.tsx     # Выбор суммы чаевых
│   ├── payment.tsx        # Выбор способа оплаты
│   └── confirmation.tsx   # Подтверждение
├── (tabs)/
│   ├── index.tsx          # Главная страница
│   ├── scan-for-tip.tsx   # Сканирование для чаевых
│   ├── send-tip.tsx       # Отправка чаевых
│   └── profile.tsx        # Профиль
└── profile/
    └── change-password.tsx # Смена пароля
```

### Управление состоянием

Приложение использует **Zustand** для управления состоянием:

- **`auth-store.ts`** - Аутентификация и профиль пользователя
- **`tips-store.ts`** - Управление чаевыми
- **`subscription-store.ts`** - Подписки
- **`goal-store.ts`** - Цели пользователей
- **`notifications-store.ts`** - Уведомления

## 🎨 Дизайн и UI

- **NativeWind** для стилизации (Tailwind CSS для React Native)
- **Адаптивный дизайн** для различных размеров экранов
- **Темная/светлая тема** с автоматическим переключением
- **Анимации** для улучшения пользовательского опыта

## 🔐 Безопасность

- **Supabase Auth** для аутентификации
- **JWT токены** для авторизации
- **Row Level Security (RLS)** в Supabase
- **Шифрование** чувствительных данных
- **Валидация** на клиенте и сервере

## 📊 Аналитика и мониторинг

- **Отслеживание чаевых** в реальном времени
- **Статистика доходов** по периодам
- **Аналитика целей** и прогресса
- **Уведомления** о новых чаевых

## 🚀 Деплой

### Vercel (Web)
```bash
# Деплой на Vercel
vercel --prod
```

### EAS Build (Mobile)
```bash
# Создание production build
eas build --profile production --platform all

# Публикация в магазины
eas submit --platform all
```

## 📝 Скрипты

```bash
# Разработка
npm start                 # Запуск Expo
npm run android          # Android
npm run ios              # iOS
npm run web              # Web

# Сборка
npm run build:android    # Android APK
npm run build:ios        # iOS
npm run build:web        # Web

# EAS
eas build                # Сборка
eas update               # Обновление
eas submit               # Публикация
```

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 👥 Команда

- **Разработчик**: uruguayo77
- **Версия**: 1.0.12
- **Дата релиза**: Октябрь 2025

## 📞 Поддержка

Если у вас есть вопросы или проблемы:

- Создайте [Issue](https://github.com/uruguayo77/Tipazo-v.1.0.0-oct-2025/issues)
- Свяжитесь с командой разработки

---

**TIPAZO** - Революционизируем способ получения чаевых! 🎯💫