import { Video } from './api';

const STORAGE_KEY = 'platforma.user-profile.v1';

export interface UserProfile {
  interests: Record<string, number>;
  watchedIds: string[];
  likedAuthors: string[];
}

const defaultProfile: UserProfile = {
  interests: {},
  watchedIds: [],
  likedAuthors: [],
};

export const getUserProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw) as UserProfile;
    return {
      interests: parsed.interests ?? {},
      watchedIds: parsed.watchedIds ?? [],
      likedAuthors: parsed.likedAuthors ?? [],
    };
  } catch {
    return defaultProfile;
  }
};

const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

export const trackWatch = (video: Video): void => {
  const profile = getUserProfile();
  const interests = { ...profile.interests };

  interests[video.category] = (interests[video.category] ?? 0) + 3;
  video.tags.forEach((tag) => {
    interests[tag] = (interests[tag] ?? 0) + 1;
  });

  const watchedIds = [video.id, ...profile.watchedIds.filter((id) => id !== video.id)].slice(0, 250);

  saveProfile({
    ...profile,
    interests,
    watchedIds,
  });
};

export const rankForUser = (videos: Video[]): Video[] => {
  const profile = getUserProfile();

  const scoreVideo = (video: Video): number => {
    let score = 0;
    score += Math.log10(video.views + 1) * 1.5;
    score += (profile.interests[video.category] ?? 0) * 2;

    for (const tag of video.tags) {
      score += profile.interests[tag] ?? 0;
    }

    if (profile.likedAuthors.includes(video.author)) score += 8;
    if (profile.watchedIds.includes(video.id)) score -= 4;

    return score;
  };

  return [...videos].sort((a, b) => scoreVideo(b) - scoreVideo(a));
};
