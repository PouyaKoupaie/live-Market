"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
const {theme, setTheme} = useTheme();
  console.log(theme)
  

  return (
    <ThemeSwitcher defaultValue="system" onChange={setTheme}/>
  );
};

