import axios from 'axios'

const API_URL = "https://kuyxvdwmmfzylecrifao.supabase.co/rest/v1/ourteam"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1eXh2ZHdtbWZ6eWxlY3JpZmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTY4NzAsImV4cCI6MjA2NzQ5Mjg3MH0.lcTGxdi6MqBBx3Xe9KAspaJnAT7h6Ft8F6UbaLbZoq4"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
}

export const ourTeamAPI = {
  async fetchAll() {
    const res = await axios.get(API_URL, { headers });
    return res.data;
  },

  async create(data) {
    const res = await axios.post(API_URL, data, { headers });
    return res.data;
  },

  async update(id, data) {
    const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return res.data;
  },

  async remove(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  }
}
