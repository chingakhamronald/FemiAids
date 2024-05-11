import {create} from 'zustand';

export interface IUseStore {
  visible: boolean;
  checkScreen: string;
  scheme: ISchemeData[];
  setSchemeData: (value: string) => void;
  setCheckScreen: (value: string) => void;
  showVisible: (value: boolean) => void;
  hideVisible: (value: boolean) => void;
  removeCheckScreen: () => void;
}

export const useStore = create<IUseStore>(set => ({
  visible: false,
  checkScreen: '',
  scheme: [],
  setSchemeData: (value: any) => set({scheme: value}),
  setCheckScreen: (value: string) => set({checkScreen: value}),
  showVisible: (value: boolean) => set({visible: value}),
  hideVisible: (value: boolean) => set({visible: value}),
  removeCheckScreen: () => set({checkScreen: ''}),
}));

export interface ISchemeData {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
}
