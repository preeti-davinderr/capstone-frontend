// globalStyles.ts

export const COLORS = {
    // Primary
    purple500: "#7C55C3",
    purple100: "#B89AD9",
    // purple700: "#8C63C7",
    purple700: "#522F83",

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
    subHeading: '#3B434E',
    displayH1: '#000000',
    displayH2: "#101828",

    // Background
    background: "#F9F9F9",
    // background: "#F6F6F6",

    // Cards
    card: "#FFFFFF",

    warning: '#f9a825',
    warningSurface: '#fff8e1', // light amber background for warnings
};

export const SPACING = {
    spacing2: 2,
    spacing4: 4,
    spacing6: 6,
    spacing8: 8,
    spacing12: 12,
    spacing16: 16,
    spacing20: 20,
    spacing24: 24,
    spacing32: 32,
    spacing48: 44
};

export const RADIUS = {
    sm: 4,
    md: 8,
    lg: 12,
    xl:24,
};

export const TEXT_STYLES = {
    // Display / Headings
    displayH1: {
        fontSize: 30,
        lineHeight: 40,
        fontWeight: "700" as const,
        color: COLORS.displayH1,
        fontFamily: "WixMadeforDisplay-Bold", // Add this in your project if needed
    },
    headingH2: {
        fontSize: 24,
        lineHeight: 31, // 130% of 24
        fontWeight: "500" as const,
        fontFamily: "WixMadeforDisplay-Medium",
        color: COLORS.displayH2,
        textAlign: "center",
    },
    subheading: {
        fontSize: 20,
        lineHeight: 24,
        fontWeight: "500" as const,
        color: COLORS.subHeading,
        fontFamily: "WixMadeforDisplay-Medium",
        letterSpacing: 0,
        textAlign: "center",
    },
    lead: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: "500" as const,
        color: COLORS.gray900,
        fontFamily: "WixMadeforDisplay-Medium",
    },

    // Body text
    bodyBase: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "400" as const,
        color: COLORS.gray900,
        fontFamily: "WixMadeforDisplay-Regular",
    },
    bodySmall: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "400" as const,
        color: COLORS.displayH2,
        fontFamily: "WixMadeforDisplay-Regular",
    },

    // Caption / Fine print
    caption: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "400" as const,
        color: COLORS.gray700,
        fontFamily: "WixMadeforDisplay-Regular",
    },
};


export const EFFECTS = {
    shadow: {
        shadowColor: 'rgba(136, 136, 136, 1)', // full color
        shadowOffset: { width: 0, height: 4 }, // position: 0 4
        shadowOpacity: 0.1, // 10% opacity
        shadowRadius: 8, // blur
        elevation: 2, // optional for Android (tune based on visual)
      },
    softShadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    frostedGlass: {
        backgroundColor: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
    },
    shadowLarge: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25, // 1A in hex is ~10% opacity
        shadowRadius: 10,
        elevation: 8, // Android
    },
};

export const GRADIENTS = {
    onboardingBackground: ['#FFE3D6', '#F7E9FF', '#EAD9FF'] as const,
};
