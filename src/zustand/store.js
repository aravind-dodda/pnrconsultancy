import { create } from 'zustand'

const useStore = create(set => ({
    count: 1,
    list: [],

    inc: () => set(state => ({ count: state.count + 1 })),
    setList: () => set(state => {
        // 
    })
}))

export default useStore