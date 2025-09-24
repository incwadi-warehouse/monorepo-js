<script setup>
import { reactive, toRefs } from 'vue'

const props = defineProps({
  branch: Object,
  me: Object,
})

const emit = defineEmits(['update'])

const { branch } = toRefs(props)

const state = reactive({
  name: branch.value.name,
  steps: branch.value.steps,
  currency: branch.value.currency,
  ordering: branch.value.ordering,
  isPublic: branch.value.public,
  pricelist: branch.value.pricelist,
  cart: branch.value.cart,
  content: branch.value.content,
  mail_reservation: branch.value.mail_reservation,
})

const update = () => {
  if (!props.me || !props.me.isAdmin) return

  emit('update', {
    id: branch.value.id,
    params: {
      name: state.name,
      steps: parseFloat(state.steps),
      currency: state.currency,
      ordering: state.ordering,
      public: state.isPublic,
      pricelist: state.pricelist,
      cart: state.cart,
      content: state.content,
      mail_reservation: state.mail_reservation,
    },
  })
}
</script>

<template>
  <b-form @submit.prevent="update" v-if="branch">
    <!-- branch -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="name">{{ $t('name_of_branch') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-helpline>{{ $t('branchNameHelp') }}</b-form-helpline>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="name" v-model="state.name" />
      </b-form-item>
    </b-form-group>

    <!-- steps -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="steps">{{ $t('price_steps') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-helpline>{{ $t('branchStepsHelp') }}</b-form-helpline>
      </b-form-item>
      <b-form-item>
        <b-form-input type="number" id="steps" min="0.00" max="100.00" step="0.01" pattern="^\d+(\.|,)?\d{0,2}$"
          v-model="state.steps" />
      </b-form-item>
    </b-form-group>

    <!-- currency -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="currency">{{ $t('currency') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-select id="currency" :items="[
          { key: 'EUR', value: 'EUR' },
          { key: 'USD', value: 'USD' },
        ]" v-model="state.currency" />
      </b-form-item>
    </b-form-group>

    <!-- ordering -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="ordering">{{ $t('bookOrdering') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-helpline>{{ $t('branchOrderingHelp') }}</b-form-helpline>
      </b-form-item>
      <b-form-item>
        <b-form-textarea id="ordering" :rows="5" v-model="state.ordering" />
      </b-form-item>
    </b-form-group>

    <!-- orderBy -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="orderBy">{{ $t('orderBy') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-helpline>{{ $t('branchOrderByHelp') }}</b-form-helpline>
        <b-alert type="warning">
          Deprecation: This setting will be removed soon. "Name - Ascending"
          will become the default. Diese Einstellung wird bald entfernt. "Name -
          Aufsteigend" wird der Standard.
        </b-alert>
      </b-form-item>
      <b-form-item>
        <b-form-select id="orderBy" :items="[
          { key: 'name', value: $t('orderByNameAsc') },
          { key: 'books', value: $t('orderByBookcountDesc') },
        ]" v-model="state.orderBy" />
      </b-form-item>
    </b-form-group>

    <!-- public -->
    <b-form-group>
      <b-form-item>
        <b-form-helpline>{{ $t('branchPublicHelp') }}</b-form-helpline>
      </b-form-item>
      <b-form-item>
        <input type="checkbox" id="public" v-model="state.isPublic" />
        <b-form-label for="public">{{ $t('is_public') }}</b-form-label>
      </b-form-item>
    </b-form-group>

    <!-- cart -->
    <b-form-group>
      <b-form-item>
        <b-form-helpline>{{ $t('activateCartHelp') }}</b-form-helpline>
      </b-form-item>
      <b-form-item>
        <input type="checkbox" id="cart" v-model="state.cart" />
        <b-form-label for="cart">{{ $t('activateCart') }}</b-form-label>
      </b-form-item>
    </b-form-group>

    <!-- content -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="content">{{ $t('content') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-helpline>{{ $t('content_help') }}</b-form-helpline>
      </b-form-item>
      <b-form-item>
        <b-form-textarea id="content" v-model="state.content" rows="5" />
      </b-form-item>
    </b-form-group>

    <!-- mail_reservation -->
    <b-form-group>
      <b-form-item>
        <b-form-label for="mail_reservation">{{ $t('mail_reservation') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-helpline>{{ $t('mail_reservation_help') }}</b-form-helpline>
      </b-form-item>
      <b-form-item>
        <b-form-textarea id="mail_reservation" v-model="state.mail_reservation" rows="5" />
      </b-form-item>
    </b-form-group>

    <!-- buttons -->
    <b-form-group buttons v-if="me && me.isAdmin">
      <b-form-group>
        <b-form-item>
          <b-button design="outline">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form-group>
  </b-form>
</template>
