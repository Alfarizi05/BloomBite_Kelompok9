import axios from 'axios'

const API_URL = "https://bqcgqbcupuaikyfvrejp.supabase.co/rest/v1/notes"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxY2dxYmN1cHVhaWt5ZnZyZWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NzQxMDMsImV4cCI6MjA2NTM1MDEwM30.Gbe-JDrt4N_Px_QLcmoQfj1I5_f-swY5_Sy2MEH-zzs"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    async deleteNote(id) {
        const url = `${API_URL}?id=eq.${id}`
        await axios.delete(url, { headers })
    },

    async updateNote(id, data) {
        const url = `${API_URL}?id=eq.${id}`
        const response = await axios.patch(url, data, { headers })
        return response.data
    }
}
