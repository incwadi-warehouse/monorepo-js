<script setup>
import { useTitle } from '@baldeweg/ui'
import { find } from 'lodash'
import { computed } from 'vue'
import { useProduct } from '@/composables/useProduct.js'
import { useCart } from '@/composables/useCart.js'

useTitle({ title: 'Article' })

const props = defineProps({
  id: String,
})

const { article, show, formatPrice, formatAuthor, image } = useProduct()

show(props.id)

const { cart, add } = useCart()

const isInCart = computed(() => {
  return find(cart.value, (item) => {
    return item.id === props.id
  })
})
</script>

<template>
  <div v-if="article">
    <BContainer size="m">
      <BButton design="primary" class="cta" @click="add(article)" v-if="!isInCart && article.branchCart">{{
        $t('reserve') }}</BButton>
      <div class="cta" v-if="isInCart && article.branchCart">
        <BButton design="outline" disabled>{{ $t('added_to_cart') }}</BButton>
        <p>
          <RouterLink :to="{ name: 'home' }">
            {{ $t('continue_browsing') }}
          </RouterLink>
        </p>
      </div>

      <h2 :style="{ wordBreak: 'initial', hyphens: 'auto' }">
        {{ article.title }}
      </h2>
      <p v-if="article.subtitle">{{ article.subtitle }}</p>

      <p v-if="article.authorSurname || article.authorFirstname">
        {{ $t('by') }}
        {{ formatAuthor(article.authorFirstname, article.authorSurname) }}
      </p>
    </BContainer>

    <BContainer size="m">
      <div class="article">
        <div class="image">
          <BContainer size="m" v-if="article">
            <img :src="image(article.id, '400x400')" width="400" :alt="article.title" />
          </BContainer>
        </div>

        <div class="details">
          <BContainer size="m" v-if="article.shortDescription">
            <p class="wrap">{{ article.shortDescription }}</p>
          </BContainer>

          <BContainer size="m" v-if="article">
            <p>
              {{ $t('price') }}: {{ formatPrice(article.price) }}
              {{ article.currency }}
            </p>
            <p>{{ $t('genre') }}: {{ article.genre }}</p>
            <p>
              {{ $t('releaseYear') }}:
              {{
                article.releaseYear ? article.releaseYear : $t('without_year')
              }}
            </p>
            <p>
              {{ $t('format') }}:
              {{ article.format_name }}
            </p>
            <p v-if="article.cond">{{ $t('condition') }}: {{ article.cond }}</p>
          </BContainer>

          <BContainer size="m">
            <p class="wrap">{{ article.branchOrdering }}</p>
          </BContainer>
        </div>
      </div>
    </BContainer>
  </div>
</template>

<style scoped>
.cta {
  float: right;
  margin-top: 10px;
  text-align: right;
}

.image {
  width: 200px;
}

.wrap {
  white-space: pre-wrap;
}

@media all and (min-width: 600px) {
  .article {
    display: flex;
  }

  .image {
    width: 33%;
    box-sizing: border-box;
  }

  .details {
    flex-grow: 1;
  }
}
</style>
