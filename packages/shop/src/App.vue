<script setup>
import { useLocale, useColorScheme } from '@baldeweg/ui'
import { useToast } from '@baldeweg/ui'
import Logo from '@/components/AppLogo.vue'
import Cart from '@/components/AppCart.vue'
import AppMasthead from '@/components/AppMasthead.vue'
import SearchContent from '@/components/search/SearchContent.vue'

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
