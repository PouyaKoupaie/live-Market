"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { useCircleTheme } from "@/shared/theme/hooks/use-circle-theme";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme } = useTheme();
  const { changeTheme } = useCircleTheme();

  return (
    <ThemeSwitcher
      value={theme as "light" | "dark" | "system"}
      onChange={changeTheme}
    />
  );
};