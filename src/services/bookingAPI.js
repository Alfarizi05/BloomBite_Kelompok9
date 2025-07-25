const BASE_URL = "https://kuyxvdwmmfzylecrifao.supabase.co/rest/v1/booking";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1eXh2ZHdtbWZ6eWxlY3JpZmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTY4NzAsImV4cCI6MjA2NzQ5Mjg3MH0.lcTGxdi6MqBBx3Xe9KAspaJnAT7h6Ft8F6UbaLbZoq4";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const bookingAPI = {
  async fetchBookings() {
    const res = await fetch(`${BASE_URL}?select=*,Product(nama,harga)`, {
      headers,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error("Gagal fetch booking: " + error);
    }

    const data = await res.json();

    return data.map((item) => ({
      ...item,
      product_nama: item.Product?.nama || "-",
      product_harga: item.Product?.harga || 0,
      nama_pemesan: item.nama_pemesan || "-",
    }));
  },

  async createBooking(data) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const resultText = await res.text();
    if (!res.ok) {
      console.error("❌ Booking gagal:", resultText);
      throw new Error("Gagal membuat booking: " + resultText);
    }

    return JSON.parse(resultText);
  },

  async deleteBooking(id) {
    const res = await fetch(`${BASE_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error("Gagal menghapus booking: " + err);
    }
  },
};
