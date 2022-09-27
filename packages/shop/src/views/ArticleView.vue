<script setup>
import { useTitle } from '@baldeweg/ui'
import { find } from 'lodash'
import { computed } from 'vue'
import { useArticle } from '@/composables/useArticle.js'
import { useCart } from '@/composables/useCart.js'

useTitle({ title: 'Article' })

const props = defineProps({
  id: String,
})

const { article, show, formatPrice, formatAuthor, image } = useArticle()

show(props.id)

const { cart, add: add } = useCart()

const isInCart = computed(() => {
  return find(cart.value, (item) => {
    return item.id === props.id
  })
})
</script>

<template>
  <div v-if="article">
    <b-container size="m">
      <b-button
        design="primary"
        class="cta"
        @click="add(article)"
        v-if="!isInCart && article.branchCart"
        >{{ $t('reserve') }}</b-button
      >
      <b-button
        design="outline"
        disabled
        class="cta"
        v-if="isInCart && article.branchCart"
        >{{ $t('added_to_cart') }}</b-button
      >

      <h2 :style="{ wordBreak: 'initial', hyphens: 'auto' }">
        {{ article.title }}
      </h2>
      <p v-if="article.subtitle">{{ article.subtitle }}</p>

      <p v-if="article.authorSurname || article.authorFirstname">
        {{ $t('by') }}
        {{ formatAuthor(article.authorFirstname, article.authorSurname) }}
      </p>
    </b-container>

    <b-container size="m">
      <div class="article">
        <div class="image">
          <b-container size="m" v-if="article">
            <img
              :src="image(article.id, '400x400')"
              width="400"
              :alt="article.title"
            />
          </b-container>
        </div>

        <div class="details">
          <b-container size="m" v-if="article.shortDescription">
            <p class="wrap">{{ article.shortDescription }}</p>
          </b-container>

          <b-container size="m" v-if="article">
            <p>
              {{ $t('price') }}: {{ formatPrice(article.price) }}
              {{ article.currency }}
            </p>
            <p>{{ $t('genre') }}: {{ article.genre }}</p>
            <p>{{ $t('releaseYear') }}: {{ article.releaseYear }}</p>
            <p>
              {{ $t('format') }}:
              {{ article.format_name }}
            </p>
            <p v-if="article.cond">{{ $t('condition') }}: {{ article.cond }}</p>
          </b-container>

          <b-container size="m">
            <p class="wrap">{{ article.branchOrdering }}</p>
          </b-container>
        </div>
      </div>
    </b-container>
  </div>
</template>

<style scoped>
.cta {
  float: right;
  margin-top: 10px;
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
