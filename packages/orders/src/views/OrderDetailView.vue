<script setup>
import { useTitle } from '@baldeweg/ui'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useOrder } from '@/composables/useOrder.js'

const props = defineProps({
  id: String,
})

const { t } = useI18n()

useTitle({ title: t('order') })

const catalog = import.meta.env.VUE_APP_CATALOG

const { reservation, show, update, remove } = useOrder()

show(props.id)

const diff = computed(() => {
  const duration = dayjs().diff(dayjs.unix(reservation.value.createdAt))

  return Math.round(duration / 1000 / 86400)
})

const toLocaleDateString = (data) => {
  let date = new Date(data * 1000)

  return date.toLocaleString()
}

const currency = (number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(number)
}

const sum = computed(() => {
  return reservation.value.books.reduce((prev, cur) => {
    return prev + cur.price
  }, 0)
})
</script>

<template>
  <b-container size="m" v-if="reservation">
    <BChip>Experiment</BChip>
    <h1>
      {{ $t('order_from') }} {{ toLocaleDateString(reservation.createdAt) }}
    </h1>
    <RouterLink :to="{ name: 'index' }">{{ $t('back') }}</RouterLink>
  </b-container>

  <b-container size="m" v-if="reservation && diff > 14">
    <b-alert type="error">
      {{ $t('old_reservation', { days: diff }) }}
    </b-alert>
  </b-container>

  <b-container size="m" v-if="reservation">
    <h2>{{ $t('products') }}</h2>
    <BTable>
      <table>
        <thead>
          <tr>
            <th>{{ $t('title') }}</th>
            <th>{{ $t('author') }}</th>
            <th>{{ $t('genre') }}</th>
            <th class="alignRight">{{ $t('price') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, index) in reservation.books" :key="index">
            <td>
              <a :href="catalog + '/search/book/' + product.id">
                {{ product.title }}
              </a>
              <span v-if="product.sold"> - {{ $t('sold') }}</span>
              <span v-if="product.removed"> - {{ $t('removed') }}</span>
            </td>
            <td>
              {{ product.author.surname }}, {{ product.author.firstname }}
            </td>
            <td>{{ product.genre.name }}</td>
            <td class="alignRight">{{ currency(product.price) }}</td>
          </tr>
        </tbody>

        <tfoot :style="{ fontWeight: 'bold' }">
          <tr>
            <td colspan="3">
              {{ $t('grand_total') }}
            </td>
            <td class="alignRight">{{ currency(sum) }}</td>
          </tr>
        </tfoot>
      </table>
    </BTable>
  </b-container>

  <BContainer size="m">
    <h2>{{ $t('status') }}</h2>
    <b-form @submit.prevent="update">
      <b-form-group>
        <b-form-item>
          <BSwitch v-model="reservation.open" :label="$t('new')" />
        </b-form-item>
      </b-form-group>
    </b-form>
  </BContainer>

  <b-container size="m" v-if="reservation">
    <h2>{{ $t('customer') }}</h2>
    <details>
      <summary class="selector">
        {{ $t('customer_details') }}
      </summary>
      <b-form @submit.prevent="update">
        <b-form-group>
          <b-form-item>
            <b-form-label for="salutation">
              {{ $t('salutation') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select
              :items="[
                { key: 'm', value: $t('mr') },
                { key: 'f', value: $t('mrs') },
                { key: 'd', value: $t('none_divers') },
              ]"
              id="salutation"
              v-model="reservation.salutation"
            />
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="firstname">
              {{ $t('firstname') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="firstname"
              v-model="reservation.firstname"
            />
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="surname">
              {{ $t('surname') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="surname"
              v-model="reservation.surname"
            />
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="mail">
              {{ $t('mail') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="email" id="mail" v-model="reservation.mail" />
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="phone">
              {{ $t('phone') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="tel" id="phone" v-model="reservation.phone" />
          </b-form-item>
        </b-form-group>

        <b-form-group>
          <b-form-item>
            <b-form-label for="notes">{{ $t('notes') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-textarea id="notes" v-model="reservation.notes" />
          </b-form-item>
        </b-form-group>

        <b-form-group buttons>
          <b-form-item>
            <b-button design="outline">{{ $t('save') }}</b-button>
          </b-form-item>
        </b-form-group>
      </b-form>
    </details>
  </b-container>

  <BContainer size="m">
    <h2>{{ $t('delete') }}</h2>
    <b-form-group>
      <b-form-item>
        <b-button
          type="button"
          design="outline_danger"
          @click="remove(reservation.id)"
          :style="{ marginRight: '10px' }"
        >
          {{ $t('delete') }}
        </b-button>
      </b-form-item>
    </b-form-group>
  </BContainer>
</template>

<style scoped>
.selector {
  cursor: pointer;
  user-select: none;
}
.alignRight {
  text-align: right;
}
</style>
