<script setup>
import { useHead } from '@unhead/vue'
import { useToast } from '@/composables/useToast.js'
import { watch } from 'vue'
import BranchEdit from '../components/branch/BranchEdit.vue'
import BranchCleanBooks from '../components/branch/BranchCleanBooks.vue'
import BranchPriceCalculator from '@/components/branch/BranchPriceCalculator.vue'
import { useBranch } from '@/composables/useBranch.js'

useTitle({ title: 'Branch' })

defineProps({
  auth: Object,
})

const branch = useBranch()

const toast = useToast()

watch(
  () => branch.state.hasSuccess,
  () => {
    branch.state.hasSuccess = false
    toast.add({ type: 'success', body: 'Gespeichert' })
  }
)

watch(
  () => branch.state.hasError,
  () => {
    branch.state.hasError = false
    toast.add({ type: 'error', body: 'Fehler' })
  }
)
</script>

<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('branch') }}</h1>
    </b-container>

    <b-container size="m" v-if="auth.state.me">
      <h2>{{ $t('common') }}</h2>
      <BranchEdit
        :branch="auth.state.me.branch"
        :me="auth.state.me"
        @update="branch.update"
      />
    </b-container>

    <b-container size="m" v-if="auth.state.me && auth.state.me.isAdmin">
      <h2>{{ $t('clean_up') }}</h2>
      <p>{{ $t('clean_up_desc') }}</p>
      <BranchCleanBooks @clean="branch.clean" />
    </b-container>

    <b-container size="m">
      <h3>{{ $t('pricelist') }}</h3>
      <p>{{ $t('pricelistDesc') }}</p>
      <BranchPriceCalculator
        :branch="auth.state.me.branch"
        :me="auth.state.me"
        @update="branch.update"
        v-if="auth.state.me"
      />
    </b-container>
  </article>
</template>
