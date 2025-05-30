<script setup>
import { useCart } from '@/composables/useCart.js'

const emit = defineEmits(['nextStep', 'close'])

const { cart, remove, totalSum, isCartEmpty } = useCart()

const closeCart = () => emit('close')
</script>

<template>
  <BContainer size="m" v-if="isCartEmpty">
    <BContainer size="m">
      <p>{{ $t('cart_is_empty') }}</p>
    </BContainer>

    <BContainer size="m">
      <BButton design="outline_wide" @click="closeCart">{{ $t('browse') }}</BButton>
    </BContainer>
  </BContainer>

  <BContainer size="m" v-if="!isCartEmpty">
    <ul class="products">
      <li v-for="article in cart" :key="article.id" class="products_item">
        <RouterLink :to="{ name: 'product', params: { id: article.id } }" class="products_title" @click="closeCart">
          {{ article.title }}
        </RouterLink>

        <div class="products_right">
          <span class="products_price">{{ article.price.toFixed(2) }} €</span>
          <BMaterialIcon hover size="24" @click="remove(article)">close</BMaterialIcon>
        </div>
      </li>
    </ul>
  </BContainer>

  <BContainer size="m" v-if="!isCartEmpty">
    <p class="sum">
      <span class="sum_label">{{ $t('total') }}</span>
      <span class="sum_amount">{{ totalSum.toFixed(2) }} €</span>
    </p>
  </BContainer>

  <BContainer size="m" v-if="!isCartEmpty">
    <BFormGroup buttons>
      <BButton type="button" design="outline_wide" @click.prevent="closeCart" :style="{ marginBottom: '20px' }">
        {{ $t('keep_browsing') }}
      </BButton>
      <BButton design="primary_wide" @click="$emit('nextStep')">{{ $t('continue_to_checkout') }}</BButton>
    </BFormGroup>
  </BContainer>
</template>

<style>
.products {
  list-style: none;
  padding: 0;
  margin: 0;
}

.products_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid var(--color-neutral-02);
}

.products_item:last-child {
  border-bottom: none;
}

.products_title {
  text-decoration: none;
  color: var(--color-neutral-10);
}

.products_title:hover {
  text-decoration: none;
  color: var(--color-neutral-06);
}

.products_right {
  display: flex;
  align-items: center;
}

.products_price {
  color: var(--color-neutral-06);
  margin-right: 20px;
}

.products_remove {
  cursor: pointer;
}

.sum {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--color-neutral-02);
  padding-top: 10px;
  font-size: 0.8rem;
}

.sum_label {
  color: var(--color-neutral-06);
}

.sum_amount {
  font-weight: bold;
  margin-right: 35px;
}
</style>
