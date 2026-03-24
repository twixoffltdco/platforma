import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { VideoCard } from '../components/VideoCard';
import { fetchVideos, Video } from '../lib/api';
import { motion } from 'framer-motion';

const CATEGORIES = ['Все', 'Технологии', 'Музыка', 'Обучение', 'Спорт', 'Игры', 'Новости', 'Развлечения', 'Прямой эфир'];

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      const data = await fetchVideos();
      setVideos(data);
      setIsLoading(false);
    };
    loadVideos();
  }, []);

  const filteredVideos = activeCategory === 'Все' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <Layout>
      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar sticky top-14 bg-[#0f0f0f] z-30 pt-2 -mx-2 px-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat 
                ? 'bg-white text-black' 
                : 'bg-white/10 text-white hover:bg-white/20'
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
              <div className="aspect-video bg-white/5 rounded-xl" />
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8"
        >
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </motion.div>
      )}

      {filteredVideos.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-xl">Видео в этой категории пока нет</p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
