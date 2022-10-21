<script setup>
import { computed, reactive, toRefs } from 'vue'
import BookPriceCalculator from '@/components/book/BookPriceCalculator.vue'
import { useGenre } from '@/composables/useGenre.js'
import { useCondition } from '@/composables/useCondition.js'
import { useFormat } from '@/composables/useFormat.js'
import { useTag } from '@/composables/useTag.js'
import { useBook } from '@/composables/useBook.js'

const props = defineProps({
  me: Object,
})

const emit = defineEmits(['close'])

const { me } = toRefs(props)

const state = reactive({
  added: null,
  title: null,
  shortDescription: null,
  authorFirstname: '',
  authorSurname: null,
  genreId: null,
  price: '2.50',
  sold: false,
  removed: false,
  releaseYear: new Date().getFullYear(),
  cond_id: null,
  tags: [],
  tag: null,
  format: null,
  subtitle: null,
})

let date = new Date()
state.added = date.toISOString().split('T')[0]

const { genres } = useGenre()
const { conditions } = useCondition()
const { formats } = useFormat()
const { create: createNewTag, removeTag } = useTag()

const pricelist = computed(() => {
  return me.value ? JSON.parse(me.value.branch.pricelist) : null
})

const { create: createBook } = useBook()

const create = () => {
  let tags = []
  state.tags.forEach((element) => {
    tags.push(element.id)
  })
  createBook({
    added: new Date(state.added).getTime() / 1000,
    title: state.title,
    shortDescription: state.shortDescription,
    author: state.authorSurname + ',' + state.authorFirstname,
    genre: state.genreId,
    price: state.price,
    sold: false,
    removed: false,
    releaseYear: state.releaseYear,
    cond: state.cond_id,
    tags: tags,
    format: state.format,
    subtitle: state.subtitle,
  }).then(() => {
    emit('close')

    reset()
  })
}

const reset = () => {
  state.added = null
  state.title = null
  state.shortDescription = null
  state.authorFirstname = ''
  state.authorSurname = null
  state.genreId = null
  state.price = '2.50'
  state.sold = false
  state.removed = false
  state.releaseYear = new Date().getFullYear()
  state.cond_id = null
  state.tags = []
  state.tag = null
  state.format = null
  state.subtitle = null

  let date = new Date()
  state.added = date.toISOString().split('T')[0]
}

const createTag = () => {
  createNewTag({ name: state.tag }).then((res) => {
    state.tags.push(res.data)
    state.tag = null
  })
}
</script>

<template>
  <b-form @submit.prevent="create">
    <b-modal @close="$emit('close', $event)" close-button>
      <template #title>
        <b-icon type="plus" :size="15" no-hover /> {{ $t('catalog') }}
      </template>

      <template #footer>
        <b-form-group buttons>
          <b-form-item>
            <b-button
              design="text"
              type="button"
              @click="reset"
              :style="{ marginRight: '20px' }"
              >{{ $t('reset') }}
            </b-button>
            <b-button design="primary">
              {{ $t('add') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </template>

      <b-container size="m">
        <!-- genre -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="genre">
              {{ $t('genre') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select
              id="genre"
              required
              v-model="state.genreId"
              :items="genres"
              item-key="id"
              item-value="name"
              allow-empty
            />
          </b-form-item>
        </b-form-group>

        <!-- title -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="title">
              {{ $t('title') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="title"
              maxlength="255"
              required
              v-model="state.title"
            />
          </b-form-item>
        </b-form-group>

        <!-- subtitle -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="subtitle">
              {{ $t('subtitle') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="subtitle"
              maxlength="255"
              v-model="state.subtitle"
            />
          </b-form-item>
        </b-form-group>

        <!-- short description -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="shortDescription">
              {{ $t('shortDescription') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-textarea
              type="text"
              id="shortDescription"
              :rows="5"
              v-model="state.shortDescription"
            />
          </b-form-item>
        </b-form-group>

        <!-- firstname -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="authorFirstname">
              {{ $t('firstname') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="authorFirstname"
              maxlength="255"
              v-model="state.authorFirstname"
            />
          </b-form-item>
        </b-form-group>

        <!-- surname -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="authorSurname">
              {{ $t('surname') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="authorSurname"
              maxlength="255"
              required
              v-model="state.authorSurname"
            />
          </b-form-item>
        </b-form-group>

        <!-- release year -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="author">
              {{ $t('release_year') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="author"
              min="1000"
              max="9999"
              required
              v-model="state.releaseYear"
            />
          </b-form-item>
        </b-form-group>

        <!-- format -->
        <b-form-group v-if="formats">
          <b-form-item>
            <b-form-label for="format">
              {{ $t('format') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select
              id="type"
              v-model="state.format"
              :items="formats"
              item-key="id"
              item-value="name"
              allow-empty
            />
          </b-form-item>
        </b-form-group>

        <!-- price -->
        <b-form-group v-if="me">
          <b-form-item>
            <b-form-label for="price">
              {{ $t('price') }}
              <span v-if="me">({{ me.branch.currency }})</span>
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="price"
              :step="me.branch.steps"
              pattern="^\d+(\.|,)?\d{0,2}$"
              required
              v-model="state.price"
              v-if="me.branch && me.branch.steps > 0"
            />
            <b-form-input
              type="text"
              id="price"
              pattern="^\d+(\.|,)?\d{0,2}$"
              required
              v-model="state.price"
              v-else
            />
          </b-form-item>
        </b-form-group>

        <details v-if="me">
          <summary>{{ $t('pricelist') }}</summary>
          <BookPriceCalculator
            :list="pricelist"
            :currency="me.branch.currency"
          />
        </details>

        <!-- added -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="added">
              {{ $t('added') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="date" id="added" v-model="state.added" />
          </b-form-item>
        </b-form-group>

        <!-- condition -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="cond">
              {{ $t('condition') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select
              id="cond"
              v-model="state.cond_id"
              :items="conditions"
              item-key="id"
              item-value="name"
              allow-empty
            />
          </b-form-item>
        </b-form-group>

        <!-- tags -->
        <b-form @submit.prevent="createTag">
          <b-form-group>
            <span v-for="(item, index) in state.tags" :key="item.id">
              {{ item.name }}
              <span @click="removeTag(item.id)">
                <b-icon type="close" :size="12" />
              </span>
              <span v-if="index !== item.length - 1">, </span>
            </span>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="tag">{{ $t('add_tag') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input type="text" id="tag" v-model="state.tag" />
            </b-form-item>
          </b-form-group>

          <b-form-group buttons>
            <b-button design="outline">{{ $t('add_tag') }}</b-button>
          </b-form-group>
        </b-form>
      </b-container>
    </b-modal>
  </b-form>
</template>
