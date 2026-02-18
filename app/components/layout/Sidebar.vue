<template>
    <aside class="hidden md:flex flex-col w-64 h-screen bg-[#0A0A0A] border-r border-white/5 fixed left-0 top-0 z-50">
        <!-- Logo -->
        <div class="p-8">
            <h1 class="text-2xl text-center font-gaming font-bold text-white tracking-wider">
                VORTEX
            </h1>
        </div>

        <!-- Main Navigation -->
        <nav class="flex-1 px-4 space-y-2 mt-4">
            <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path"
                class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
                :class="$route.path === item.path ? 'bg-[#5C2E91] text-white' : 'text-white hover:bg-white/5'">
                <component :is="item.icon" class="w-5 h-5 transition-all"
                    :class="{ 'fill-current': $route.path === item.path }" />
                <span class="font-medium">{{ item.label }}</span>
            </NuxtLink>
        </nav>

        <!-- Bottom Navigation -->
        <div class="px-4 pb-8 space-y-2">
            <NuxtLink v-for="item in bottomItems" :key="item.path" :to="item.path"
                class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
                :class="$route.path === item.path ? 'bg-[#5C2E91] text-white' : 'text-white hover:bg-white/5'">
                <component :is="item.icon" class="w-5 h-5 transition-all"
                    :class="{ 'fill-current': $route.path === item.path }" />
                <span class="font-medium">{{ item.label }}</span>
            </NuxtLink>

            <button
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-white hover:bg-white/5 text-left group">
                <component :is="LogOut" class="w-5 h-5 group-hover:text-red-400 transition-colors" />
                <span class="font-medium group-hover:text-red-400 transition-colors">Sign Out</span>
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { Home, Search, Star, Heart, Settings, HelpCircle, LogOut } from 'lucide-vue-next';

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
</script>
