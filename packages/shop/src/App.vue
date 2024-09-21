<script setup>
import { useLocale, useToast } from '@baldeweg/ui'
import AppMasthead from '@/components/AppMasthead.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import AppCart2 from '@/components/AppCart2.vue'
import { ref, onMounted, onUnmounted } from 'vue'

useLocale()

const about = import.meta.env.VITE_ABOUT

const { current } = useToast()

const showCart = ref(false)

const handleKeyDown = (event) => {
  if (event.altKey && event.code === 'KeyC') {
    showCart.value = !showCart.value;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

const handleCartVisibility = (isVisible) => {
  showCart.value = isVisible;
}
</script>

<template>
  <BApp>
    <AppMasthead />

    <AppToolbar />

    <RouterView />

    <div class="footer">
      <BContainer size="m">
        <div v-html="about" />
      </BContainer>
    </div>

    <BToast v-if="current" :type="current.type" :visible="true">
      {{ current.body }}
    </BToast>
  </BApp>

  <AppCart2 :visible="showCart" @update:visible="handleCartVisibility" />
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-neutral-02);
}
</style>
