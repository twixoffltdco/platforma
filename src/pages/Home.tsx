import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { VideoCard } from '../components/VideoCard';
import { fetchVideos, Video } from '../lib/api';
import { rankForUser } from '../lib/personalization';
import { useSearchParams } from 'react-router-dom';

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [params] = useSearchParams();

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await fetchVideos();
        setVideos(rankForUser(data));
      } catch (err) {
        setVideos([]);
        setError(err instanceof Error ? err.message : 'Ошибка загрузки данных');
      } finally {
        setIsLoading(false);
      }
    };
    loadVideos();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(videos.map((v) => v.category).filter(Boolean));
    return ['Все', ...Array.from(set)];
  }, [videos]);

  const query = (params.get('q') ?? '').toLowerCase().trim();

  const filteredVideos = useMemo(() => {
    const categoryFiltered = activeCategory === 'Все' ? videos : videos.filter((v) => v.category === activeCategory);
    if (!query) return categoryFiltered;
    return categoryFiltered.filter((v) => {
      const searchable = `${v.title} ${v.author} ${v.description} ${v.tags.join(' ')}`.toLowerCase();
      return searchable.includes(query);
    });
  }, [activeCategory, query, videos]);

  return (
    <Layout>
      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar sticky top-14 bg-inherit z-30 pt-2 -mx-2 px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat ? 'bg-red-600 text-white' : 'bg-black/10 dark:bg-white/10 hover:opacity-80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3 animate-pulse">
              <div className="aspect-video bg-black/5 dark:bg-white/5 rounded-xl" />
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-black/5 dark:bg-white/5 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      {!isLoading && error && <div className="text-red-500 py-8">{error}</div>}

      {filteredVideos.length === 0 && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-xl">Видео не найдены. Проверьте фильтры или запрос.</p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
