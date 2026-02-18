<template>
    <div class="space-y-8">
        <!-- Control Bar -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <!-- Left: Filters -->
            <div class="flex flex-wrap items-center gap-4">
                <!-- Order By Dropdown -->
                <div class="relative group">
                    <button
                        class="flex items-center gap-2 px-4 py-2.5 bg-[#C29BEF] text-[#240243] rounded-xl font-bold hover:bg-[#A78BFA] transition-colors">
                        Order by: {{ currentOrderLabel }}
                        <ChevronDown class="w-4 h-4" />
                    </button>
                    <!-- Dropdown Menu (Hover for simplicity or Click) -->
                    <div
                        class="absolute top-full left-0 mt-2 w-48 bg-[#15171E] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                        <button v-for="order in orderOptions" :key="order.value"
                            @click="$emit('update:ordering', order.value)"
                            class="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#C29BEF] hover:text-[#240243] transition-colors"
                            :class="{ 'bg-[#C29BEF]/10 text-[#C29BEF]': ordering === order.value }">
                            {{ order.label }}
                        </button>
                    </div>
                </div>

                <!-- Platform Dropdown -->
                <div class="relative group">
                    <button
                        class="flex items-center gap-2 px-4 py-2.5 bg-[#C29BEF] text-[#240243] rounded-xl font-bold hover:bg-[#A78BFA] transition-colors">
                        {{ currentPlatformLabel }}
                        <ChevronDown class="w-4 h-4" />
                    </button>
                    <div
                        class="absolute top-full left-0 mt-2 w-48 bg-[#15171E] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                        <button @click="$emit('update:platform', null)"
                            class="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#C29BEF] hover:text-[#240243] transition-colors"
                            :class="{ 'bg-[#C29BEF]/10 text-[#C29BEF]': platform === null }">
                            All Platforms
                        </button>
                        <button v-for="p in platforms" :key="p.id" @click="$emit('update:platform', p.id)"
                            class="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#C29BEF] hover:text-[#240243] transition-colors"
                            :class="{ 'bg-[#C29BEF]/10 text-[#C29BEF]': platform === p.id }">
                            {{ p.name }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right: Display Options -->
            <div class="flex items-center gap-4">
                <span class="text-gray-400 text-sm hidden sm:block">Display Options :</span>
                <div class="flex gap-2 bg-[#C29BEF] p-1 rounded-xl">
                    <button @click="viewMode = 'dynamic'" class="p-2 rounded-lg transition-all"
                        :class="viewMode === 'dynamic' ? 'bg-[#240243] shadow-sm' : 'hover:bg-[#240243]/10'">
                        <img src="/icons/Rows.svg" alt="Rows" class="w-5 h-5 transition-all"
                            :class="viewMode === 'dynamic' ? 'brightness-0 invert' : 'brightness-0 opacity-50 hover:opacity-100'" />
                    </button>
                    <button @click="viewMode = 'grid'" class="p-2 rounded-lg transition-all"
                        :class="viewMode === 'grid' ? 'bg-[#240243] shadow-sm' : 'hover:bg-[#240243]/10'">
                        <img src="/icons/Rows.svg" alt="Grid" class="w-5 h-5 rotate-90 transition-all"
                            :class="viewMode === 'grid' ? 'brightness-0 invert' : 'brightness-0 opacity-50 hover:opacity-100'" />
                    </button>
                </div>
            </div>
        </div>

        <!-- content -->
        <div class="min-h-[400px]">
            <!-- Loading State -->
            <div v-if="loading && games.length === 0" class="grid gap-6 animate-pulse" :class="gridClasses">
                <div v-for="n in 8" :key="n" class="bg-[#15171E] rounded-3xl h-[300px]"></div>
            </div>

            <!-- Games Grid -->
            <div v-else-if="games.length > 0" class="grid gap-6 transition-all duration-300" :class="gridClasses">
                <template v-for="(game, index) in games" :key="game.id">

                    <NuxtLink :to="`/game/${game.id}`" class="group relative block" :class="[
                        viewMode === 'dynamic'
                            ? (index % 5 < 2 ? 'col-span-1 md:col-span-3 h-[220px]' : 'col-span-1 md:col-span-2 h-[220px]')
                            : 'h-full'
                    ]">
                        <!-- Dynamic Style Card (Overlay) -->
                        <div v-if="viewMode === 'dynamic'"
                            class="relative h-full bg-[#15171E] rounded-3xl overflow-hidden border border-white/5 group-hover:border-[#42018d] transition-all duration-500 group-hover:shadow-[0_0_40px_0px_rgba(194,155,239,0.5)]">
                            <img :src="game.background_image || '/images/placeholder-game.jpg'" :alt="game.name"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                            <!-- Gradient Overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/60 to-transparent opacity-90">
                            </div>

                            <!-- Content Overlay -->
                            <div class="absolute bottom-0 left-0 right-0 p-5 z-10 flex items-end justify-between gap-4">
                                <div class="flex flex-col gap-3 min-w-0 flex-1">
                                    <h3
                                        class="text-xl md:text-3xl font-bold text-white leading-none tracking-tight line-clamp-1">
                                        {{ game.name }}
                                    </h3>

                                    <div class="flex flex-wrap gap-2">
                                        <span v-for="tag in game.genres?.slice(0, 3)" :key="tag.id"
                                            class="px-3 py-1 rounded-md border border-white/10 text-[10px] sm:text-xs font-semibold text-gray-200 bg-white/5 backdrop-blur-md uppercase tracking-wide">
                                            {{ tag.name }}
                                        </span>
                                    </div>
                                </div>

                                <div class="flex flex-col items-center gap-2 pb-1 shrink-0">
                                    <template v-for="platform in game.parent_platforms?.slice(0, 3)"
                                        :key="platform.platform.id">
                                        <img v-if="getPlatformIcon(platform.platform.slug)"
                                            :src="getPlatformIcon(platform.platform.slug)"
                                            class="w-5 h-5 md:w-5 md:h-5 opacity-90 brightness-0 invert" />
                                    </template>
                                </div>
                            </div>
                        </div>

                        <!-- Standard Grid Style Card -->
                        <!-- Standard Grid Style Card (Overlay) -->
                        <div v-else
                            class="group relative w-full aspect-[3/5] md:aspect-[2/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-[#C29BEF]/40 transition-all duration-500 bg-[#15171E]">

                            <!-- Background Image -->
                            <img :src="game.background_image || '/images/placeholder-game.jpg'" :alt="game.name"
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                            <!-- Gradient Overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/60 to-transparent opacity-90">
                            </div>

                            <!-- Content Overlay -->
                            <div class="absolute inset-0 p-5 flex flex-col justify-end">

                                <!-- Title -->
                                <h3
                                    class="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 leading-tight drop-shadow-md group-hover:text-[#C29BEF] transition-colors">
                                    {{ game.name }}
                                </h3>

                                <!-- Genres -->
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span v-for="genre in game.genres?.slice(0, 3)" :key="genre.id"
                                        class="px-2.5 py-1 rounded-lg border border-white/20 bg-black/40 backdrop-blur-md text-[10px] md:text-xs font-medium text-white/90 hover:bg-white/10 transition-colors">
                                        {{ genre.name }}
                                    </span>
                                </div>

                                <!-- Platforms -->
                                <div class="flex items-center gap-3">
                                    <template v-for="platform in game.parent_platforms?.slice(0, 4)"
                                        :key="platform.platform.id">
                                        <img v-if="getPlatformIcon(platform.platform.slug)"
                                            :src="getPlatformIcon(platform.platform.slug)" :alt="platform.platform.name"
                                            class="w-4 h-4 md:w-5 md:h-5 opacity-70 hover:opacity-100 transition-opacity brightness-0 invert" />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </template>
            </div>

            <!-- No Results -->
            <div v-else class="text-center py-20 bg-[#15171E] rounded-3xl border border-white/5">
                <Search class="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 class="text-xl font-bold text-white mb-2">No games found</h3>
                <p class="text-gray-400">Try adjusting your filters.</p>
            </div>
        </div>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && totalGames > 0 && !hidePagination" class="flex justify-center pt-8">
        <div class="flex items-center gap-2">
            <!-- Previous Button -->
            <button @click="$emit('changePage', currentPage - 1)" :disabled="currentPage === 1"
                class="p-3 rounded-xl bg-[#15171E] border border-white/10 text-white hover:bg-[#C29BEF] hover:text-[#240243] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft class="w-5 h-5" />
            </button>

            <!-- Page Numbers -->
            <div class="flex items-center gap-2 px-2">
                <button v-for="page in displayedPages" :key="page"
                    @click="page !== '...' && $emit('changePage', Number(page))"
                    class="w-10 h-10 rounded-xl flex items-center justify-center font-normal transition-all" :class="[
                        page === currentPage
                            ? 'bg-[#C29BEF] text-[#240243]'
                            : 'bg-[#15171E] text-gray-400 hover:bg-white/10',
                        page === '...' ? 'cursor-default hover:bg-transparent' : ''
                    ]">
                    {{ page }}
                </button>
            </div>

            <!-- Next Button -->
            <button @click="$emit('changePage', currentPage + 1)" :disabled="currentPage >= totalPages"
                class="p-3 rounded-xl bg-[#15171E] border border-white/10 text-white hover:bg-[#C29BEF] hover:text-[#240243] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronRight class="w-5 h-5" />
            </button>
        </div>
    </div>

    <div v-if="loading && games.length > 0" class="flex justify-center pt-8">
        <div class="w-8 h-8 border-2 border-[#C29BEF] border-t-transparent rounded-full animate-spin"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, LayoutDashboard, Search } from 'lucide-vue-next';
