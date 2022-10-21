<script setup>
import { useTag } from '@/composables/useTag.js'

const { tag, create } = useTag()
</script>

<template>
  <b-form @submit.prevent="create">
    <b-form-group>
      <b-form-item>
        <b-form-label for="name" hidden>
          {{ $t('new_tag') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="text"
          id="name"
          :placeholder="$t('enter_tag_and_hit_enter')"
          v-model="tag"
        />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>
