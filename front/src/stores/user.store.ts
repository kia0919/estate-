import { create } from "zustand";
//# 어떤상태에도 사용할수 있는 role

interface UserStore {
    role: string,
    setRole: (role: string) => void, 
}

const useUserStore = create<UserStore>(set => ({
    role: '',
    setRole: (role: string) => set(state => ({ ...state, role }))
}));

export default useUserStore