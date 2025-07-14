import { create } from 'zustand';

interface UserStore {
  currentUser: any;  
  setCurrentUser: (user: any) => void;
}

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));

export default useUserStore;
