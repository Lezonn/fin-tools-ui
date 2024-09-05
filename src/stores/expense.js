import { defineStore } from 'pinia'
import api from '@/api/expense'

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: null,
    expenseCategories: null
  }),
  actions: {
    async getAllExpenses({ success, fail }) {
      try {
        const res = await api.getAllExpenses()
        this.expenses = res.data
        success && success()
      } catch (err) {
        fail && fail(err)
      }
    },
    async getAllExpenseCategories({ success, fail }) {
      try {
        const res = await api.getAllExpenseCategories()
        this.expenseCategories = res.data
        success && success()
      } catch (err) {
        fail && fail(err)
      }
    }
  }
})
