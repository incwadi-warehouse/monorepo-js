<script setup>
defineProps({
  isPanelActive: Boolean,
})

const find = import.meta.env.VUE_APP_FIND
const catalog = import.meta.env.VUE_APP_CATALOG
const settings = import.meta.env.VUE_APP_SETTINGS

const emit = defineEmits(['close-panel'])
</script>

<template>
  <BPanel
    :model-value="isPanelActive"
    @update:model-value="() => emit('close-panel')"
    @close="emit('close-panel')"
  >
    <BContainer size="m">
      <BNav
        :nav="[
          { route: catalog, title: $t('search') },
          {
            route: catalog + '/search-index',
            title: $t('search') + ' (Experiment)',
          },
          { route: catalog + '/directory', title: $t('directory') },
          { route: { name: 'order.list' }, title: $t('order') },
          { route: settings + '/', title: $t('settings') },
          { route: find, title: $t('shop') },
        ]"
      />
    </BContainer>
  </BPanel>
</template>
