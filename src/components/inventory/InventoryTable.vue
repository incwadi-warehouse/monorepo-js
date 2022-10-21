<script setup>
defineProps({
  inventories: Array,
  isAdmin: Boolean,
})

const formatDate = (data) => {
  const date = new Date(data * 1000)

  return date.toLocaleString()
}
</script>

<template>
  <b-table v-if="inventories">
    <table :aria-label="$t('inventory')">
      <thead>
        <tr>
          <th scope="col">{{ $t('startedAt') }}</th>
          <th scope="col">{{ $t('endedAt') }}</th>
          <th scope="col" class="alignRight">{{ $t('found') }}</th>
          <th scope="col" class="alignRight">
            {{ $t('notFound') }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="inventory in inventories" :key="inventory.id">
          <td>{{ formatDate(inventory.startedAt) }}</td>
          <td>
            {{ inventory.endedAt ? formatDate(inventory.endedAt) : null }}
            <b-button
              design="text"
              @click="$emit('end', inventory.id)"
              v-if="null === inventory.endedAt && isAdmin"
            >
              {{ $t('end') }}
            </b-button>
          </td>
          <td class="alignRight">{{ inventory.found }}</td>
          <td class="alignRight">{{ inventory.notFound }}</td>
        </tr>
      </tbody>
    </table>
  </b-table>
</template>

<style scoped>
.alignRight {
  text-align: right;
}
</style>
