<script setup>
import { computed } from 'vue'
import { getDayString } from '@/utils/date'

const props = defineProps({
  expense: Object,
  withHeader: Boolean
})

const title = computed(() => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  })

  const expenseAmount = formatter.format(props.expense.amount)

  return expenseAmount
})

const header = computed(() => {
  const date = new Date(props.expense.expense_date * 1000)
  console.log(date.getDate())
  return date.getDate() + '/' + date.getUTCMonth() + ' - ' + getDayString(date)
})
</script>

<template>
  <div :class="withHeader ? 'mt-4' : 'mt-2'">
    <v-card class="bg-blue" v-if="withHeader" :title="header" />
    <v-card
      class="card mt-1"
      :title="title"
      :subtitle="expense.expense_category_name"
      :text="expense.note"
    />
  </div>
</template>

<style scoped>
.card {
  width: 500px;
}
</style>
