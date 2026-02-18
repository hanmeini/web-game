<template>
    <div
        class="min-h-screen bg-[#1F1F1F] text-white font-body selection:bg-[#5C2E91] selection:text-white overflow-x-hidden">
        <Sidebar />

        <div class="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
            <Header />

            <main class="flex-grow">
                <slot />
            </main>

            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue';
import Header from '~/components/layout/Header.vue';
import Footer from '~/components/layout/Footer.vue';
</script>
