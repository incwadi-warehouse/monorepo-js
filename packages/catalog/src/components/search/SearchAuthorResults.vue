<script setup>
defineProps({
  authors: Array,
})
</script>

<template>
  <div v-if="authors">
    <b-list
      v-for="author in authors"
      :key="author.id"
      :route="{ name: 'author.update', params: { id: author.id } }"
      divider
    >
      <template #title>{{ author.surname }}, {{ author.firstname }}</template>

      <template #options>
        <b-dropdown>
          <template #selector>
            <b-icon type="meatballs" />
          </template>
          <b-dropdown-item
            icon="pencil"
            @click="
              $router.push({ name: 'author.update', params: { id: author.id } })
            "
          >
            {{ $t('edit') }}
          </b-dropdown-item>
          <b-dropdown-item icon="bin" @click="$emit('remove', author.id)">
            {{ $t('remove') }}
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-list>
  </div>
</template>
