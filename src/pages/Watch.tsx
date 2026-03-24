import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { fetchVideos, Video } from '../lib/api';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, CheckCircle } from 'lucide-react';

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [recommendations, setRecommendations] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const allVideos = await fetchVideos();
      const currentVideo = allVideos.find(v => v.id === id) || null;
      setVideo(currentVideo);
      setRecommendations(allVideos.filter(v => v.id !== id));
      setIsLoading(false);
      window.scrollTo(0, 0);
    };
    loadData();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col lg:flex-row gap-6 animate-pulse">
          <div className="flex-1">
            <div className="aspect-video bg-white/5 rounded-xl mb-4" />
            <div className="h-8 bg-white/5 rounded w-3/4 mb-4" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5" />
              <div className="h-4 bg-white/5 rounded w-1/4" />
            </div>
          </div>
          <div className="lg:w-[400px] space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-2">
                <div className="w-40 aspect-video bg-white/5 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!video) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Видео не найдено</h2>
          <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Вернуться на главную</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Player Content */}
        <div className="flex-1 min-w-0">
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            <iframe
              src={video.embedUrl}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            ></iframe>
          </div>
          
          <h1 className="text-xl font-bold mt-4 line-clamp-2">{video.title}</h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mt-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <img src={video.authorAvatar} alt={video.author} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-semibold hover:text-gray-300 cursor-pointer">
                  {video.author}
                  <CheckCircle size={14} className="text-gray-400" fill="currentColor" />
                </div>
                <span className="text-xs text-gray-400">124K подписчиков</span>
              </div>
              <button className="bg-white text-black px-4 py-2 rounded-full font-medium ml-4 hover:bg-gray-200 transition-colors">
                Подписаться
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/10 rounded-full">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-l-full border-r border-white/10 transition-colors">
                  <ThumbsUp size={20} />
                  <span className="text-sm">42K</span>
                </button>
                <button className="px-4 py-2 hover:bg-white/10 rounded-r-full transition-colors">
                  <ThumbsDown size={20} />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <Share2 size={20} />
                <span className="text-sm font-medium">Поделиться</span>
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-3 mt-4 text-sm">
            <div className="font-bold flex gap-3 mb-1">
              <span>{video.views} просмотров</span>
              <span>{video.postedAt}</span>
            </div>
            <p className="whitespace-pre-wrap">{video.description}</p>
          </div>
        </div>

        {/* Sidebar Recommendations */}
        <div className="lg:w-[400px] flex flex-col gap-3">
          {recommendations.map((rec) => (
            <Link key={rec.id} to={`/watch/${rec.id}`} className="flex gap-2 group">
              <div className="relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-[#222222]">
                <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
                  {rec.duration}
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {rec.title}
                </h3>
                <div className="text-xs text-gray-400 mt-1 flex flex-col">
                  <div className="flex items-center gap-1">
                    {rec.author}
                    <CheckCircle size={10} fill="currentColor" />
                  </div>
                  <span>{rec.views} • {rec.postedAt}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Watch;
