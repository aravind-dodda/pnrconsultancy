import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const usePersistantStore = create(
    persist(set => ({
        user: null,

        setUser: (data) => set(state => {
            state.user = data
        })
    }), {
        name: 'persisted', // unique name
    })
)

export default usePersistantStore