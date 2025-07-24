import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("sayhello-theme")||"halloween",
  setTheme:(theme)=>{
    localStorage.setItem("sayhello-theme",theme)
    set({theme})
}
}))