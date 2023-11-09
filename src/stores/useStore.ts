'use client';
import { create } from 'zustand';
import cachedKeys from 'constants/cachedKeys';
import { languages } from 'i18nOptions';

export type AllQueryKeys = keyof typeof cachedKeys;

const useStore = create<{ [key: string]: any }>((set) => ({
  state: {
    languagesArr: languages,
  },
  save: (key: AllQueryKeys, value: any) => {
    return set((rootState) => ({
      state: {
        ...rootState.state,
        [key]: value,
      },
    }));
  },
}));

export const useSave = () => useStore((rootState) => rootState.save);
export const useGet = (key: AllQueryKeys) => useStore((rootState) => rootState.state?.[key]);
export default useStore;
