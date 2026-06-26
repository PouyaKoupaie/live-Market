"use client";

import { useTheme } from "next-themes";

export function useCircleTheme() {
  const { setTheme, resolvedTheme } = useTheme();

  const changeTheme = (theme: "light" | "dark" | "system") => {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    const radius = Math.hypot(x, y);

    const overlay = document.createElement("div");

    const isDark = document.documentElement.classList.contains("dark");

    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "9999";
    overlay.style.pointerEvents = "none";

    overlay.style.background = isDark ? "#fff" : "#000";

    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.transition = "clip-path 600ms ease-in-out";
      overlay.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
    });

    setTimeout(() => {
      setTheme(theme);
      document.body.removeChild(overlay);
    }, 500);
  };

  return { changeTheme, resolvedTheme };
}