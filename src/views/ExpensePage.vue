<script setup>
import { ref, onMounted } from 'vue'
import { useExpenseStore } from '@/stores/expense'
import { roundEpochToDay } from '@/utils/date'

import ExpenseList from '@/components/ExpenseList.vue'
import CurrencyInput from '@/components/CurrencyInput.vue'

const expenseStore = useExpenseStore()

const openAddExpense = ref(false)
const isFetchCategory = ref(false)
const expenses = ref([])
const expenseCategories = ref([])
let previousExpense = null

const formData = ref({
  category: [],
  date: null,
  amount: 0,
  note: ''
})

function toggleAddExpense() {
  openAddExpense.value = !openAddExpense.value
}

function getExpenseCategory() {
  if (expenseStore.expenseCategories) {
    expenseCategories.value = expenseStore.expenseCategories
    return
  }
  fetchCategory()
}

function fetchCategory() {
  if (isFetchCategory.value) {
    return
  }
  expenseStore.getAllExpenseCategories({
    success: fetchCategorySuccess,
    fail: fetchCategoryFailed
  })
  isFetchCategory.value = false
}

function fetchCategorySuccess() {
  expenseCategories.value = expenseStore.expenseCategories
}

function fetchCategoryFailed() {
  console.log('fetch category failed')
}

function fetchExpense() {
  expenseStore.getAllExpenses({
    success: fetchExpenseSuccess,
    fail: fetchExpenseFailed
  })
}

function fetchExpenseSuccess() {
  expenses.value = expenseStore.expenses
}

function fetchExpenseFailed() {
  console.log('fetch expenses failed')
}

function isExpenseWithHeader(expense) {
  let result = true

  if (previousExpense) {
    result = roundEpochToDay(expense.expense_date) !== roundEpochToDay(previousExpense.expense_date)
  }
  previousExpense = expense
  return result
}

function triggerSubmit() {
  console.log(formData.value)
}

onMounted(() => {
  fetchExpense()
  getExpenseCategory()
})
</script>

<template>
  <v-container class="d-flex justify-center">
    <div class="d-flex flex-column justify-center">
      <v-btn :class="openAddExpense ? 'bg-red' : 'bg-green'" @click="toggleAddExpense">{{
        openAddExpense ? 'Cancel' : 'Add Expense'
      }}</v-btn>
      <div class="add-expense-box" v-if="openAddExpense">
        <v-sheet class="mx-auto" width="500">
          <v-form @submit.prevent @submit="triggerSubmit">
            <v-combobox
              label="Select a category"
              v-model="formData.category"
              :items="expenseCategories"
              item-value="id"
              item-title="name"
              :return-object="true"
            />
            <v-date-input
              v-model="formData.date"
              label="Select a date"
              prepend-icon=""
              prepend-inner-icon="$calendar"
            />
            <CurrencyInput v-model="formData.amount" :options="{ currency: 'IDR' }" />
            <v-text-field v-model="formData.note" label="Note" />
            <v-btn type="submit" class="bg-green" block>Add Expense</v-btn>
          </v-form>
        </v-sheet>
      </div>
      <div class="mt-4">
        <expense-list
          v-for="expense in expenses"
          :with-header="isExpenseWithHeader(expense)"
          :key="expense.id"
          :expense="expense"
        ></expense-list>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.add-expense-box {
  margin: 10px 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 8px;
  border-radius: 18px;
}
</style>
