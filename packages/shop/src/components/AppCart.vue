<script setup>
import { useToast } from '@baldeweg/ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReservation } from '@/composables/useReservation.js'
import { useCart } from '@/composables/useCart.js'

const showCart = ref(false)
const showThanks = ref(false)

const { add } = useToast()

const { cart, remove } = useCart()

const { reservation, isCreating, create } = useReservation()

const { t } = useI18n()

reservation.value = {
  books: computed(() => {
    if (cart.value === null) return ''

    let list = []
    cart.value.forEach((element) => {
      list.push(element.id)
    })

    return list.join(',')
  }),
  notes: null,
  salutation: null,
  firstname: null,
  surname: null,
  mail: null,
  phone: null,
}

const reserve = () => {
  create()
    .then(() => {
      showCart.value = false
      showThanks.value = true
    })
    .catch(() => {
      add({
        type: 'error',
        body: t('request_error'),
      })
    })
}
</script>

<template>
  <section>
    <span @click="showCart = true">
      <b-badge :content="cart.length" class="cart">
        <b-icon type="cart" :size="30" />
      </b-badge>
    </span>

    <b-form @submit.prevent="reserve" v-if="showCart" :style="{ margin: '0' }">
      <b-modal :style="{ textAlign: 'left' }" @close="showCart = false">
        <template #title>
          {{ $t('cart') }}
        </template>

        <template #footer>
          <b-form-group buttons v-if="cart.length >= 1">
            <b-button type="button" design="text" v-if="isCreating">
              <b-spinner size="m" />
            </b-button>
            <b-button type="submit" design="primary_wide" v-else>
              {{ $t('reserve') }}
            </b-button>
          </b-form-group>
        </template>

        <b-container size="m" v-if="!cart.length >= 1">
          <p>{{ $t('cart_is_empty') }}</p>
        </b-container>

        <b-container size="m" v-if="cart.length >= 1">
          <ul>
            <li v-for="article in cart" :key="article.id">
              <router-link
                :to="{ name: 'article', params: { id: article.id } }"
              >
                {{ article.title }}
              </router-link>
              <span @click="remove(article)">
                <b-icon type="close" :size="15" />
              </span>
            </li>
          </ul>

          <b-form-group>
            <b-form-item>
              <b-form-label for="salutation">
                {{ $t('salutation') }}
              </b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-select
                id="salutation"
                required
                :items="[
                  { key: 'f', value: $t('mrs') },
                  { key: 'm', value: $t('mr') },
                  { key: 'd', value: $t('none_diverse') },
                ]"
                allow-empty
                v-model="reservation.salutation"
              />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="firstname">{{ $t('firstname') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input
                id="firstname"
                required
                v-model="reservation.firstname"
              />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="surname">{{ $t('surname') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input
                id="surname"
                required
                v-model="reservation.surname"
              />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="mail">{{ $t('mail') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input
                type="email"
                id="mail"
                required
                v-model="reservation.mail"
              />
            </b-form-item>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="phone">{{ $t('phone') }}</b-form-label>
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
        </b-container>
      </b-modal>
    </b-form>

    <b-dialog v-if="showThanks" :style="{ textAlign: 'left' }">
      <template #actions>
        <b-button design="primary" @click.prevent="showThanks = false">
          {{ $t('ok') }}
        </b-button>
      </template>

      {{ $t('request_successful') }}
    </b-dialog>
  </section>
</template>

<style scoped>
.cart {
  cursor: pointer;
}
</style>
