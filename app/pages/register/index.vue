<template>
    <AuthLayout
        image="https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcm1haW5hbiUyMGdhbWV8ZW58MHx8MHx8fDA%3D"
        title="Explore Epic Worlds" mobileTitle="Sign Up" mobileStep="Step 1 of 2"
        subtitle="From pixel classics to next-gen adventures." tag="VORTEX">

        <div class="hidden lg:block text-center mb-8">
            <span class="text-xs text-white font-semibold uppercase tracking-widest mb-1 block">Step 1 of 2</span>
            <h1 class="text-3xl font-bold text-white mb-2">Sign Up</h1>
            <p class="text-base text-gray-400">Join thousands of players discovering new games.</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
            <BaseInput id="username" label="Username" v-model="form.username" type="text" placeholder="Riko Azumi"
                icon="/icons/User.svg" />

            <BaseInput id="email" label="Email" v-model="form.email" type="email" placeholder="example@gmail.com"
                icon="/icons/Envelope.svg" />

            <BaseInput id="password" label="Create Password" v-model="form.password"
                :type="showPassword ? 'text' : 'password'" placeholder="********" icon="/icons/Key.svg">
                <template #append>
                    <button type="button" @click="showPassword = !showPassword"
                        class="text-gray-400 hover:text-white transition-colors">
                        <component :is="showPassword ? Eye : EyeOff" class="h-5 w-5" />
                    </button>
                </template>
            </BaseInput>

            <div class="flex items-center">
                <label class="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" v-model="form.agree" required
                        class="w-5 h-5 rounded border-gray-600 bg-[#424242] text-[#C29BEF] focus:ring-[#C29BEF] accent-[#C29BEF]" />
                    <span class="text-sm text-gray-300 group-hover:text-white transition-colors">I agree to the <a
                            href="#" class="text-[#C29BEF] hover:underline">Terms</a> & <a href="#"
                            class="text-[#C29BEF] hover:underline">Privacy Policy</a></span>
                </label>
            </div>

            <div class="pt-2">
                <BaseButton type="submit" variant="primary" :disabled="!form.agree"
                    class="!bg-[#C29BEF] hover:!bg-[#A78BFA] !text-[#293047] !text-lg !font-bold">
                    Sign Up
                </BaseButton>
            </div>

            <div class="relative flex items-center py-4">
                <div class="flex-grow border-t border-white"></div>
                <span class="flex-shrink-0 mx-4 text-sm text-white">Or sign up with</span>
                <div class="flex-grow border-t border-white"></div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <BaseButton variant="social"
                    class="!bg-transparent !border-white hover:!bg-white/5 !rounded-lg !py-4 flex justify-center items-center">
                    <img src="/icons/Google.svg" class="h-6 w-6" alt="Google" />
                </BaseButton>
                <BaseButton variant="social"
                    class="!bg-transparent !border-white hover:!bg-white/5 !rounded-lg !py-4 flex justify-center items-center">
                    <img src="/icons/facebook.svg" class="h-6 w-6" alt="Facebook" />
                </BaseButton>
            </div>

            <div class="text-center text-sm text-white mt-6">
                Already have an account? <NuxtLink to="/login"
                    class="font-medium text-[#C29BEF] hover:text-[#A78BFA] hover:underline">Sign in
                    here</NuxtLink>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup lang="ts">
import { User, Mail, Key, Eye, EyeOff } from 'lucide-vue-next';
import AuthLayout from '~/components/layout/AuthLayout.vue';
import BaseInput from '~/components/common/BaseInput.vue';
import BaseButton from '~/components/common/BaseButton.vue';

definePageMeta({
    layout: false
});

const form = reactive({
    username: '',
    email: '',
    password: '',
    agree: false
});

const showPassword = ref(false);

const handleRegister = () => {
    console.log('Register:', form);
    // TODO: Implement register logic
    navigateTo('/verify-email');
};
</script>
