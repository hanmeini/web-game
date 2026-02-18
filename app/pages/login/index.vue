<template>
    <AuthLayout image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
        title="Thousands of worlds are waiting!" mobileTitle="Sign In"
        subtitle="Jump back in and pick up where you left off" tag="VORTEX">

        <div class="hidden lg:block text-center mb-8">
            <h1 class="text-3xl font-bold text-white mb-2">Sign In</h1>
            <p class="text-base text-gray-400">Thousands of worlds are waiting. Jump back in!</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
            <BaseInput id="email" label="Email" v-model="form.email" type="email" placeholder="example@gmail.com"
                icon="/icons/Envelope.svg" />

            <BaseInput id="password" label="Password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                placeholder="********" icon="/icons/Key.svg">
                <template #append>
                    <button type="button" @click="showPassword = !showPassword"
                        class="text-gray-400 hover:text-white transition-colors">
                        <component :is="showPassword ? Eye : EyeOff" class="h-5 w-5" />
                    </button>
                </template>
            </BaseInput>

            <div class="flex items-center justify-between mt-2">
                <label class="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" v-model="form.rememberMe"
                        class="w-5 h-5 rounded border-gray-600 bg-[#424242] text-[#C29BEF] focus:ring-[#C29BEF] accent-[#C29BEF]" />
                    <span class="text-sm text-gray-300 group-hover:text-white transition-colors">Remember Me?</span>
                </label>
                <a href="#" class="text-sm font-medium text-[#C29BEF] hover:text-[#A78BFA] transition-colors">Forgot
                    Password?</a>
            </div>

            <div class="pt-2">
                <BaseButton type="submit" variant="primary"
                    class="!bg-[#C29BEF] hover:!bg-[#A78BFA] !text-[#293047] !text-lg !font-bold">
                    Sign In
                </BaseButton>
            </div>

            <div class="relative flex items-center py-4">
                <div class="flex-grow border-t border-white"></div>
                <span class="flex-shrink-0 mx-4 text-sm text-white">Or sign in with</span>
                <div class="flex-grow border-t border-white"></div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <BaseButton variant="social"
                    class="!bg-transparent !border-white hover:!bg-white/5 !rounded-xl !py-4 flex justify-center items-center">
                    <img src="/icons/Google.svg" class="h-6 w-6" alt="Google" />
                </BaseButton>
                <BaseButton variant="social"
                    class="!bg-transparent !border-white hover:!bg-white/5 !rounded-xl !py-4 flex justify-center items-center">
                    <img src="/icons/facebook.svg" class="h-6 w-6" alt="Facebook" />
                </BaseButton>
            </div>

            <div class="text-center text-sm text-white mt-8">
                New here? <NuxtLink to="/register"
                    class="font-medium text-[#C29BEF] hover:text-[#A78BFA] hover:underline">Create an
                    account
                </NuxtLink>
            </div>
        </form>

    </AuthLayout>
</template>

<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next';
import AuthLayout from '~/components/layout/AuthLayout.vue';
import BaseInput from '~/components/common/BaseInput.vue';
import BaseButton from '~/components/common/BaseButton.vue';

definePageMeta({
    layout: false
});

const form = reactive({
    email: '',
    password: '',
    rememberMe: false
});

const showPassword = ref(false);

const handleLogin = () => {
    console.log('Login:', form);
    // TODO: Implement login logic
    navigateTo('/');
};
</script>
