<template>
    <div class="relative w-full h-[500px] md:rounded-b-3xl overflow-hidden mb-12 group">
        <!-- Background Image -->
        <img src="/images/borderland.jpg" alt="Discover Hero" class="absolute inset-0 w-full h-full object-cover" />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#15171E] via-transparent to-transparent"></div>

        <!-- Content -->
        <div
            class="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto space-y-8">
            <div class="space-y-4">
                <h1 class="text-4xl md:text-6xl font-semibold text-white tracking-tight">
                    Discover Your Next Favorite Game
                </h1>
                <p class="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                    Browse thousands of games across genres, developers, and platforms find your next adventure today.
                </p>
            </div>

            <!-- Search & Filter Bar -->
            <div class="w-full max-w-2xl flex flex-row gap-3">
                <!-- Search Input -->
                <div class="relative flex-1 group/search">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search
                            class="h-5 w-5 text-gray-500 group-focus-within/search:text-[#C29BEF] transition-colors" />
                    </div>
                    <input :value="searchQuery"
                        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
                        @keyup.enter="$emit('search')" type="text" placeholder="Search by title, genre, or developer"
                        class="block w-full pl-11 pr-4 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#C29BEF]/50 focus:ring-1 focus:ring-[#C29BEF]/50 transition-all font-medium" />
                </div>

                <!-- Filter Button -->
                <button @click="$emit('toggleFilters')"
                    class="p-3 md:px-8 md:py-4 bg-[#C29BEF] hover:bg-[#A78BFA] text-[#293047] rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#C29BEF]/20 whitespace-nowrap aspect-square md:aspect-auto">
                    <Filter class="w-6 h-6 md:w-5 md:h-5" />
                    <span class="hidden md:inline">Filter by</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search, Filter } from 'lucide-vue-next';

defineProps<{
    searchQuery: string;
}>();

defineEmits<{
    (e: 'update:searchQuery', value: string): void;
    (e: 'search'): void;
    (e: 'toggleFilters'): void;
}>();
</script>
