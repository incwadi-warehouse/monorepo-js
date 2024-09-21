<script setup>
import { useToast } from '@baldeweg/ui'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReservation } from '@/composables/useReservation.js'
import { useCart } from '@/composables/useCart.js'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible'])

const handleClose = () => {
  emit('update:visible', false)
}

const showCart = ref(false)
const showThanks = ref(false)

const { add } = useToast()

const { cart, remove, add: addCart } = useCart()

addCart({ id: 1, title: "book", price: 1 })

const totalSum = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price, 0);
})

const isCartEmpty = computed(() => {
  return cart.value.length === 0
})

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

const orderInfo = import.meta.env.VITE_ORDER_INFO
</script>

<template>
  <BPanel visible v-if="visible" position="right" @close="handleClose">
    <BContainer size="m">
      <h2>{{ $t('cart') }}</h2>
    </BContainer>

    <!-- Empty Cart -->
    <BContainer size="m" v-if="isCartEmpty">
      <p>{{ $t('cart_is_empty') }}</p>
    </BContainer>

    <!-- Carts Content -->
    <BContainer size="m" v-if="!isCartEmpty">
      <h3>{{ t('products') }}</h3>

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

      <p class="sum">
        <span class="sum_label">{{ t('sum') }}</span>
        <span class="sum_amount">{{ totalSum }} €</span>
      </p>

    </BContainer>

    <!-- Checkout Form -->
    <BContainer size="m" v-if="!isCartEmpty">
      <h3>{{ t('contact') }}</h3>
      <BForm @submit.prevent="reserve">
        <BFormGroup>
          <BFormItem>
            <BFormLabel for="salutation">
              {{ $t('salutation') }}
            </BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormSelect id="salutation" required :items="[
              { key: 'f', value: $t('mrs') },
              { key: 'm', value: $t('mr') },
              { key: 'd', value: $t('none_diverse') },
            ]" allow-empty v-model="reservation.salutation" />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="firstname">{{ $t('firstname') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput id="firstname" required v-model="reservation.firstname" />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="surname">{{ $t('surname') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput id="surname" required v-model="reservation.surname" />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="mail">{{ $t('mail') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput type="email" id="mail" required v-model="reservation.mail" />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="phone">{{ $t('phone') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormInput type="tel" id="phone" v-model="reservation.phone" />
          </BFormItem>
        </BFormGroup>

        <BFormGroup>
          <BFormItem>
            <BFormLabel for="notes">{{ $t('notes') }}</BFormLabel>
          </BFormItem>
          <BFormItem>
            <BFormTextarea id="notes" v-model="reservation.notes" />
          </BFormItem>
        </BFormGroup>

        <p v-if="orderInfo">{{ orderInfo }}</p>

        <BFormGroup buttons>
          <BButton type="button" design="text" v-if="isCreating">
            <BSpinner size="m" />
          </BButton>
          <BButton type="submit" design="primary_wide" v-else>
            {{ $t('reserve') }}
          </BButton>
        </BFormGroup>
      </BForm>
    </BContainer>
  </BPanel>

  <!-- Thanks -->
  <BDialog v-if="showThanks" :style="{ textAlign: 'left' }">
    <template #actions>
      <BButton design="primary" @click.prevent="showThanks = false">
        {{ $t('ok') }}
      </BButton>
    </template>

    {{ $t('request_successful') }}
  </BDialog>
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
