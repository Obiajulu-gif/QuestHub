// Theme configuration for consistent styling across the application
export const theme = {
  colors: {
    primary: {
      DEFAULT: "#00a3ff",
      hover: "#0090e0",
      light: "rgba(0, 163, 255, 0.2)",
    },
    secondary: {
      DEFAULT: "#7928ca",
      hover: "#6922b4",
      light: "rgba(121, 40, 202, 0.2)",
    },
    accent: {
      DEFAULT: "#ff3d71",
      hover: "#e02e5f",
      light: "rgba(255, 61, 113, 0.2)",
    },
    warning: {
      DEFAULT: "#ffc107",
      hover: "#e5ac06",
      light: "rgba(255, 193, 7, 0.2)",
    },
    success: {
      DEFAULT: "#00d68f",
      hover: "#00bf80",
      light: "rgba(0, 214, 143, 0.2)",
    },
    background: {
      primary: "#0a0a14",
      secondary: "#151524",
      tertiary: "#1e1e32",
      card: "#252540",
    },
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
      muted: "#a0a0a0",
      disabled: "#6c6c7e",
    },
    border: {
      DEFAULT: "#252540",
      light: "rgba(37, 37, 64, 0.5)",
      focus: "#00a3ff",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  typography: {
    fontFamily: {
      sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    tooltip: 50,
  },
}

// Helper function to get theme values
export const getThemeValue = (path: string): any => {
  const keys = path.split(".")
  return keys.reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : undefined
  }, theme)
}

// Export common breakpoints for responsive design
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}
