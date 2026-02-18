import type { Game, RawgResponse, GameDetails } from '~/types/rawg';

export const useRawg = () => {
  const config = useRuntimeConfig();
  const apiKey = config.public.rawgApiKey as string;
  const baseUrl = 'https://api.rawg.io/api';

  const getGames = async (page = 1, pageSize = 20) => {
    return useFetch<RawgResponse<Game>>(`${baseUrl}/games`, {
      params: {
        key: apiKey,
        page,
        page_size: pageSize,
      },
    });
  };

  const getDiscoverGames = async (params: {
    page?: number;
    pageSize?: number;
    search?: string;
    genres?: string;
    parent_platforms?: string;
    platforms?: string;
    stores?: string;
    developers?: string;
    tags?: string;
    dates?: string;
    ordering?: string;
  }) => {
    return $fetch<RawgResponse<Game>>(`${baseUrl}/games`, {
      params: {
        key: apiKey,
        page: params.page || 1,
        page_size: params.pageSize || 20,
        search: params.search,
        genres: params.genres,
        parent_platforms: params.parent_platforms,
        platforms: params.platforms,
        stores: params.stores,
        developers: params.developers,
        tags: params.tags,
        dates: params.dates,
        ordering: params.ordering,
      },
    });
  };

  const getGameDetails = async (id: number) => {
    return useFetch<GameDetails>(`${baseUrl}/games/${id}`, {
      params: {
        key: apiKey,
      },
    });
  };

  const searchGames = async (query: string, page = 1) => {
    return useFetch<RawgResponse<Game>>(`${baseUrl}/games`, {
      params: {
        key: apiKey,
        search: query,
        page,
      },
    });
  };



  const getFeaturedGames = async (pageSize = 5) => {
    return useFetch<RawgResponse<Game>>(`${baseUrl}/games`, {
      params: {
        key: apiKey,
        dates: '2023-01-01,2024-12-31',
        ordering: '-metacritic',
        page_size: pageSize,
      },
    });
  };

  const getGameScreenshots = async (id: number) => {
    return useFetch<RawgResponse<any>>(`${baseUrl}/games/${id}/screenshots`, {
      params: {
        key: apiKey,
      },
    });
  };

  const getGameTrailers = async (id: number) => {
    return useFetch<RawgResponse<any>>(`${baseUrl}/games/${id}/movies`, {
      params: {
        key: apiKey,
      },
    });
  };

  const getGameSuggested = async (id: number, page = 1, pageSize = 3) => {
    return useFetch<RawgResponse<Game>>(`${baseUrl}/games/${id}/suggested`, {
      params: {
        key: apiKey,
        page,
        page_size: pageSize,
      },
    });
  };

  const getGamesByGenre = async (genre: string, page = 1, pageSize = 3) => {
    return useFetch<RawgResponse<Game>>(`${baseUrl}/games`, {
      params: {
        key: apiKey,
        genres: genre,
        page,
        page_size: pageSize,
        ordering: '-added', // Order by popularity
      },
    });
  };

  const getGamesByTag = async (tag: string, page = 1, pageSize = 3) => {
    return useFetch<RawgResponse<Game>>(`${baseUrl}/games`, {
      params: {
        key: apiKey,
        tags: tag,
        page,
        page_size: pageSize,
        ordering: '-added', // Order by popularity
      },
    });
  };

  const getUpcomingGames = async (pageSize = 5) => {
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    const dates = `${today.toISOString().split('T')[0]},${nextYear.toISOString().split('T')[0]}`;

    return $fetch<RawgResponse<Game>>(`${baseUrl}/games`, {
      params: {
        key: apiKey,
        dates,
        ordering: '-added',
        page_size: pageSize,
      },
    });
  };

  return {
    getGames,
    getDiscoverGames,
    getGameDetails,
    searchGames,
    getFeaturedGames,
    getGameScreenshots,
    getGameTrailers,
    getGameSuggested,
    getGamesByGenre,
    getGamesByTag,
    getUpcomingGames,
    getGenres: async () => {
      return $fetch<RawgResponse<{ id: number; name: string; slug: string; image_background: string }>>(`${baseUrl}/genres`, {
        params: {
          key: apiKey,
          ordering: '-games_count', // Get most popular genres
          page_size: 10, // Limit to top 10 for the carousel
        },
      });
    },

    getPlatforms: async () => {
        return useFetch<RawgResponse<{ id: number; name: string; slug: string }>>(`${baseUrl}/platforms/lists/parents`, {
            params: {
                key: apiKey,
            },
        });
    }
  };
};
