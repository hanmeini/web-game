export interface RawgResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  metacritic: number;
  playtime: number;
  updated: string;
  parent_platforms?: { platform: Platform }[];
  genres?: Genre[];
  description_raw?: string;
  developers?: Developer[];
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface GameDetails extends Game {
  description: string;
  description_raw: string;
  website: string;
  reddit_url: string;
  developers: Developer[];
  publishers: Publisher[];
  esrb_rating?: { id: number; name: string; slug: string };
  platforms: {
    platform: Platform;
    released_at: string;
    requirements: { minimum?: string; recommended?: string };
  }[];
  tags?: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
  }[];
  stores?: {
    id: number;
    url: string;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
      image_background: string;
    };
  }[];
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}

export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
}
