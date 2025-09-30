/**
 * 🚀 Mobile-Optimized Service Worker
 * Агрессивное кэширование для мгновенных переходов на мобильных устройствах
 */

const CACHE_NAME = 'radar-mobile-v1.0.5';
const STATIC_CACHE = 'radar-static-v1.0.5';
const DYNAMIC_CACHE = 'radar-dynamic-v1.0.5';
const API_CACHE = 'radar-api-v1.0.5';

// Критические ресурсы для немедленного кэширования
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/app-icon.png',
  '/assets/index.js', // Основной bundle
  '/assets/react-vendor.js', // React библиотеки
  '/assets/app-core.js', // Контексты и хуки
];

// JavaScript chunks для компонентов (будут кэшироваться по запросу)
const COMPONENT_CHUNKS = [
  '/chunks/main-screen-',
  '/chunks/report-screen-',
  '/chunks/community-screen-',
  '/chunks/profile-screen-',
  '/chunks/friends-screen-',
  '/chunks/wanted-screen-',
  '/chunks/notifications-screen-',
];

// API эндпоинты для кэширования
const API_ENDPOINTS = [
  '/rest/v1/profiles',
  '/rest/v1/incidents', 
  '/rest/v1/social_feed',
  '/rest/v1/friend_requests',
  '/rest/v1/user_push_tokens',
];

// Устанавливаем Service Worker
self.addEventListener('install', (event) => {
  console.log('🚀 SW: Installing mobile-optimized service worker');
  
  event.waitUntil(
    (async () => {
      // Кэшируем критические ресурсы
      const staticCache = await caches.open(STATIC_CACHE);
      
      try {
        await staticCache.addAll(CRITICAL_ASSETS);
        console.log('✅ SW: Critical assets cached');
      } catch (error) {
        console.warn('⚠️ SW: Some critical assets failed to cache:', error);
        // Кэшируем те, которые доступны
        for (const asset of CRITICAL_ASSETS) {
          try {
            await staticCache.add(asset);
          } catch (e) {
            console.warn(`Failed to cache ${asset}:`, e);
          }
        }
      }
      
      // Принудительно активируем новый SW
      self.skipWaiting();
    })()
  );
});

// Активируем Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 SW: Activating mobile service worker');
  
  event.waitUntil(
    (async () => {
      // Очищаем старые кэши
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => 
        name.startsWith('radar-') && 
        !name.includes('v1.0.5')
      );
      
      await Promise.all(
        oldCaches.map(cache => {
          console.log(`🗑️ SW: Deleting old cache: ${cache}`);
          return caches.delete(cache);
        })
      );
      
      // Получаем контроль над всеми вкладками
      self.clients.claim();
      console.log('✅ SW: Service worker activated');
    })()
  );
});

// Обработка fetch запросов с умным кэшированием
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Игнорируем non-GET запросы
  if (request.method !== 'GET') {
    return;
  }
  
  // Игнорируем запросы к другим доменам (кроме API)
  if (url.origin !== location.origin && !url.hostname.includes('supabase')) {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

/**
 * Умный обработчик fetch запросов
 */
async function handleFetch(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // 1. Статические ресурсы (JS, CSS, изображения)
    if (isStaticAsset(pathname)) {
      return await handleStaticAsset(request);
    }
    
    // 2. JavaScript chunks компонентов
    if (isComponentChunk(pathname)) {
      return await handleComponentChunk(request);
    }
    
    // 3. API запросы к Supabase
    if (isApiRequest(url)) {
      return await handleApiRequest(request);
    }
    
    // 4. HTML страницы (SPA)
    if (isNavigationRequest(request)) {
      return await handleNavigation(request);
    }
    
    // 5. Все остальное - просто пробуем сеть
    return await fetch(request);
    
  } catch (error) {
    console.error('SW: Fetch error:', error);
    
    // Fallback для навигации
    if (isNavigationRequest(request)) {
      const cache = await caches.open(STATIC_CACHE);
      const cachedResponse = await cache.match('/index.html');
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    throw error;
  }
}

/**
 * Обработка статических ресурсов (Cache First)
 */
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Возвращаем из кэша немедленно
    updateCacheInBackground(cache, request);
    return cachedResponse;
  }
  
  // Загружаем и кэшируем
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

