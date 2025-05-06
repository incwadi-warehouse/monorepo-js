<script setup>
import { useToast } from '@/composables/useToast.js'
import AppMasthead from '@/components/AppMasthead.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: "Home",
  titleTemplate: '%s',
  htmlAttrs: {
    lang: navigator.language,
  }
})

const about = import.meta.env.VITE_ABOUT

const { current } = useToast()
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
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-neutral-02);
}
</style>
