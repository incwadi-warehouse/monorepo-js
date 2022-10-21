<script setup>
defineProps({
  list: Object,
  currency: String,
})
</script>

<template>
  <div v-if="list && currency">
    <table :aria-label="$t('pricelist')">
      <tbody>
        <tr v-if="list.base > 0">
          <th scope="row">{{ $t('baseprice') }}</th>
          <td class="price">{{ list.base }} {{ currency }}</td>
        </tr>

        <tr>
          <th scope="col" colspan="2">{{ $t('releaseYear') }}</th>
        </tr>
        <tr v-for="(price, name) in list.releaseYear" :key="name">
          <th class="property" scope="row">{{ name }}</th>
          <td class="price">{{ price }} {{ currency }}</td>
        </tr>

        <tr>
          <th scope="col" colspan="2">{{ $t('condition') }}</th>
        </tr>
        <tr v-for="(price, name) in list.condition" :key="name">
          <th class="property" scope="row">{{ name }}</th>
          <td class="price">{{ price }} {{ currency }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.property {
  padding-left: 20px;
}
.price {
  text-align: right;
}
</style>
