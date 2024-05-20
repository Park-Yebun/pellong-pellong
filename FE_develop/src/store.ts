import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserInfo {
    memberId: number;
    nickname: String;
    email: String;
    profileImg: String;
}

interface Store {
    loginUserInfo?: UserInfo;
    isLogin: boolean;
    setLoginUserInfo: (info: UserInfo | undefined) => void;
}

const useStore = create(
    persist<Store>(
      (set, get) => ({
        loginUserInfo: undefined,
        isLogin: false,
        setLoginUserInfo: (userInfo: UserInfo | undefined) => {
            set({
                loginUserInfo: userInfo,
                isLogin: userInfo !== undefined
            });
        },
      }),
      {
        name: "user-store",
      },
    ),
  );


export default useStore;