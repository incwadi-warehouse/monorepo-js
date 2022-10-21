<script setup>
import { computed, onMounted, reactive } from 'vue'

const props = defineProps({
  reservation: Object,
})

const emit = defineEmits(['update'])

const state = reactive({
  date: null,
  time: null,
  notes: props.reservation.notes,
  books: computed(() => {
    let list = []
    props.reservation.books.forEach((element) => {
      list.push(element.id)
    })
    return list.join(',')
  }),
  collection: computed(() => {
    let date = new Date(state.date + ' ' + state.time + 'Z')
    return date.getTime() / 1000
  }),
  salutation: props.reservation.salutation,
  firstname: props.reservation.firstname,
  surname: props.reservation.surname,
  mail: props.reservation.mail,
  phone: props.reservation.phone,
})

const update = () => {
  emit('update', {
    id: props.reservation.id,
    collection: state.collection,
    notes: state.notes,
    books: state.books,
    salutation: state.salutation,
    firstname: state.firstname,
    surname: state.surname,
    mail: state.mail,
    phone: state.phone,
  })
}

onMounted(() => {
  setCollection()
})

const setCollection = () => {
  if (null === props.reservation.collection) return

  let date = new Date(props.reservation.collection * 1000)

  let month = formatNumber(date.getMonth() + 1)
  let day = formatNumber(date.getDate())
  state.date = date.getFullYear() + '-' + month + '-' + day

  let hours = formatNumber(date.getHours())
  let minutes = formatNumber(date.getMinutes())
  state.time = hours + ':' + minutes
}

const formatNumber = (number) => {
  if (number <= 9) {
    return '0' + number
  }
  return number
}

const toLocaleDateString = (data) => {
  let date = new Date(data * 1000)
  return date.toLocaleString()
}
</script>

<template>
  <div class="reservation">
    <p>
      {{ $t('createdAt') }}: {{ toLocaleDateString(reservation.createdAt) }}
    </p>

    <ul>
      <li v-for="book in reservation.books" :key="book.id">
        <router-link :to="{ name: 'book.update', params: { id: book.id } }">
          {{ book.title }} - {{ book.genre.name }} - {{ book.author.surname }},
          {{ book.author.firstname }}
          <span v-if="book.sold"> - {{ $t('sold') }}</span>
          <span v-if="book.removed"> - {{ $t('removed') }}</span>
        </router-link>
      </li>
    </ul>
    <b-form-input type="hidden" id="books" v-model="state.books" />

    <b-form @submit.prevent="update">
      <b-form-group :style="{ display: 'none' }">
        <b-form-item>
          <b-form-label for="date">
            {{ $t('date') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="date" id="date" v-model="state.date" />
        </b-form-item>
      </b-form-group>

      <b-form-group :style="{ display: 'none' }">
        <b-form-item>
          <b-form-label for="time">
            {{ $t('time') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="time" id="time" v-model="state.time" />
        </b-form-item>
      </b-form-group>

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
            v-model="state.salutation"
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
          <b-form-input type="text" id="firstname" v-model="state.firstname" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="surname">
            {{ $t('surname') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="text" id="surname" v-model="state.surname" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="mail">
            {{ $t('mail') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="email" id="mail" v-model="state.mail" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="phone">
            {{ $t('phone') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="tel" id="phone" v-model="state.phone" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="notes">{{ $t('notes') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-textarea id="notes" v-model="state.notes" />
        </b-form-item>
      </b-form-group>

      <b-form-group buttons>
        <b-form-item>
          <b-button
            type="button"
            design="outline_danger"
            @click="$emit('remove', reservation.id)"
            :style="{ marginRight: '10px' }"
          >
            {{ $t('delete') }}
          </b-button>
          <b-button design="outline">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </div>
</template>

<style scoped>
.reservation {
  border-bottom: 1px solid var(--color-neutral-02);
}
</style>
