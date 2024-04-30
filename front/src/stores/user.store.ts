import { create } from "zustand";
//# 어떤상태에도 사용할수 있는 role(역할/권한)

interface UserStore {
    loginUserId: string,
    setLoginUserId: (loginUserId: string) => void,
    loginUserRole: string,
    setloginUserRole: (loginUserRole: string) => void, 
}

const useUserStore = create<UserStore>(set => ({
    loginUserId: '',
    setLoginUserId: (loginUserId: string) => set(state => ({...state, loginUserId})),
    loginUserRole: '',
    setloginUserRole: (loginUserRole: string) => set(state => ({ ...state, loginUserRole }))
}));

export default useUserStore