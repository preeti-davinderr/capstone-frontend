// globalStyles.ts

export const COLORS = {
    // Primary
    purple500: "#A979DD",
    purple100: "#E9DAF5",
    purple700: "#8C63C7",

    // Secondary
    pink500: "#ED97BA",
    blush100: "#FFE7EF",
    peach400: "#FCB599",

    // Status
    success: "#43A547",
    error: "#EF4444",
    info: "#1976D2",

    // Text
    white: "#FFFFFF",
    gray900: "#333333",
    gray700: "#555555",
    gray500: "#888888",
    gray300: "#DADADA",
    gray100: "#F6F6F6",

    // Background
    background: "#F9F9F9",

    // Cards
    card: "#FFFFFF",

    warning: '#f9a825',
    warningSurface: '#fff8e1', // light amber background for warnings
};

export const SPACING = {
    spacing4: 4,
    spacing6: 6,
    spacing8: 8,
    spacing12: 12,
    spacing16: 16,
    spacing20: 20,
    spacing24: 24,
    spacing32: 32,
};

export const RADIUS = {
    sm: 4,
    md: 8,
    lg: 12,
};

export const TEXT_STYLES = {
    displayH1: { fontSize: 32, lineHeight: 40, fontWeight: 700 as const, color: COLORS.gray900 },
    headingH2: { fontSize: 24, lineHeight: 32, fontWeight: 700 as const, color: COLORS.gray900 },
    subheading: { fontSize: 20, lineHeight: 28, fontWeight: 600 as const, color: COLORS.gray900 },
    lead: { fontSize: 18, lineHeight: 26, fontWeight: 500 as const, color: COLORS.gray900 },
    bodyBase: { fontSize: 16, lineHeight: 24, fontWeight: 400 as const, color: COLORS.gray900 },
    bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: 400 as const, color: COLORS.gray700 },
    caption: { fontSize: 12, lineHeight: 16, fontWeight: 400 as const, color: COLORS.gray700 },
};

export const EFFECTS = {
    softShadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 3,
    },
    frostedGlass: {
        backgroundColor: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
    },
};
