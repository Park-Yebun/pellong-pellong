import { create } from 'zustand'

interface UserInfo {
    memberId: number;
    email: string;
    nickname: string;
    profileImg: string;
}

interface Store {
    loginUserInfo?: UserInfo;
    isLogin: boolean;
    setLoginUserInfo: (info: UserInfo | undefined) => void;
}

const useStore = create<Store>((set) => ({
    loginUserInfo: undefined,
    isLogin: false,
    setLoginUserInfo: (userInfo: UserInfo | undefined) => {
        set({
            loginUserInfo: userInfo,
            isLogin: userInfo !== undefined // userInfo가 undefined가 아니면 true, 그렇지 않으면 false
        });
    }
}));

export default useStore;