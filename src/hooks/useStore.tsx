import {create} from 'zustand';

export interface IUseStore {
  visible: boolean;
  checkScreen: string;
  category: any;
  setCheckScreen: (value: string) => void;
  showVisible: (value: boolean) => void;
  hideVisible: (value: boolean) => void;
  setCategory: (value: string) => void;
  removeCheckScreen: () => void;
}

export const useStore = create<IUseStore>(set => ({
  visible: false,
  checkScreen: '',
  category: 'All Data',
  setCheckScreen: (value: string) => set({checkScreen: value}),
  showVisible: (value: boolean) => set({visible: value}),
  hideVisible: (value: boolean) => set({visible: value}),
  setCategory: (value: string) => set({category: value}),
  removeCheckScreen: () => set({checkScreen: ''}),
}));
