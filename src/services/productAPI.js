  import axios from 'axios'

  const API_URL = "https://kuyxvdwmmfzylecrifao.supabase.co/rest/v1/Product"
  const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1eXh2ZHdtbWZ6eWxlY3JpZmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTY4NzAsImV4cCI6MjA2NzQ5Mjg3MH0.lcTGxdi6MqBBx3Xe9KAspaJnAT7h6Ft8F6UbaLbZoq4"

  const headers = {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
  }

  export const productAPI = {
    async fetchProducts() {
      const response = await axios.get(API_URL, { headers })
      return response.data
    },

    async createProduct(data) {
      const response = await axios.post(API_URL, data, { headers })
      return response.data
    },

    async updateProduct(id, data) {
      const url = `${API_URL}?id=eq.${id}`
      const response = await axios.patch(url, data, { headers })
      return response.data
    },

    async deleteProduct(id) {
      const url = `${API_URL}?id=eq.${id}`
      await axios.delete(url, { headers })
    }
    
  }
