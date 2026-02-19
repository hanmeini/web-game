<template>
    <div class="relative w-full h-screen">
        <!-- Backdrop Image -->
        <div class="absolute inset-0">
            <img :src="game.background_image" :alt="game.name" class="w-full h-full object-cover opacity-60" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-[#1F1F1F]/50 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-[#1F1F1F]/30 to-transparent"></div>
        </div>

        <!-- Content Container -->
        <div class="relative h-full container mx-auto px-6 py-10 flex flex-col justify-end pb-20">
            <!-- Play Button (Centered in available space) -->
            <div class="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                <button
                    class="pointer-events-auto bg-white/20 backdrop-blur-md p-6 rounded-full hover:bg-white/30 transition-all hover:scale-110 group">
                    <Play class="w-12 h-12 text-white fill-white group-hover:text-purple-400 transition-colors" />
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end z-10">
                <!-- Left Column: Poster + Main Info -->
                <div class="col-span-1 md:col-span-7 lg:col-span-7 flex flex-col gap-6 justify-end">
                    <!-- Poster (Visible on all screens) -->
                    <div
                        class="rounded-xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-[200px] aspect-[2/3]">
                        <img :src="game.background_image" :alt="game.name" class="w-full h-full object-cover" />
                    </div>

                    <div class="flex flex-col gap-4">
                        <!-- Breadcrumbs -->
                        <nav class="text-sm text-gray-400 flex items-center gap-2 mb-2">
                            <NuxtLink to="/" class="hover:text-white transition-colors">Homepage</NuxtLink>
                            <span>/</span>
                            <span class="hover:text-white cursor-pointer transition-colors">Trending Games</span>
                            <span>/</span>
                            <span class="text-white font-medium truncate">{{ game.name }}</span>
                        </nav>

                        <!-- Title -->
                        <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight text-shadow-lg mb-2">
                            {{ game.name }}
                        </h1>

                        <!-- Tags / Genres -->
                        <div class="flex flex-wrap gap-3">
                            <span v-for="genre in displayedGenres" :key="genre.id"
                                class="px-4 py-1.5 rounded-lg border border-white bg-[#C2C2C233]/40 backdrop-blur-sm text-sm text-white hover:bg-white/10 transition-colors cursor-default">
                                {{ genre.name }}
                            </span>
                            <span v-if="remainingGenresCount > 0"
                                class="px-3 py-1.5 rounded-lg border border-white/20 bg-black/20 backdrop-blur-sm text-sm text-gray-200">
                                +{{ remainingGenresCount }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Meta & Actions -->
                <div class="col-span-1 md:col-span-5 lg:col-span-5 flex flex-col items-start lg:items-end gap-6 w-full">

                    <!-- Platforms & Date -->
                    <div class="flex flex-row-reverse md:flex-row items-center gap-4 px-4 py-2 rounded-xl">
                        <!-- Platform Icons -->
                        <div
                            class="flex items-center gap-2 border-l md:border-l-0 md:border-r border-white/20 pl-4 md:pl-0 md:pr-4">
                            <img src="/icons/windows-10.svg" alt="Windows" class="w-10 h-10 opacity-100" />
                            <img src="/icons/play-station.svg" alt="PlayStation" class="w-10 h-10 opacity-100" />
                        </div>

                        <!-- Release Date -->
                        <span class="text-sm font-medium bg-white text-black px-4 py-2 rounded-lg whitespace-nowrap">
                            {{ formatDate(game.released) }}
                        </span>
                    </div>

                    <!-- Recommended Box -->
                    <div
                        class="bg-[#15171E]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-full max-w-xs flex items-center gap-4 shadow-lg">
                        <div class="p-3 bg-[#290B47] rounded-xl text-white shadow-inner">
                            <ThumbsUp class="w-6 h-6" />
                        </div>
                        <div>
                            <h3 class="font-bold text-white text-lg">Recommended</h3>
                            <p class="text-white text-xs mb-1">{{ game.ratings_count > 1000 ? (game.ratings_count
                                / 1000).toFixed(0) + 'K+' : game.ratings_count }} Reviews</p>
                            <button
                                class="text-[#C29BEF] w-full text-center text-xs hover:text-[#A78BFA] transition-colors font-medium">
                                View All Review
                            </button>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3 w-full max-w-xs">
                        <button
                            class="flex-1 flex items-center justify-center gap-2 bg-[#C29BEF] hover:bg-[#A78BFA] text-[#1F1F1F] py-3 px-4 rounded-xl transition-all hover:shadow-lg active:scale-95">
                            <Plus class="w-5 h-5" />
                            <span>Add to Wishlist</span>
                        </button>
                        <button
                            class="flex items-center justify-center gap-2 bg-[#C29BEF] hover:bg-[#A78BFA] text-[#1F1F1F] py-3 px-6 rounded-xl transition-all hover:shadow-lg active:scale-95">
                            <Share2 class="w-5 h-5" />
                            <span>Share</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Play, ThumbsUp, Plus, Share2 } from 'lucide-vue-next';
import type { GameDetails } from '~/types/rawg';

const props = defineProps<{
    game: GameDetails;
}>();

// Helper to format date
const formatDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Logic for displaying limited genres + count
const displayedGenres = computed(() => {
    if (!props.game?.genres) return [];
    return props.game.genres.slice(0, 4);
});

const remainingGenresCount = computed(() => {
    if (!props.game?.genres) return 0;
    return Math.max(0, props.game.genres.length - 4);
});
</script>

<style scoped>
.text-shadow-lg {
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}
</style>
