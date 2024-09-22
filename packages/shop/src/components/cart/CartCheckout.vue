<script setup>
import { useToast } from '@baldeweg/ui'
import { useReservation } from '@/composables/useReservation.js'
import { computed } from 'vue'
import { useCart } from '@/composables/useCart.js'

const emit = defineEmits(['nextStep', 'prevStep'])

const orderInfo = import.meta.env.VITE_ORDER_INFO

const { reservation, isCreating, create } = useReservation()
const { cart } = useCart()
const { add: addToast } = useToast()

reservation.value.books = computed(() => cart.value?.map(element => element.id).join(',') || '')

const reserve = () => {
  create()
    .then(() => emit('nextStep'))
    .catch(() => {
      addToast({
        type: 'error',
        body: t('request_error'),
      })
    })
}

const goBack = () => emit('prevStep')
</script>

<template>
  <BContainer size="m">
    <h3>{{ $t('contact') }}</h3>

    <BForm @submit.prevent="reserve">
      <BFormGroup>
        <BFormItem>
          <BFormLabel for="salutation">
            {{ $t('salutation') }}
          </BFormLabel>
        </BFormItem>
        <BFormItem>
          <BFormSelect
            id="salutation"
            required
            :items="[
              { key: 'f', value: $t('mrs') },
              { key: 'm', value: $t('mr') },
              { key: 'd', value: $t('none_diverse') },
            ]"
            allow-empty
            v-model="reservation.salutation"
          />
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
        <BButton type="button" design="outline_wide" @click.prevent="goBack">
          {{ $t('back') }}
        </BButton>
      </BFormGroup>

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
</template>
