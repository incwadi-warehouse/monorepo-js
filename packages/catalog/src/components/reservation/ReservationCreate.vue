<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  cart: Array,
})

const emit = defineEmits(['create', 'created'])

const state = reactive({
  date: null,
  time: '00:00',
  notes: null,
  books: computed(() => {
    if (null === props.cart) return
    let list = []
    props.cart.forEach((element) => {
      list.push(element.id)
    })
    return list.join(',')
  }),
  collection: computed(() => {
    if (null === state.date || null === state.time) return
    let date = new Date(state.date + ' ' + state.time + 'Z')
    return date.getTime() / 1000
  }),
  salutation: null,
  firstname: null,
  surname: null,
  mail: null,
  phone: null,
})

const create = () => {
  emit('create', {
    collection: state.collection,
    notes: state.notes,
    books: state.books,
    salutation: state.salutation,
    firstname: state.firstname,
    surname: state.surname,
    mail: state.mail,
    phone: state.phone,
  })
  emit('created')
  state.date = null
  state.time = null
  state.notes = null
  state.salutation = null
  state.firstname = null
  state.surname = null
  state.mail = null
  state.phone = null
}
</script>

<template>
  <article>
    <ul v-if="null !== cart">
      <li v-for="book in cart" :key="book.id">
        <router-link :to="{ name: 'book.update', params: { id: book.id } }">
          {{ book.title }} - {{ book.price }}
          <span v-if="book.sold"> - {{ $t('sold') }}</span>
          <span v-if="book.removed"> - {{ $t('removed') }}</span>
        </router-link>
      </li>
    </ul>
    <b-form-input type="hidden" id="books" v-model="state.books" />

    <b-form @submit.prevent="create">
      <b-alert type="warning" :style="{ display: 'none' }"
        >Deprecated: Date and Time will be removed soon. Datum und Uhrzeit
        werden bald entfernt.www</b-alert
      >
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

      <b-form-group v-if="state.date" :style="{ display: 'none' }">
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
          <b-button design="primary">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </article>
</template>
