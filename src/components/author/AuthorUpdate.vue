<script setup>
import { toRefs } from 'vue'
import { useAuthor } from '@/composables/useAuthor.js'

const props = defineProps({
  id: Number,
})

const { id } = toRefs(props)

const { author, isUpdating, show, update } = useAuthor()

show(id.value)
</script>

<template>
  <b-spinner size="l" v-if="!author" />

  <b-form @submit.prevent="update(author.id)" v-if="author">
    <!-- firstname -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="firstname">
          {{ $t('firstname') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="firstname" v-model="author.firstname" />
      </b-form-item>
    </b-form-group>

    <!-- surname -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="surname">{{ $t('surname') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="surname" v-model="author.surname" />
      </b-form-item>
    </b-form-group>

    <!-- buttons -->
    <b-form-group>
      <b-form-item>
        <b-button design="primary_wide" v-if="!isUpdating">
          {{ $t('save') }}
        </b-button>
        <b-button design="outline_wide" type="button" v-if="isUpdating">
          <b-spinner size="s" :style="{ margin: 'auto' }" />
        </b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>
