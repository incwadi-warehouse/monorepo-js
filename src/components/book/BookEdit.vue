<script setup>
import { onMounted, reactive, computed, toRefs, watch, ref } from 'vue'
import { remove as _remove } from 'lodash'
import router from './../../router'
import { useGenre } from '@/composables/useGenre.js'
import { useCondition } from '@/composables/useCondition.js'
import { useFormat } from '@/composables/useFormat.js'
import { useTag } from '@/composables/useTag.js'
import { useBook } from '@/composables/useBook.js'
import DirectoryList from '@/components/directory/DirectoryList.vue'
import BookPriceCalculator from '@/components/book/BookPriceCalculator.vue'

const props = defineProps({
  bookId: String,
  me: Object,
})

const emit = defineEmits(['close'])

const { genres } = useGenre()
const { conditions } = useCondition()
const { formats } = useFormat()
const { create: createNewTag } = useTag()
const {
  book,
  show,
  update: updateBook,
  upload: uploadCover,
  getCover,
  removeCover,
  cover: bookCover,
} = useBook()

let state = reactive({
  added: null,
  title: null,
  shortDescription: null,
  authorFirstname: null,
  authorSurname: null,
  genreId: null,
  price: null,
  sold: null,
  removed: null,
  reserved: null,
  releaseYear: null,
  cond_id: null,
  tag: null,
  tags: [],
  recommendation: null,
  hasErrorUploading: false,
  isDragging: false,
  format: null,
})

const loadBook = () => {
  show(bookId.value).then(() => {
    state.added = formatDate(book.value.added)
    state.title = book.value.title
    state.shortDescription = book.value.shortDescription
    state.authorFirstname = book.value.author
      ? book.value.author.firstname
      : null
    state.authorSurname = book.value.author ? book.value.author.surname : null
    state.genreId = book.value.genre ? book.value.genre.id : null
    state.price = book.value.price
    state.sold = book.value.sold
    state.removed = book.value.removed
    state.reserved = book.value.reserved
    state.releaseYear = book.value.releaseYear
    state.cond_id = book.value.condition ? book.value.condition.id : null
    state.tag = null
    state.tags = book.value.tags
    state.recommendation = book.value.recommendation
    state.format = book.value.format ? book.value.format.id : null
    state.subtitle = book.value.subtitle
  })
}

const { bookId } = toRefs(props)
loadBook()
watch(
  () => bookId.value,
  () => {
    loadBook()
  }
)

const update = () => {
  let tags = []
  state.tags.forEach((element) => {
    tags.push(element.id)
  })

  updateBook({
    me: state.me,
    id: bookId.value,
    params: {
      added: new Date(state.added).getTime() / 1000,
      title: state.title,
      shortDescription: state.shortDescription,
      author: state.authorSurname + ',' + state.authorFirstname,
      genre: state.genreId,
      price: state.price,
      sold: state.sold,
      removed: state.removed,
      reserved: state.reserved,
      releaseYear: state.releaseYear,
      cond: state.cond_id,
      tags: tags,
      recommendation: state.recommendation,
      format: state.format,
      subtitle: state.subtitle,
    },
  })

  emit('close')
  router.push({ name: 'search' })
}

const formatDate = (val) => {
  let date = new Date(val * 1000)

  return date.toISOString().split('T')[0]
}

const cover = computed(() => {
  return bookCover.value
})

onMounted(() => {
  getCover(bookId.value)
})

watch(
  () => props.isUploading,
  () => {
    getCover(bookId.value)
  }
)

const isUploading = ref(false)

const upload = (event) => {
  const file = event.target.files[0]
  const form = new FormData()
  form.append('cover', file)

  isUploading.value = true
  uploadCover({ id: bookId.value, form: form }).then(() => {
    isUploading.value = false
    getCover(bookId.value)
  })
}

const tab = ref('upload')

const { me } = toRefs(props)

const pricelist = computed(() => {
  return me.value ? JSON.parse(me.value.branch.pricelist) : null
})

const createTag = (item) => {
  createNewTag(item).then((res) => {
    state.tags.push(res.data)
    state.tag = ''
  })
}

const removeTag = (id) => {
  _remove(state.tags, (item) => {
    return id === item.id
  })
  state.tags = Object.assign([], state.tags)
}
</script>

