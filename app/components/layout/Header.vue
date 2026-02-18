<template>
    <header
        class="h-20 bg-[#0A0A0A] backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-8 flex items-center justify-between">
        <!-- Left Side: Search or Back Button -->
        <div class="w-full max-w-lg relative flex items-center gap-4">
            <!-- Back Button (Game Detail Only) -->
            <button v-if="isGameDetailPage" @click="$router.back()"
                class="p-2.5 bg-[#240243] hover:bg-[#3b0b61] rounded-lg text-white transition-colors flex items-center justify-center shrink-0">
                <ArrowLeft class="h-5 w-5" />
            </button>

            <!-- Search Bar (Hidden on Discover Page) -->
            <div v-if="!isDiscoverPage" class="w-full relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search class="h-4 w-4 text-icon-neutral-secondary" />
                </div>
                <input type="text"
                    class="block w-full pl-10 pr-3 py-2.5 bg-[#404040] border border-border-form-default rounded-lg leading-5 text-white placeholder-neutral-secondary focus:outline-none focus:bg-[#252830] focus:border-[#C29BEF] focus:ring-1 focus:ring-[#C29BEF] sm:text-sm transition-colors"
                    placeholder="Search by title, genre, or developer" />
            </div>
        </div>

        <!-- Right Side -->
        <div class="flex items-center gap-6">
            <!-- Notification -->
            <button class="relative p-2 text-gray-400 hover:text-white transition-colors bg-[#240243] rounded-lg">
                <img src="/icons/Bell.svg" alt="Notification" class="h-5 w-5 text-white" />
                <span
                    class="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-[#0F1115] hidden"></span>
                <!-- Optional dot -->
            </button>

            <!-- Divider -->
            <div class="h-8 w-px bg-white"></div>

            <!-- Profile -->
            <button class="flex items-center gap-3 group">
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                        alt="Riko Azumi"
                        class="h-9 w-9 rounded-lg object-cover border border-gray-600 group-hover:border-[#C29BEF] transition-colors" />
                    <!-- Online Status -->
                    <!-- <span class="absolute -bottom-1 -right-1 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#0F1115]"></span> -->
                </div>
                <div class="hidden md:flex items-center gap-2">
                    <span class="text-base font-normal text-white group-hover:text-[#C29BEF] transition-colors">Riko
                        Azumi</span>
                    <ChevronDown class="h-4 w-4 text-white group-hover:text-white transition-colors" />
                </div>
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search, Bell, ChevronDown, ArrowLeft } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const isDiscoverPage = computed(() => route.path === '/discover');
const isGameDetailPage = computed(() => route.path.startsWith('/game/'));
</script>
