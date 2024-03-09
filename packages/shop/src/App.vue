<script setup>
import { useLocale, useColorScheme } from '@baldeweg/ui'
import { useToast } from '@baldeweg/ui'
import AppMasthead from '@/components/AppMasthead.vue'

useLocale()
useColorScheme()

const about = import.meta.env.VUE_APP_ABOUT

const { current } = useToast()
</script>

<template>
  <BApp>
    <AppMasthead />

    <RouterView />

    <BContainer size="m">
      <div v-html="about" />
    </BContainer>

    <BToast v-if="current" :type="current.type" :visible="true">
      {{ current.body }}
    </BToast>
  </BApp>
</template>
