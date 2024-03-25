<script setup>
import { useLocale, useToast } from '@baldeweg/ui'
import AppMasthead from '@/components/AppMasthead.vue'
import AppBanner from '@/components/AppBanner.vue'

useLocale()

const about = import.meta.env.VUE_APP_ABOUT

const { current } = useToast()
</script>

<template>
  <BApp>
    <AppMasthead />

    <AppBanner />

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
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-neutral-02);
}
</style>
