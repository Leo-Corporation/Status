"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
    const { theme, systemTheme, setTheme } = useTheme();
    return (
        <Button
            className="-mr-4"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="ghost"
        >
            {theme === "dark" && <Sun size={14} />}
            {theme === "light" && <Moon size={14} />}
            {theme === "system" && systemTheme === "light" && <Moon size={14} />}
            {theme === "system" && systemTheme === "dark" && <Sun size={14} />}
        </Button>
    );
}
