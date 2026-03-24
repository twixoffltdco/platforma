export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  authorAvatar: string;
  views: string;
  postedAt: string;
  duration: string;
  category: string;
  description: string;
  embedUrl: string;
}

// Список заблокированных "мусорных" каналов (можно дополнять)
const BLACKLISTED_CHANNELS = ['Мусор1', 'СпамКанал', 'LowQualityContent'];

export const fetchVideos = async (): Promise<Video[]> => {
  // Имитируем запрос к API StreamLiveTV
  // В реальном сценарии здесь будет fetch('https://embesslivestudio.vercel.app/api/videos')
  const mockVideos: Video[] = [
    {
      id: '1',
      title: 'Прямой эфир: Главные новости технологий',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      author: 'StreamLive Tech',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
      views: '1.2M',
      postedAt: '2 часа назад',
      duration: '10:45',
      category: 'Технологии',
      description: 'Обзор последних новинок мира IT и будущего нейросетей.',
      embedUrl: 'https://embesslivestudio.lovable.app/embed/1'
    },
    {
      id: '2',
      title: 'Музыкальный микс 2024 - Лучшее для работы',
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
      author: 'Music Station',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=music',
      views: '850K',
      postedAt: '5 часов назад',
      duration: '1:20:00',
      category: 'Музыка',
      description: 'Расслабляющая музыка для продуктивности и концентрации.',
      embedUrl: 'https://embesslivestudio.lovable.app/embed/2'
    },
    {
      id: '3',
      title: 'Как создать свою студию стриминга',
      thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80',
      author: 'StreamLiveTV Guides',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guides',
      views: '45K',
      postedAt: '1 день назад',
      duration: '15:20',
      category: 'Обучение',
      description: 'Пошаговое руководство по настройке оборудования для профессионального стриминга.',
      embedUrl: 'https://embesslivestudio.lovable.app/embed/3'
    },
    {
      id: '4',
      title: 'Спортивный обзор: Финалы сезона',
      thumbnail: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80',
      author: 'Sports Center',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sports',
      views: '230K',
      postedAt: '3 дня назад',
      duration: '08:12',
      category: 'Спорт',
      description: 'Все голы и лучшие моменты финальных матчей.',
      embedUrl: 'https://embesslivestudio.lovable.app/embed/4'
    },
    {
      id: '5',
      title: 'Путешествие в горы: Невероятные виды',
      thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      author: 'Travel Vlog',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
      views: '15K',
      postedAt: '12 часов назад',
      duration: '22:10',
      category: 'Развлечения',
      description: 'Сегодня мы отправляемся в самое сердце Альп.',
      embedUrl: 'https://embesslivestudio.lovable.app/embed/5'
    },
    {
      id: '6',
      title: 'Уроки React: Hooks от А до Я',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      author: 'Code Master',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=code',
      views: '92K',
      postedAt: '1 неделю назад',
      duration: '45:30',
      category: 'Обучение',
      description: 'Глубокое погружение в React Hooks для продвинутых разработчиков.',
      embedUrl: 'https://embesslivestudio.lovable.app/embed/6'
    }
  ];

  // Фильтруем "мусорные" каналы
  return mockVideos.filter(video => !BLACKLISTED_CHANNELS.includes(video.author));
};
