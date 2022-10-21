<script setup>
import { useCart } from '@/composables/useCart.js'

const { cart, remove, clean } = useCart()
</script>

<template>
  <b-container size="l" v-if="cart && cart.length >= 1">
    <h2>{{ $t('cart') }} ({{ cart.length }})</h2>

    <ul>
      <li v-for="book in cart" :key="book.id">
        <router-link :to="{ name: 'book.update', params: { id: book.id } }">
          {{ book.title }}
        </router-link>
        <span @click="remove(book)"><b-icon type="close" :size="15" /></span>
      </li>
    </ul>

    <b-button type="button" design="text" @click="clean">
      {{ $t('cleanCart') }}
    </b-button>
    <b-button
      type="button"
      design="text"
      @click="$router.push({ name: 'reservation' })"
    >
      {{ $t('reservate') }}
    </b-button>
  </b-container>
</template>
