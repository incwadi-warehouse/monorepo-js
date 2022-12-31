<script setup>
defineProps({
  isPanelActive: Boolean,
})

const find = import.meta.env.VUE_APP_FIND
const catalog = import.meta.env.VUE_APP_CATALOG
const settings = import.meta.env.VUE_APP_SETTINGS
</script>

<template>
  <BPanel :visible="isPanelActive" @close="$emit('close-panel')">
    <div :style="{ padding: '20px' }">
      <BList divider>
        <template #title>
          <a :href="catalog + '/search'">
            {{ $t('search') }}
          </a>
        </template>
      </BList>
      <BList divider>
        <template #title>
          <a :href="catalog + '/directory'">
            {{ $t('directory') }}
          </a>
        </template>
      </BList>
      <BList :route="{ name: 'reservation' }" divider active>
        <template #title>
          {{ $t('reservation') }}
        </template>
      </BList>
      <BList divider>
        <template #title>
          <a :href="settings + '/'">
            {{ $t('settings') }}
          </a>
        </template>
      </BList>
      <BList divider>
        <template #title>
          <a :href="find">
            {{ $t('shop') }}
          </a>
        </template>
      </BList>
    </div>
  </BPanel>
</template>
