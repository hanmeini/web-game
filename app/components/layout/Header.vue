<template>
    <header
        class="bg-[#0A0A0A] backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-4 md:px-8 flex flex-col justify-center transition-all duration-300"
        :class="isDiscoverPage ? 'h-20' : 'h-auto py-4 md:py-0 md:h-20'">

        <!-- Top Row: Logo, Actions & Desktop Search -->
        <div class="w-full flex items-center justify-between gap-4 relative">
            <!-- Left Side: Hamburger & Logo -->
            <div class="flex items-center gap-3 md:gap-4 shrink-0 z-20">
                <!-- Hamburger Menu -->
                <button @click="isMobileMenuOpen = true"
                    class="p-2 -ml-2 text-gray-400 hover:text-white transition-colors md:hidden">
                    <Menu class="h-6 w-6" />
                </button>

                <!-- Back Button (Game Detail Only) -->
                <button v-if="isGameDetailPage" @click="$router.back()"
                    class="p-2.5 bg-[#240243] hover:bg-[#3b0b61] rounded-lg text-white transition-colors flex items-center justify-center shrink-0 ml-2">
                    <ArrowLeft class="h-5 w-5" />
                </button>
            </div>

            <!-- Logo (Mobile Center - Visible only on mobile) -->
            <router-link to="/"
                class="md:hidden absolute left-1/2 -translate-x-1/2 text-xl font-gaming font-bold text-white tracking-wider hover:text-white/90 z-10">
                VORTEX
            </router-link>

            <!-- Middle: Search Bar (Desktop) -->
            <div v-if="!isDiscoverPage" class="hidden md:block w-full max-w-lg relative mx-4">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search class="h-4 w-4 text-icon-neutral-secondary" />
                </div>
                <input type="text"
                    class="block w-full pl-10 pr-3 py-2.5 bg-[#404040] border border-border-form-default rounded-lg leading-5 text-white placeholder-neutral-secondary focus:outline-none focus:bg-[#252830] focus:border-[#C29BEF] focus:ring-1 focus:ring-[#C29BEF] sm:text-sm transition-colors"
                    placeholder="Search by title, genre, or developer" />
            </div>

            <!-- Right Side: Profile & Notifications -->
            <div class="flex items-center gap-3 md:gap-6 shrink-0">
                <!-- Notification -->
                <button class="relative p-2 text-gray-400 hover:text-white transition-colors bg-[#240243] rounded-lg">
                    <img src="/icons/Bell.svg" alt="Notification" class="h-5 w-5 text-white" />
                    <span
                        class="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-[#0F1115] hidden"></span>
                </button>

                <!-- Divider (Desktop only) -->
                <div class="hidden md:block h-8 w-px bg-white"></div>

                <!-- Profile -->
                <button class="flex items-center gap-3 group">
                    <div class="relative">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                            alt="Riko Azumi"
                            class="h-9 w-9 rounded-lg object-cover border border-gray-600 group-hover:border-[#C29BEF] transition-colors" />
                    </div>
                    <div class="hidden md:flex items-center gap-2">
                        <span class="text-base font-normal text-white group-hover:text-[#C29BEF] transition-colors">Riko
                            Azumi</span>
                        <ChevronDown class="h-4 w-4 text-white group-hover:text-white transition-colors" />
                    </div>
                </button>
            </div>
        </div>

        <!-- Bottom Row: Search Bar (Mobile Only) -->
        <div v-if="!isDiscoverPage" class="mt-4 md:hidden w-full relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search class="h-4 w-4 text-icon-neutral-secondary" />
            </div>
            <input type="text"
                class="block w-full pl-10 pr-3 py-2.5 bg-[#404040] border border-border-form-default rounded-lg leading-5 text-white placeholder-neutral-secondary focus:outline-none focus:bg-[#252830] focus:border-[#C29BEF] focus:ring-1 focus:ring-[#C29BEF] sm:text-sm transition-colors"
                placeholder="Search by title, genre, or developer" />
        </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 md:hidden">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closeMenu"></div>

                <!-- Menu Drawer -->
                <div
                    class="absolute inset-y-0 left-0 w-64 bg-[#0A0A0A] border-r border-white/10 shadow-xl flex flex-col">
                    <!-- Drawer Header -->
                    <div class="p-6 flex items-center justify-between border-b border-white/5">
                        <span class="text-xl font-gaming font-bold text-white tracking-wider">VORTEX</span>
                        <button @click="closeMenu" class="p-2 text-gray-400 hover:text-white transition-colors">
                            <X class="h-6 w-6" />
                        </button>
                    </div>

                    <!-- Navigation -->
                    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        <router-link v-for="item in navItems" :key="item.path" :to="item.path" @click="closeMenu"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
                            :class="$route.path === item.path ? 'bg-[#5C2E91] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'">
                            <component :is="item.icon" class="w-5 h-5 transition-all"
                                :class="{ 'fill-current': $route.path === item.path }" />
                            <span class="font-medium">{{ item.label }}</span>
                        </router-link>
                    </nav>

                    <!-- Bottom Actions -->
                    <div class="p-4 border-t border-white/5 space-y-2">
                        <router-link v-for="item in bottomItems" :key="item.path" :to="item.path" @click="closeMenu"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
                            :class="$route.path === item.path ? 'bg-[#5C2E91] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'">
                            <component :is="item.icon" class="w-5 h-5 transition-all"
                                :class="{ 'fill-current': $route.path === item.path }" />
                            <span class="font-medium">{{ item.label }}</span>
                        </router-link>

                        <button
                            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-400 hover:bg-white/5 hover:text-red-400 text-left group">
                            <LogOut class="w-5 h-5 transition-colors" />
                            <span class="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search, Bell, ChevronDown, ArrowLeft, Menu, Home, Star, Heart, Settings, HelpCircle, LogOut, X } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const isMobileMenuOpen = ref(false);

const closeMenu = () => {
    isMobileMenuOpen.value = false;
};

const navItems = [
    { label: 'Homepage', path: '/', icon: Home },
    { label: 'Discover', path: '/discover', icon: Search },
    { label: 'Reviews', path: '/reviews', icon: Star },
    { label: 'Wishlist', path: '/wishlist', icon: Heart },
];

const bottomItems = [
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Help & Supports', path: '/help', icon: HelpCircle },
];

const isDiscoverPage = computed(() => route.path === '/discover');
const isGameDetailPage = computed(() => route.path.startsWith('/game/'));
</script>
