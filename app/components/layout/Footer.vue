<template>
    <footer class="mt-auto bg-[#180C38] text-white py-12 px-6">
        <div class="max-w-7xl mx-auto flex flex-col items-center">
            <!-- Social Icons & Main Links -->
            <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-8">
                <div class="flex items-center gap-6">
                    <a href="#" class="text-white hover:text-[#C29BEF] transition-colors">
                        <img src="/icons/youtube.svg" alt="Youtube" class="w-6 h-6" />
                    </a>
                    <a href="#" class="text-white hover:text-[#C29BEF] transition-colors">
                        <img src="/icons/x.svg" alt="Twitter" class="w-6 h-6" />
                    </a>
                    <a href="#" class="text-white hover:text-[#C29BEF] transition-colors">
                        <img src="/icons/facebook.svg" alt="Facebook" class="w-6 h-6" />
                    </a>
                </div>

                <nav class="flex items-center gap-8 font-normal">
                    <a href="#" class="hover:text-[#C29BEF] transition-colors">ABOUT</a>
                    <a href="#" class="hover:text-[#C29BEF] transition-colors">FAQ</a>
                    <a href="#" class="hover:text-[#C29BEF] transition-colors">CONTACT US</a>
                </nav>
            </div>

            <!-- Copyright & Legal Links -->
            <div class="flex flex-col md:flex-row items-center gap-4 text-sm text-white">
                <span>Copyright @2025 Vortex</span>
                <span class="hidden md:inline">•</span>
                <nav class="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
                    <a href="#" class="hover:text-gray-200 transition-colors">Disclaimer</a>
                    <span class="hidden md:inline">•</span>
                    <a href="#" class="hover:text-gray-200 transition-colors">Terms</a>
                    <span class="hidden md:inline">•</span>
                    <a href="#" class="hover:text-gray-200 transition-colors">Privacy</a>
                    <span class="hidden md:inline">•</span>
                    <a href="#" class="hover:text-gray-200 transition-colors">Cookies</a>
                </nav>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { Youtube, Twitter, Facebook } from 'lucide-vue-next';
</script>
