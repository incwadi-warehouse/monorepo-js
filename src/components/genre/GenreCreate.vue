<script setup>
import { ref } from 'vue'

const emit = defineEmits(['create'])

const name = ref('')

const submit = () => {
  emit('create', name.value)
  name.value = ''
}
</script>

<template>
  <b-form @submit.prevent="submit">
    <b-form-group>
      <b-form-item>
        <b-form-label for="genre" hidden>
          {{ $t('new_genre') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="text"
          id="genre"
          :placeholder="$t('enter_genre_and_hit_enter')"
          v-model="name"
        />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>
