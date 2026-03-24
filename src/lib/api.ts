export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  authorAvatar: string;
  views: number;
  postedAt: string;
  duration: string;
  category: string;
  description: string;
  embedUrl: string;
  channelId?: string;
  tags: string[];
}

const CHANNELS_API = 'https://aqeleulwobgamdffkfri.supabase.co/functions/v1/public-channels';
const EMBED_BASE = 'https://embesslivestudio.lovable.app';

const ALLOWED_CHANNEL_NAMES = ['oinktech', 'twixoff', 'твканалы', 'тв канал', 'tvkanaly'];
const BLOCKED_PATTERNS = [
  'spam',
  'мусор',
  'casino',
  'казино',
  'scam',
  'накрутка',
  '18+',
  'xxx',
  'shorts farm',
];

interface ApiItem {
  [key: string]: unknown;
}

const toString = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return fallback;
};

const toNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^\d.]/g, ''));
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};

const extractArray = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  return [];
};

const normalizeDuration = (raw: string): string => {
  if (!raw) return 'LIVE';
  return raw;
};

const normalizeRelativeDate = (raw: string): string => {
  if (!raw) return 'сейчас';
  return raw;
};

const toEmbedUrl = (item: ApiItem): string => {
  const direct = toString(item.embed_url ?? item.embedUrl);
  if (direct) {
    try {
      const parsed = new URL(direct);
      if (parsed.hostname.includes('embesslivestudio')) {
        return `${EMBED_BASE}${parsed.pathname}${parsed.search}`;
      }
    } catch {
      // ignore invalid URL and fallback to id-based URL
    }
  }

  const embedId = toString(item.embed_id ?? item.embedId ?? item.id);
  return `${EMBED_BASE}/embed/${encodeURIComponent(embedId)}`;
};

const shouldKeepChannel = (name: string): boolean => {
  const normalized = name.toLowerCase().trim();
  if (!normalized) return false;

  if (ALLOWED_CHANNEL_NAMES.some((allowed) => normalized.includes(allowed))) {
    return true;
  }

  return !BLOCKED_PATTERNS.some((pattern) => normalized.includes(pattern));
};

const parseItem = (item: ApiItem, index: number): Video | null => {
  const author = toString(item.channel_name ?? item.author ?? item.channel ?? item.user_name);
  if (!shouldKeepChannel(author)) {
    return null;
  }

  const id = toString(item.id ?? item.video_id ?? item.stream_id, `video-${index}`);
  const tags = extractArray<string>(item.tags).map((tag) => toString(tag)).filter(Boolean);

  return {
    id,
    title: toString(item.title ?? item.name, 'Без названия'),
    thumbnail: toString(item.thumbnail_url ?? item.thumbnail ?? item.preview ?? item.poster, `${EMBED_BASE}/placeholder.jpg`),
    author,
    authorAvatar: toString(item.avatar_url ?? item.authorAvatar ?? item.channel_avatar, `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(author || id)}`),
    views: toNumber(item.views ?? item.view_count ?? item.watchers),
    postedAt: normalizeRelativeDate(toString(item.posted_at ?? item.created_at ?? item.published_at)),
    duration: normalizeDuration(toString(item.duration ?? item.length ?? item.status)),
    category: toString(item.category ?? item.genre ?? item.type, 'Другое'),
    description: toString(item.description ?? item.summary, 'Описание недоступно.'),
    embedUrl: toEmbedUrl(item),
    channelId: toString(item.channel_id ?? item.author_id),
    tags,
  };
};

const unwrapItems = (payload: unknown): ApiItem[] => {
  if (Array.isArray(payload)) return payload as ApiItem[];
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>;
    const candidates = [obj.data, obj.channels, obj.videos, obj.items, obj.results];
    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate as ApiItem[];
      }
    }
  }
  return [];
};

export const fetchVideos = async (): Promise<Video[]> => {
  const response = await fetch(CHANNELS_API, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки каналов: HTTP ${response.status}`);
  }

  const payload = await response.json();
  const items = unwrapItems(payload);

  return items
    .map((item, idx) => parseItem(item, idx))
    .filter((item): item is Video => Boolean(item));
};

export const formatViews = (views: number): string => {
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return `${views}`;
};