import type { Game } from '~/types/rawg';


const props = defineProps<{
    games: Game[];
    loading: boolean;
    totalGames: number;
    currentPage: number;
    ordering: string;
    platform: number | null;
    platforms: { id: number; name: string; slug: string }[];
    hidePagination?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:ordering', value: string): void;
    (e: 'update:platform', value: number | null): void;
    (e: 'changePage', page: number): void;
}>();

const viewMode = ref<'dynamic' | 'grid'>('dynamic');

const gridClasses = computed(() => {
    if (viewMode.value === 'dynamic') {
        return 'grid-cols-1 md:grid-cols-6';
    }
    // Default Grid
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
});

const itemsPerPage = 20;
const totalPages = computed(() => Math.ceil(props.totalGames / itemsPerPage));

const displayedPages = computed(() => {
    const total = totalPages.value;
    const current = props.currentPage;
    const delta = 2;
    const range: (number | string)[] = [];

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i);
        } else if (
            range[range.length - 1] !== '...' &&
            (i < current - delta || i > current + delta)
        ) {
            range.push('...');
        }
    }

    return range;
});

const orderOptions = [
    { label: 'Relevance', value: '-relevance' }, 
    { label: 'Popularity', value: '-added' },
    { label: 'Release Date', value: '-released' },
    { label: 'Rating', value: '-rating' },
];

const currentOrderLabel = computed(() => {
    return orderOptions.find(o => o.value === props.ordering)?.label || 'Relevance';
});

const currentPlatformLabel = computed(() => {
    if (!props.platform) return 'Platform';
    return props.platforms.find(p => p.id === props.platform)?.name || 'Platform';
});

const getPlatformIcon = (slug: string) => {
    const icons: Record<string, string> = {
        pc: '/icons/windows-10.svg',
        playstation: '/icons/play-station.svg',
        xbox: '/icons/xbox.svg',
        ios: '/icons/smartphone.svg',
        android: '/icons/smartphone.svg',
        mac: '/icons/apple.svg',
        linux: '/icons/linux.svg',
        nintendo: '/icons/nintendo.svg'
    };
    return icons[slug] || undefined;
}
</script>