/**
 * Обработка JavaScript chunks (Cache First с интеллектуальной предзагрузкой)
 */
async function handleComponentChunk(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Загружаем и кэшируем
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
    
    // Запускаем предзагрузку связанных chunks
    preloadRelatedChunks(request.url);
  }
  
  return response;
}

/**
 * Обработка API запросов (Stale While Revalidate)
 */
async function handleApiRequest(request) {
  const cache = await caches.open(API_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Запускаем обновление в фоне
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cachedResponse); // Fallback на кэш при ошибке
  
  // Возвращаем кэш немедленно, если есть
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Иначе ждем сеть
  return fetchPromise;
}

/**
 * Обработка навигации (SPA)
 */
async function handleNavigation(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match('/index.html');
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Если нет кэша, пробуем сеть
  return fetch(request);
}

/**
 * Предзагрузка связанных chunks в фоне
 */
function preloadRelatedChunks(currentChunkUrl) {
  // Определяем, какие chunks могут понадобиться следующими
  const chunkMap = {
    'main-screen': ['report-screen', 'community-screen'],
    'report-screen': ['main-screen'],
    'community-screen': ['friends-screen', 'profile-screen'],
    'profile-screen': ['friends-screen', 'main-screen'],
    'friends-screen': ['profile-screen', 'community-screen'],
    'wanted-screen': ['main-screen'],
    'notifications-screen': ['main-screen']
  };
  
  const currentChunk = Object.keys(chunkMap).find(chunk => 
    currentChunkUrl.includes(chunk)
  );
  
  if (currentChunk) {
    const relatedChunks = chunkMap[currentChunk];
    relatedChunks.forEach(chunk => {
      // Предзагружаем с задержкой, чтобы не мешать текущей загрузке
      setTimeout(() => preloadChunk(chunk), 1000);
    });
  }
}

/**
 * Предзагрузка конкретного chunk
 */
async function preloadChunk(chunkName) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const chunkPattern = `/chunks/${chunkName}-`;
    
    // Ищем актуальный хэш chunk в кэше
    const cachedKeys = await cache.keys();
    const existingChunk = cachedKeys.find(request => 
      request.url.includes(chunkPattern)
    );
    
    if (!existingChunk) {
      console.log(`🚀 SW: Preloading chunk: ${chunkName}`);
      // Здесь можно было бы попробовать загрузить, но без точного хэша сложно
    }
  } catch (error) {
    console.warn(`SW: Failed to preload chunk ${chunkName}:`, error);
  }
}

/**
 * Обновление кэша в фоне
 */
function updateCacheInBackground(cache, request) {
  // Обновляем кэш в фоне, не блокируя ответ
  setTimeout(async () => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response);
      }
    } catch (error) {
      // Игнорируем ошибки фонового обновления
    }
  }, 100);
}

// Утилиты для определения типа запроса
function isStaticAsset(pathname) {
  return pathname.includes('/assets/') || 
         pathname.endsWith('.js') || 
         pathname.endsWith('.css') || 
         pathname.endsWith('.png') || 
         pathname.endsWith('.jpg') || 
         pathname.endsWith('.svg') ||
         pathname.endsWith('.ico');
}

function isComponentChunk(pathname) {
  return pathname.includes('/chunks/') && pathname.endsWith('.js');
}

function isApiRequest(url) {
  return url.hostname.includes('supabase.co') || 
         url.pathname.startsWith('/rest/v1/') ||
         url.pathname.startsWith('/functions/v1/');
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && 
          request.headers.get('accept').includes('text/html'));
}

// Обработка сообщений от приложения
self.addEventListener('message', (event) => {
  const { type, data } = event.data || {};
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_ROUTE':
      // Приложение может запросить кэширование конкретного роута
      if (data?.url) {
        cacheRoute(data.url);
      }
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches();
      break;
      
    default:
      break;
  }
});

/**
 * Кэширование конкретного роута по запросу
 */
async function cacheRoute(url) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.add(url);
    console.log(`✅ SW: Cached route: ${url}`);
  } catch (error) {
    console.warn(`SW: Failed to cache route ${url}:`, error);
  }
}

/**
 * Очистка всех кэшей
 */
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(name => name.startsWith('radar-'))
      .map(name => caches.delete(name))
  );
  console.log('🗑️ SW: All caches cleared');
} 