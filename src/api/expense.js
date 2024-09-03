import { api } from '@/config'
import { get } from '@/utils/http'

export default {
  getAllExpenses: () => {
    return get({
      url: api.expenses.getAll
    })
  },
  getAllExpenseCategories: () => {
    return get({
      url: api.expenseCategories.getAll
    })
  }
}
