enum Theme {
    Light = "light",
    Dark = "dark",
}

export function isTheme(value: unknown): value is Theme {
    return Object.values(Theme).includes(value as Theme);
}

export function getTheme(): Theme {
    const theme = document.documentElement.getAttribute("data-theme");
    return isTheme(theme) ? theme : Theme.Light;
}

var storeThemeTimeout: number | undefined;
export function setTheme(theme: Theme): void {
    document.documentElement.setAttribute("data-theme", theme);

    if (storeThemeTimeout !== undefined) clearTimeout(storeThemeTimeout);

    // Update browser store in 100ms so it's not on every single value change
    storeThemeTimeout = window.setTimeout(() => {
        localStorage.setItem("data-theme", theme);
        storeThemeTimeout = undefined;
    }, 100);
}
