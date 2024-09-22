<script setup>
import { useCart } from '@/composables/useCart.js'

const { cart, remove, totalSum } = useCart()
</script>

<template>
  <BContainer size="m">
    <h3>{{ $t('products') }}</h3>
  </BContainer>

  <BContainer size="m">
    <ul class="products">
      <li v-for="article in cart" :key="article.id" class="products_item">
        <RouterLink :to="{ name: 'product', params: { id: article.id } }" class="products_title">
          {{ article.title }}
        </RouterLink>

        <div class="products_right">
          <span class="products_price">{{ article.price }} €</span>
          <span @click="remove(article)" class="products_remove">
            <BIcon type="close" :size="15" />
          </span>
        </div>
      </li>
    </ul>
  </BContainer>

  <BContainer size="m">
    <p class="sum">
      <span class="sum_label">{{ $t('sum') }}</span>
      <span class="sum_amount">{{ totalSum }} €</span>
    </p>
  </BContainer>

  <BContainer size="m">
    <BFormGroup buttons >
      <BButton design="primary_wide" @click="$emit('nextStep')">{{ $t('continue_to_checkout')}}</BButton>
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
  border-top: 1px solid var(--color-neutral-04);
  border-bottom: 1px solid var(--color-neutral-04);
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
