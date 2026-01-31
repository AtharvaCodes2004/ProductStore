import {create} from "zustand"

export const useThemeStore = create((set)=>({
    theme:localStorage.getItem("preferredTheme")||"forest",
    setTheme: (theme)=>{
        localStorage.setItem("preferredTheme", theme)
        set({theme})
    }
}))