<template>
  <b-form
    @submit.prevent="update"
    v-if="
      book &&
      genres.length >= 1 &&
      formats.length >= 1 &&
      conditions.length >= 1
    "
  >
    <b-modal @close="$emit('close')" close-button>
      <b-container size="m" v-if="book.reserved">
        <b-alert type="warning">
          <p>{{ $t('doNotEditReservedBooks') }}</p>
        </b-alert>
      </b-container>

      <template #title>
        {{ $t('edit_book') }}
      </template>

      <template #footer>
        <b-form-group>
          <b-form-item>
            <b-button design="primary_wide">
              {{ $t('update') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </template>

      <b-container size="m" v-if="book">
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
              :rows="4"
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
            <b-form-label for="releaseYear">
              {{ $t('release_year') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="releaseYear"
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
        <b-form-group>
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
              v-if="me && me.branch.steps > 0"
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

        <!-- sold -->
        <b-form-group>
          <b-form-item>
            <input type="checkbox" name="sold" id="sold" v-model="state.sold" />
            <b-form-label for="sold">
              {{ $t('sold') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>

        <!-- removed -->
        <b-form-group>
          <b-form-item>
            <input
              type="checkbox"
              name="removed"
              id="removed"
              v-model="state.removed"
            />
            <b-form-label for="removed">
              {{ $t('removed') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>

        <!-- reserved -->
        <b-form-group>
          <b-form-item>
            <input
              type="checkbox"
              name="reserved"
              id="reserved"
              v-model="state.reserved"
            />
            <b-form-label for="reserved">
              {{ $t('reserved') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>

        <!-- recommendation -->
        <b-form-group>
          <b-form-item>
            <input
              type="checkbox"
              name="recommendation"
              id="recommendation"
              v-model="state.recommendation"
            />
            <b-form-label for="recommendation">
              {{ $t('recommendation') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>

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
        <b-form @submit.prevent="createTag({ name: state.tag })">
          <b-form-group>
            <span v-for="(item, index) in state.tags" :key="item.id">
              {{ item.name }}
              <span @click="removeTag(item.id)">
                <b-icon type="close" :size="12" />
              </span>
              <span v-if="index !== state.tags.length - 1">, </span>
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

        <!-- cover -->
        <div v-if="cover">
          <!-- status -->
          <b-alert type="neutral" v-if="isUploading">
            <p>{{ $t('uploadingFile') }}</p>
          </b-alert>
          <b-alert type="error" hidable v-if="state.hasErrorUploading">
            <p>{{ $t('coverUploadError') }}</p>
          </b-alert>

          <div v-if="cover.cover_s || cover.cover_m || cover.cover_l">
            <!-- remove -->
            <b-button
              type="button"
              design="outline_danger"
              @click="removeCover(bookId)"
              :style="{ float: 'right' }"
            >
              {{ $t('removeCover') }}
            </b-button>

            <!-- show -->
            <img :src="cover.cover_m" alt="Cover" />
          </div>

          <div v-else>
            <!-- tabs -->
            <div class="tabs">
              <ul>
                <li @click="tab = 'upload'">{{ $t('upload') }}</li>
                <li @click="tab = 'file-manager'">
                  {{ $t('directory') }} (Experiment)
                </li>
              </ul>
            </div>

            <!-- upload -->
            <b-form
              enctype="multipart/form-data"
              @submit.prevent
              v-if="!isUploading && tab == 'upload'"
            >
              <b-form-group>
                <b-form-item>
                  <b-form-label for="cover">{{ $t('cover') }}</b-form-label>
                </b-form-item>
                <b-form-item
                  :style="{
                    position: 'relative',
                    height: '300px',
                    border: state.isDragging
                      ? '1px solid var(--color-primary-10)'
                      : '1px solid var(--color-neutral-02)',
                    borderRadius: '5px',
                  }"
                >
                  <p
                    :style="{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '100%',
                      textAlign: 'center',
                    }"
                  >
                    {{ $t('drop_the_file_in_this_area_or_click_here') }}
                  </p>
                  <div
                    :style="{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }"
                    @dragover="state.isDragging = true"
                    @dragenter="state.isDragging = true"
                    @dragleave="state.isDragging = false"
                    @dragend="state.isDragging = false"
                    @drop="state.isDragging = false"
                  >
                    <b-form-input
                      type="file"
                      id="cover"
                      @change="upload($event)"
                      event
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                      :style="{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: '0.001',
                      }"
                    />
                  </div>
                </b-form-item>
              </b-form-group>
            </b-form>

            <!-- directory -->
            <DirectoryList
              :id="bookId"
              @update="getCover(bookId)"
              v-if="tab == 'file-manager'"
              @desc="state.shortDescription = $event"
            />
          </div>
        </div>
      </b-container>
    </b-modal>
  </b-form>
</template>

<style scoped>
.tabs {
  margin: 10px 0;
  overflow: auto;
}
.tabs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tabs li {
  float: left;
  background: var(--color-neutral-02);
  border-radius: 10px;
  padding: 10px;
  margin-right: 20px;
  cursor: pointer;
}
</style>
