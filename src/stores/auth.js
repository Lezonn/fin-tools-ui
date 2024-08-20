import { defineStore } from 'pinia'
import api from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwt') || null,
    isAuthenticated: !!localStorage.getItem('jwt')
  }),
  actions: {
    async login({ queryParams, success, fail }) {
      try {
        const res = await api.login(queryParams)

        const token = res.data.token
        this.token = token
        this.isAuthenticated = true
        localStorage.setItem('jwt', token)

        success && success(res)
      } catch (err) {
        fail && fail(err)
      }
    },
    logout() {
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('jwt')
    },
    checkAuthentication() {
      const token = localStorage.getItem('jwt')
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const isExpired = payload.exp * 1000 < Date.now()
        if (isExpired) {
          this.logout()
        } else {
          this.token = token
          this.isAuthenticated = true
        }
      } else {
        this.isAuthenticated = false
      }
    }
  }
})
