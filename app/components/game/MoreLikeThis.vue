<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-white">More Like This</h3>
            <button @click="navigateTo('/games')"
                class="bg-[#2D1B69] hover:bg-[#3D2B79] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View All
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C29BEF]"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="games.length === 0" class="text-gray-400 text-center py-12">
            No related games found.
        </div>

        <!-- Games Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink v-for="game in games" :key="game.id" :to="`/game/${game.id}`"
                class="relative group rounded-2xl overflow-hidden aspect-[16/9] cursor-pointer bg-[#15171E] border border-white/5 hover:border-[#C29BEF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#C29BEF]/10 hover:-translate-y-1">

                <!-- Background Image -->
                <img :src="game.background_image" :alt="game.name"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />

                <!-- Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <!-- Content -->
                <div class="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end">
                    <div class="flex-1 mr-4">
                        <h4
                            class="font-bold text-white text-lg leading-tight line-clamp-1 group-hover:text-[#C29BEF] transition-colors">
                            {{ game.name }}</h4>
                    </div>

                    <!-- Platform Icons -->
                    <div class="flex flex-col gap-2 items-center">
                        <template v-for="p in game.parent_platforms?.slice(0, 3)" :key="p.platform.id">
                            <img v-if="getPlatformIcon(p.platform.slug)" :src="getPlatformIcon(p.platform.slug)"
                                :alt="p.platform.name"
                                class="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                            <!-- Fallback for unknown platforms if needed, or just skip to keep cleaner -->
                        </template>
                    </div>
                </div>
            </NuxtLink>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8">
            <button @click="changePage(page - 1)" :disabled="page <= 1"
                class="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors">
                <ChevronLeft class="w-5 h-5" />
            </button>

            <button v-for="p in displayedPages" :key="p" @click="changePage(p)" :class="['w-8 h-8 rounded-lg text-sm font-medium transition-colors flex items-center justify-center',
                page === p ? 'bg-[#3D2B79] text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white']">
                {{ p }}
            </button>

            <button @click="changePage(page + 1)" :disabled="page >= totalPages"
                class="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors">
                <ChevronRight class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import type { Game } from '~/types/rawg';

const props = defineProps<{
    gameId: number;
    genres?: string[]; // Array of genre slugs
    tags?: string[]; // Array of tag slugs
}>();

const { getGameSuggested, getGamesByGenre, getGamesByTag } = useRawg();
const page = ref(1);
const pageSize = 3;

// State to track which method we are using
type FetchMode = 'suggested' | 'genre' | 'tag';
const fetchMode = ref<FetchMode>('suggested');
const activeGenreOrTag = ref<string | null>(null);

// Initial fetch logic
const fetchGames = async (p: number) => {
    // 1. Try Suggested
    if (fetchMode.value === 'suggested') {
        const { data } = await getGameSuggested(props.gameId, p, pageSize);
        // If we have results, great.
        if (data.value && data.value.results.length > 0) {
            return data.value;
        }
        // Fallback: If page 1 and empty, switch mode
        if (p === 1) {
            if (props.genres && props.genres.length > 0) {
                const genre = props.genres[0];
                if (genre) {
                    fetchMode.value = 'genre';
                    activeGenreOrTag.value = genre;
                    return (await getGamesByGenre(genre, p, pageSize)).data.value;
                }
            }

            if (props.tags && props.tags.length > 0) {
                const tag = props.tags[0];
                if (tag) {
                    fetchMode.value = 'tag';
                    activeGenreOrTag.value = tag;
                    return (await getGamesByTag(tag, p, pageSize)).data.value;
                }
            }
        }
        return data.value; // Return empty suggested result if no fallback
    }

    // 2. Genre Mode
    if (fetchMode.value === 'genre' && activeGenreOrTag.value) {
        return (await getGamesByGenre(activeGenreOrTag.value, p, pageSize)).data.value;
    }

    // 3. Tag Mode
    if (fetchMode.value === 'tag' && activeGenreOrTag.value) {
        return (await getGamesByTag(activeGenreOrTag.value, p, pageSize)).data.value;
    }

    return null;
};

// Execute initial fetch
const { data: suggestedData, pending } = await useAsyncData(`more-like-this-${props.gameId}`, () => fetchGames(page.value));

const games = computed(() => suggestedData.value?.results || []);
const count = computed(() => suggestedData.value?.count || 0);
const totalPages = computed(() => Math.min(Math.ceil(count.value / pageSize), 5)); // Limit to max 5 pages for UI

const displayedPages = computed(() => {
    const total = totalPages.value;
    const current = page.value;
    const maxVisible = 5;

    if (total <= maxVisible) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Logic to center current page if possible, otherwise show start or end
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);

    if (end === total) {
        start = Math.max(1, end - 4);
    }

    return Array.from({ length: (end - start + 1) }, (_, i) => start + i);
});

const changePage = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages.value) return;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Optional: smooth scroll to keep focus or maybe not needed
    page.value = newPage;
    // Re-fetch data
    suggestedData.value = await fetchGames(newPage);
};

// Platform Icon Helper
const getPlatformIcon = (slug: string): string | undefined => {
    if (['pc', 'windows'].includes(slug)) return '/icons/windows-10.svg';
    if (slug.includes('playstation')) return '/icons/play-station.svg';
    if (slug.includes('xbox')) return '/icons/xbox.svg';
    // Mac, Linux, Android, iOS, Nintendo - we don't have SVGs for these in /icons yet based on file list
    // Return undefined to skip icon
    return undefined;
}
</script>
