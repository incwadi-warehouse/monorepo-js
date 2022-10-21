<script setup>
import { useAnnouncement } from '@/composables/useAnnouncement.js'

const { title, body, create } = useAnnouncement()
</script>

<template>
  <b-form @submit.prevent="create">
    <!-- Title -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="title">
          {{ $t('title') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input id="title" v-model="title" />
      </b-form-item>
    </b-form-group>

    <!-- Body -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="body">
          {{ $t('text') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-textarea id="body" v-model="body" />
      </b-form-item>
    </b-form-group>

    <!-- Visibility -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="visibility">
          {{ $t('visibility') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-select
          id="visibility"
          :items="[
            { key: 'all', value: $t('all_branches_without_shop') },
            { key: 'own', value: $t('own_branch_without_shop') },
            { key: 'shop', value: $t('own_branch_shop_only') },
          ]"
          value="all"
        />
      </b-form-item>
    </b-form-group>

    <!-- Buttons -->
    <b-form-group>
      <b-form-item>
        <b-button design="primary_wide">{{ $t('save') }}</b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>
