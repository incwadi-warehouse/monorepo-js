<script setup>
import { useTitle } from '@baldeweg/ui'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useReservation } from '@/composables/useReservation.js'

const props = defineProps({
  id: String,
})

const { t } = useI18n()

useTitle({ title: t('order') })

const catalog = import.meta.env.VUE_APP_CATALOG

const { reservation, show, update, remove } = useReservation()

show(props.id)

const diff = computed(() => {
  const duration = dayjs().diff(dayjs.unix(reservation.value.createdAt))

  return Math.round(duration / 1000 / 86400)
})

const toLocaleDateString = (data) => {
  let date = new Date(data * 1000)

  return date.toLocaleString()
}
</script>

<template>
  <b-container size="m">
    <BChip>Experiment</BChip>
    <h1>{{ $t('order') }}</h1>
  </b-container>

  <b-container size="m" v-if="reservation">
    <p>
      {{ $t('reserved_on') }} {{ toLocaleDateString(reservation.createdAt) }}
    </p>

    <b-alert type="error" v-if="diff > 14">
      {{ $t('old_reservation', { days: diff }) }}
    </b-alert>

    <ul>
      <li v-for="book in reservation.books" :key="book.id">
        <a :href="catalog + '/search/book/' + book.id">
          {{ book.title }} - {{ book.genre.name }} - {{ book.author.surname }},
          {{ book.author.firstname }}
          <span v-if="book.sold"> - {{ $t('sold') }}</span>
          <span v-if="book.removed"> - {{ $t('removed') }}</span>
        </a>
      </li>
    </ul>

    <b-form @submit.prevent="update">
      <b-form-group>
        <b-form-item>
          <BSwitch v-model="reservation.open" :label="$t('new')" />
        </b-form-item>
      </b-form-group>

      <details>
        <summary class="selector">
          {{ $t('customer_details') }}
        </summary>

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
      </details>

      <b-form-group buttons>
        <b-form-item>
          <b-button
            type="button"
            design="outline_danger"
            @click="remove(reservation.id)"
            :style="{ marginRight: '10px' }"
          >
            {{ $t('delete') }}
          </b-button>
          <b-button design="outline">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<style scoped>
.selector {
  cursor: pointer;
  user-select: none;
}
</style>
