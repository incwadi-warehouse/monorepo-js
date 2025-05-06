<script setup>
import { useHead } from '@unhead/vue'
import InventoryTable from '@/components/inventory/InventoryTable.vue'
import { useInventory } from '@/composables/useInventory.js'

useTitle({ title: 'Inventory' })

defineProps({
  auth: Object,
})

const inventory = useInventory()
</script>

<template>
  <article>
    <b-container size="m">
      <b-button
        :style="{ float: 'right' }"
        design="outline"
        @click.prevent="inventory.create"
        v-if="
          !inventory.state.hasActiveInventory &&
          auth.state.me &&
          auth.state.me.isAdmin
        "
      >
        {{ $t('createInventory') }}
      </b-button>

      <h1>{{ $t('inventory') }}</h1>
      <p>{{ $t('inventoryDesc') }}</p>
    </b-container>

    <b-container size="m">
      <InventoryTable
        v-if="auth.state.me"
        :inventories="inventory.state.inventories"
        :isAdmin="auth.state.me.isAdmin"
        @end="inventory.end"
      />
    </b-container>
  </article>
</template>
