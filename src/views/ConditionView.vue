<script setup>
import { useTitle } from '@baldeweg/ui'
import ConditionShow from '@/components/condition/ConditionShow.vue'
import ConditionCreate from '@/components/condition/ConditionCreate.vue'
import { useCondition } from '@/composables/useCondition.js'

useTitle({ title: 'Condition' })

defineProps({
  auth: Object,
})

const condition = useCondition()
</script>

<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('conditions') }}</h1>
      <p>{{ $t('conditions_desc') }}</p>
    </b-container>

    <b-container size="m">
      <ConditionShow
        v-for="item in condition.state.conditions"
        :key="item.id"
        :item="item"
        :isAdmin="auth.state.me.isAdmin"
        @update="condition.update"
        @remove="condition.remove"
      />
    </b-container>

    <b-container size="m" v-if="auth.state.me.isAdmin">
      <ConditionCreate @create="condition.create" />
    </b-container>
  </article>
</template>
