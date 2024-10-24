<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchCheckboxFilter from '@/components/find/FindCheckboxFilter.vue'
import { useGenre } from '@/composables/useGenre.js'
import CartPanel from '@/components/cart/CartPanel.vue'
import { useCart } from '@/composables/useCart.js'

const router = useRouter()
const { genres } = useGenre()

const term = ref('')
const genre = ref(null)

const find = () => {
  router.push({
    name: 'find',
    query: { term: term.value, genre: genre.value },
  })
}

const { cart } = useCart()
const isCartVisible = ref(false)
</script>

<template>
  <div class="toolbar">
    <BContainer size="m">
      <div class="toolbar_inner">
        <div class="toolbar_item">
          <SearchCheckboxFilter :items="genres" fieldKey="id" fieldValue="name" :title="$t('genres')" v-model="genre"
            @update:modelValue="find" />
        </div>

        <div class="toolbar_item">
          <span @click="isCartVisible = true">
            <BBadge :content="cart.length" class="cart">
              <BMaterialIcon hover size="32">shopping_cart</BMaterialIcon>
            </BBadge>
          </span>
        </div>
      </div>
    </BContainer>
  </div>

  <CartPanel v-model:visible="isCartVisible" />
</template>

<style scope>
.toolbar {
  border-bottom: 1px solid var(--color-neutral-02);
}

.toolbar_inner {
  display: flex;
  justify-content: space-between;
}
</style>
