import React from 'react';
import { Link } from 'react-router-dom';
import { Video, formatViews } from '../lib/api';
import { MoreVertical, CheckCircle } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="flex flex-col gap-3 group">
      <Link to={`/watch/${video.id}`} className="relative aspect-video rounded-xl overflow-hidden bg-[#222222]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[12px] px-1.5 py-0.5 rounded font-medium">
          {video.duration}
        </div>
      </Link>

      <div className="flex gap-3 px-1">
        <Link to={`/channel/${video.author}`} className="flex-shrink-0">
          <img src={video.authorAvatar} alt={video.author} className="w-9 h-9 rounded-full object-cover" loading="lazy" />
        </Link>
        <div className="flex flex-col flex-1 min-w-0">
          <Link to={`/watch/${video.id}`}>
            <h3 className="font-semibold text-[15px] leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
              {video.title}
            </h3>
          </Link>
          <div className="mt-1 flex flex-col">
            <Link to={`/channel/${video.author}`} className="text-gray-400 text-sm hover:text-current flex items-center gap-1">
              {video.author}
              <CheckCircle size={14} className="text-gray-500" fill="currentColor" />
            </Link>
            <div className="text-gray-400 text-sm">
              <span>{formatViews(video.views)} просмотров</span>
              <span className="mx-1">•</span>
              <span>{video.postedAt}</span>
            </div>
          </div>
        </div>
        <button className="h-fit p-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};
