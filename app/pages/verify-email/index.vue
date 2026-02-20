<template>
    <AuthLayout
        image="https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcm1haW5hbiUyMGdhbWV8ZW58MHx8MHx8fDA%3D"
        title="Verify Your Email" mobileTitle="Verify Email" mobileStep="Step 2 of 2"
        subtitle="We've sent a code to your inbox." tag="VORTEX">

        <div class="hidden lg:block text-center mb-8">
            <span class="text-xs text-white font-bold uppercase tracking-widest mb-1 block">Step 2 of 2</span>
            <h1 class="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
        </div>

        <div class="text-center text-gray-300 mb-8 max-w-sm mx-auto">
            <p>We've sent a verification link to <span class="text-[#C29BEF]">riko.azumi@gmail.com</span>.
                Please check your email and click the link to activate your account.</p>
        </div>

        <form @submit.prevent="handleVerify" class="space-y-6">
            <div class="flex justify-center gap-4">
                <input v-for="(digit, index) in code" :key="index" type="text" maxlength="1"
                    class="w-20 h-18 bg-[#424242] border border-border-form-default rounded-lg text-white text-center text-xl font-bold focus:outline-none focus:border-[#C29BEF] focus:ring-1 focus:ring-[#C29BEF] transition-colors"
                    v-model="code[index]" @input="focusNext($event, index)" />
            </div>

            <div class="pt-4">
                <BaseButton type="submit" variant="primary"
                    class="!bg-[#C29BEF] hover:!bg-[#A78BFA] !text-[#293047] !text-lg !font-bold">
                    Verify
                </BaseButton>
            </div>

            <div class="text-center text-sm text-gray-400 mt-6">
                You can resend the email in <span class="text-[#C29BEF]">00:25</span>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '~/components/layout/AuthLayout.vue';
import BaseButton from '~/components/common/BaseButton.vue';

useSeoMeta({
    title: 'Verify Email',
    description: 'Verify your email address to complete your GameVault registration.',
})

definePageMeta({
    layout: false
});

const code = reactive(['', '', '', '']);

const focusNext = (event: Event, index: number) => {
    const target = event.target as HTMLInputElement;
    if (target.value && index < 3) {
        const nextInput = target.nextElementSibling as HTMLInputElement;
        if (nextInput) nextInput.focus();
    }
};

const handleVerify = () => {
    console.log('Verify code:', code.join(''));
    navigateTo('/');
};
</script>
