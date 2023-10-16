import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
  state: () => ({
    responseData: null
  }),
  actions: {
    setResponseData(data) {
      this.responseData = data
    }
  }
})
