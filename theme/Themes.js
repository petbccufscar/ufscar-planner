import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from "react-native-paper";

export const CombinedDefaultThemes = [{
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: "#BB1822",
        onPrimary: "#FFFFFF",
        primaryContainer: "#FFDAD5",
        onPrimaryContainer: "#410003",
        secondary: "#C00103",
        onSecondary: '#FFFFFF',
        secondaryContainer: '#FFDAD3',
        onSecondaryContainer: '#410000',
        tertiary: '#725B2E',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#FFDEA6',
        onTertiaryContainer: '#271900',
        error: '#BA1B1B',
        onError: '#FFFFFF',
        errorContainer: '#FFDAD4',
        onErrorContainer: '#410001',
        background: '#FBFDFD',
        onBackground: '#191C1D',
        surface: '#FBFDFD',
        onSurface: '#191C1D',
        surfaceVariant: '#F4DDDB',
        onSurfaceVariant: '#524342',
        outline: '#857371',
        surface1: '#F8F2F2',
        surface2: '#F6EBEB',
        surface3: '#F4E4E5',
        surface4: '#F3E2E3',
        surface5: '#F2DDDE',
        headerActive: '#F2DDDE',
        headerInactive: '#F8F2F2',
        onHeaderInactive: "#191C1D",
        onHeader: '#191C1D',
    }
},
{
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    "colors": {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "background": "#FCFCFC",
        "black": "#000000",
        "error": "#BA1B1B",
        "errorContainer": "#FFDAD4",
        "headerActive": "#E92F2F",
        "headerInactive": "#F1F1F1",
        "onHeaderInactive": "#000000",
        "inverseOnSurface": "#FBEEEC",
        "inversePrimary": "#FFB3A9",
        "inverseSurface": "#362F2E",
        "onBackground": "#211A19",
        "onError": "#FFFFFF",
        "onErrorContainer": "#410001",
        "onHeader": "#000000",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#410002",
        "onSecondary": "#FFFFFF",
        "onSecondaryContainer": "#B72A2A",
        "onSurface": "#211A19",
        "onSurfaceVariant": "#534341",
        "onTertiary": "#FFFFFF",
        "onTertiaryContainer": "#261900",
        "outline": "#857371",
        "primary": "#E92F2F",
        "primaryContainer": "#FFDAD4",
        "secondary": "#775653",
        "secondaryContainer": "#FFDAD5",
        "shadow": "#000000",
        "surface": "#FCFCFC",
        "surface1": "#F1F1F1",
        "surface2": "#F2F2F2",
        "surface3": "#FAFCFD",
        "surface4": "#FCFCFC",
        "surface5": "#EAE3F1",
        "surfaceVariant": "#DBE4E6",
        "tertiary": "#715B2E",
        "tertiaryContainer": "#FEDFA6",
        "white": "#FFFFFF",
    }
}, {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    "colors": {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "background": "#FCFCFC",
        "black": "#000000",
        "error": "#BA1B1B",
        "errorContainer": "#FFDAD4",
        "headerActive": "#E9E3EE",
        "headerInactive": "#F5F3F7",
        "onHeaderInactive": "#000000",
        "inverseOnSurface": "#F6EFF4",
        "inversePrimary": "#E3B6FF",
        "inverseSurface": "#322F33",
        "onBackground": "#1D1B1E",
        "onError": "#FFFFFF",
        "onErrorContainer": "#410001",
        "onHeader": "#000000",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#2E004F",
        "onSecondary": "#FFFFFF",
        "onSecondaryContainer": "#221729",
        "onSurface": "#1D1B1E",
        "onSurfaceVariant": "#4B454D",
        "onTertiary": "#FFFFFF",
        "onTertiaryContainer": "#331015",
        "outline": "#7C757E",
        "primary": "#774A9B",
        "primaryContainer": "#F4DAFF",
        "secondary": "#675A6F",
        "secondaryContainer": "#EEDDF5",
        "shadow": "#000000",
        "surface": "#FCFCFC",
        "surface1": "#F5F3F7",
        "surface2": "#F1EEF4",
        "surface3": "#EDE8F1",
        "surface4": "#ECE7F0",
        "surface5": "#E9E3EE",
        "surfaceVariant": "#EADFEA",
        "tertiary": "#815155",
        "tertiaryContainer": "#FFD9DC",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    "colors": {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "background": "#FCFCFC",
        "black": "#000000",
        "error": "#BA1B1B",
        "errorContainer": "#FFDAD4",
        "headerActive": "#EFE1E6",
        "headerInactive": "#F7F2F4",
        "inverseOnSurface": "#FAEEEF",
        "inversePrimary": "#FFB1C7",
        "inverseSurface": "#352F30",
        "onBackground": "#201A1B",
        "onError": "#FFFFFF",
        "onErrorContainer": "#410001",
        "onHeader": "#000",
        "onHeaderInactive": "#000",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#3F001A",
        "onSecondary": "#FFFFFF",
        "onSecondaryContainer": "#2B151B",
        "onSurface": "#201A1B",
        "onSurfaceVariant": "#514346",
        "onTertiary": "#FFFFFF",
        "onTertiaryContainer": "#2D1600",
        "outline": "#837376",
        "primary": "#A1385D",
        "primaryContainer": "#FFD9E2",
        "secondary": "#74565D",
        "secondaryContainer": "#FFD9E1",
        "shadow": "#000000",
        "surface": "#FCFCFC",
        "surface1": "#F7F2F4",
        "surface2": "#F5ECEF",
        "surface3": "#F2E6EB",
        "surface4": "#F1E4E9",
        "surface5": "#EFE1E6",
        "surfaceVariant": "#F3DDE1",
        "tertiary": "#7C5734",
        "tertiaryContainer": "#FFDCBD",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    "colors": {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "background": "#FFFBFF",
        "black": "#000000",
        "error": "#BA1B1B",
        "errorContainer": "#FFDAD4",
        "headerActive": "#e7e5fb",
        "headerInactive": "#f6f2fd",
        "inverseOnSurface": "#F3EFF4",
        "inversePrimary": "#BEC2FF",
        "inverseSurface": "#313034",
        "onBackground": "#1B1B1F",
        "onError": "#FFFFFF",
        "onErrorContainer": "#410001",
        "onHeader": "#1B1B1F",
        "onHeaderInactive": "#1B1B1F",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#00006F",
        "onSecondary": "#FFFFFF",
        "onSecondaryContainer": "#191A2C",
        "onSurface": "#1B1B1F",
        "onSurfaceVariant": "#46464F",
        "onTertiary": "#FFFFFF",
        "onTertiaryContainer": "#2E1125",
        "outline": "#777680",
        "primary": "#4249DF",
        "primaryContainer": "#E0E0FF",
        "secondary": "#5D5D72",
        "secondaryContainer": "#E1E0F9",
        "shadow": "#000000",
        "surface": "#FFFBFF",
        "surface1": "#f6f2fd",
        "surface2": "#f0edfc",
        "surface3": "#ece9fb",
        "surface3 ": "#FFFBFF",
        "surface4": "#eae7fb",
        "surface5": "#e7e5fb",
        "surfaceVariant": "#E4E1EC",
        "tertiary": "#78536A",
        "tertiaryContainer": "#FFD8EF",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    "colors": {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "background": "#FCFCFC",
        "black": "#000000",
        "error": "#BA1B1B",
        "errorContainer": "#FFDAD4",
        "headerActive": "#f0e2f0",
        "headerInactive": "#f7f2f7",
        "inverseOnSurface": "#F8EEF2",
        "inversePrimary": "#FFA9F8",
        "inverseSurface": "#342F32",
        "onBackground": "#1E1A1D",
        "onError": "#FFFFFF",
        "onErrorContainer": "#410001",
        "onHeader": "#1E1A1D",
        "onHeaderInactive": "#1E1A1D",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#38003A",
        "onSecondary": "#FFFFFF",
        "onSecondaryContainer": "#271625",
        "onSurface": "#1E1A1D",
        "onSurfaceVariant": "#4E444B",
        "onTertiary": "#FFFFFF",
        "onTertiaryContainer": "#321208",
        "outline": "#80747C",
        "primary": "#9D2B9C",
        "primaryContainer": "#FFD6F8",
        "secondary": "#6D5869",
        "secondaryContainer": "#F7DAEF",
        "shadow": "#000000",
        "surface": "#FCFCFC",
        "surface1": "#f7f2f7",
        "surface2": "#f4ecf4",
        "surface3": "#f2e7f2",
        "surface3 ": "#FFFBFF",
        "surface4": "#f1e5f1",
        "surface5": "#f0e2f0",
        "surfaceVariant": "#EEDEE8",
        "tertiary": "#815245",
        "tertiaryContainer": "#FFDACF",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    "colors": {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "background": "#FCFCF6",
        "black": "#000000",
        "error": "#BA1B1B",
        "errorContainer": "#FFDAD4",
        "headerActive": "#deead9",
        "headerInactive": "#f0f5ea",
        "inverseOnSurface": "#F1F1EB",
        "inversePrimary": "#80DC70",
        "inverseSurface": "#2F312D",
        "onBackground": "#1A1C19",
        "onError": "#FFFFFF",
        "onErrorContainer": "#410001",
        "onHeader": "#1A1C19",
        "onHeaderInactive": "#1A1C19",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#002200",
        "onSecondary": "#FFFFFF",
        "onSecondaryContainer": "#121F0F",
        "onSurface": "#1A1C19",
        "onSurfaceVariant": "#43493F",
        "onTertiary": "#FFFFFF",
        "onTertiaryContainer": "#002022",
        "outline": "#73796E",
        "primary": "#0B6E0D",
        "primaryContainer": "#9BF988",
        "secondary": "#53634E",
        "secondaryContainer": "#D7E8CD",
        "shadow": "#000000",
        "surface": "#FCFCF6",
        "surface1": "#f0f5ea",
        "surface2": "#eaf1e4",
        "surface3": "#e4edde",
        "surface3 ": "#FFFBFF",
        "surface4": "#e2ecdd",
        "surface5": "#deead9",
        "surfaceVariant": "#DEE4D7",
        "tertiary": "#386568",
        "tertiaryContainer": "#BCEBEF",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    "colors": {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "background": "#FFFBF8",
        "black": "#000000",
        "error": "#BA1B1B",
        "errorContainer": "#FFDAD4",
        "headerActive": "#eee7d9",
        "headerInactive": "#f8f3ec",
        "inverseOnSurface": "#F8F0E7",
        "inversePrimary": "#F7BE1C",
        "inverseSurface": "#34302A",
        "onBackground": "#1E1B16",
        "onError": "#FFFFFF",
        "onErrorContainer": "#410001",
        "onHeader": "#1E1B16",
        "onHeaderInactive": "#1E1B16",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#261A00",
        "onSecondary": "#FFFFFF",
        "onSecondaryContainer": "#241A04",
        "onSurface": "#1E1B16",
        "onSurfaceVariant": "#4D4639",
        "onTertiary": "#FFFFFF",
        "onTertiaryContainer": "#08200A",
        "outline": "#7F7667",
        "primary": "#785900",
        "primaryContainer": "#FFDF96",
        "secondary": "#6B5D3F",
        "secondaryContainer": "#F4E0BB",
        "shadow": "#000000",
        "surface": "#FFFBF8",
        "surface1": "#f8f3ec",
        "surface2": "#f5efe5",
        "surface3": "#f1eadf",
        "surface3 ": "#FFFBFF",
        "surface4": "#f0e9dd",
        "surface5": "#eee7d9",
        "surfaceVariant": "#EDE1CF",
        "tertiary": "#496547",
        "tertiaryContainer": "#CBEBC5",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    "colors": {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "background": "#FBFDFE",
        "black": "#000000",
        "error": "#BA1B1B",
        "errorContainer": "#FFDAD4",
        "headerActive": "#dceaed",
        "headerInactive": "#eff5f7",
        "inverseOnSurface": "#EFF1F2",
        "inversePrimary": "#51D7EE",
        "inverseSurface": "#2D3132",
        "onBackground": "#191C1D",
        "onError": "#FFFFFF",
        "onErrorContainer": "#410001",
        "onHeader": "#191C1D",
        "onHeaderInactive": "#191C1D",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#001F25",
        "onSecondary": "#FFFFFF",
        "onSecondaryContainer": "#2A1700",
        "onSurface": "#191C1D",
        "onSurfaceVariant": "#3F484A",
        "onTertiary": "#FFFFFF",
        "onTertiaryContainer": "#410003",
        "outline": "#70797B",
        "primary": "#006877",
        "primaryContainer": "#9BEFFF",
        "secondary": "#855300",
        "secondaryContainer": "#FFDDB4",
        "shadow": "#000000",
        "surface": "#FBFDFE",
        "surface1": "#eff5f7",
        "surface2": "#e8f1f3",
        "surface3": "#e2eef0",
        "surface3 ": "#FFFBFF",
        "surface4": "#e0edef",
        "surface5": "#dceaed",
        "surfaceVariant": "#DBE4E6",
        "tertiary": "#BF0016",
        "tertiaryContainer": "#FFDAD5",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    "colors": {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        "background": "#FEFDF5",
        "black": "#000000",
        "error": "#BA1B1B",
        "errorContainer": "#FFDAD4",
        "headerActive": "#e7ead9",
        "headerInactive": "#f5f5ea",
        "inverseOnSurface": "#F2F1E9",
        "inversePrimary": "#A8D473",
        "inverseSurface": "#30312D",
        "onBackground": "#1B1C18",
        "onError": "#FFFFFF",
        "onErrorContainer": "#410001",
        "onHeader": "#1B1C18",
        "onHeaderInactive": "#1B1C18",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#0E2000",
        "onSecondary": "#FFFFFF",
        "onSecondaryContainer": "#1F1C00",
        "onSurface": "#1B1C18",
        "onSurfaceVariant": "#44483D",
        "onTertiary": "#FFFFFF",
        "onTertiaryContainer": "#00201E",
        "outline": "#75796C",
        "primary": "#436813",
        "primaryContainer": "#C4F18C",
        "secondary": "#666000",
        "secondaryContainer": "#F2E735",
        "shadow": "#000000",
        "surface": "#FEFDF5",
        "surface1": "#f5f5ea",
        "surface2": "#f0f1e4",
        "surface3": "#ebeede",
        "surface4": "#e9eddc",
        "surface5": "#e7ead9",
        "surfaceVariant": "#E1E4D5",
        "tertiary": "#396663",
        "tertiaryContainer": "#BBECE7",
        "white": "#FFFFFF"
    }
}
];

export const CombinedDarkThemes = [{
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        primary: '#FFB3AB',
        onPrimary: '#680008',
        primaryContainer: '#930010',
        onPrimaryContainer: '#FFDAD5',
        secondary: '#FFB4A7',
        onSecondary: '#680000',
        secondaryContainer: '#930000',
        onSecondaryContainer: '#FFDAD3',
        tertiary: '#E1C28C',
        onTertiary: '#402D05',
        tertiaryContainer: '#584319',
        onTertiaryContainer: '#FFDEA6',
        error: '#FFB4A9',
        onError: '#680003',
        errorContainer: '#930006',
        onErrorContainer: '#FFDAD4',
        background: '#191C1D',
        onBackground: '#E0E3E3',
        surface: '#191C1D',
        onSurface: '#E0E3E3',
        surfaceVariant: '#524342',
        onSurfaceVariant: '#D7C1BF',
        outline: '#A08C8A',
        surface1: '#242424',
        surface2: '#2B2828',
        surface3: '#322D2D',
        surface4: '#352E2E',
        surface5: '#393131',
        headerActive: '#393131',
        headerInactive: '#242424',
        onHeader: '#E0E3E3',
        onHeaderInactive: '#E0E3E3',
    },
},
{
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        "background": "#211A19",
        "black": "#000000",
        "error": "#FFB4A9",
        "errorContainer": "#930006",
        "headerActive": "#E92F2F",
        "headerInactive": "#1C2527",
        "onHeaderInactive": "#FFFFFF",
        "inverseOnSurface": "#211A19",
        "inversePrimary": "#C00417",
        "inverseSurface": "#EDE0DE",
        "onBackground": "#EDE0DE",
        "onError": "#680003",
        "onErrorContainer": "#FFDAD4",
        "onHeader": "#FFFFFF",
        "onPrimary": "#FFFFFF",
        "onPrimaryContainer": "#95F0FF",
        "onSecondary": "#001F24",
        "onSecondaryContainer": "#FFDAD6",
        "onSurface": "#EDE0DE",
        "onSurfaceVariant": "#D8C2BF",
        "onTertiary": "#3F2D04",
        "onTertiaryContainer": "#FEDFA6",
        "outline": "#899294",
        "primary": "#E92F2F",
        "primaryContainer": "#93000A",
        "secondary": "#E7BDB8",
        "secondaryContainer": "#93000F",
        "shadow": "#000000",
        "surface": "#191C1D",
        "surface1": "#1C2527",
        "surface2": "#191C1D",
        "surface3": "#FFFFFF",
        "surface4": "#211A19",
        "surface5": "#211A19",
        "surfaceVariant": "#534341",
        "tertiary": "#E1C38C",
        "tertiaryContainer": "#584419",
        "white": "#FFFFFF"
    }
}, {

    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        "background": "#1D1B1E",
        "black": "#000000",
        "error": "#FFB4A9",
        "errorContainer": "#930006",
        "headerActive": "#39313D",
        "headerInactive": "#272329",
        "onHeaderInactive": "#FFFFFF",
        "onHeader": "#ffffff",
        "inverseOnSurface": "#1D1B1E",
        "inversePrimary": "#774A9B",
        "inverseSurface": "#E7E0E5",
        "onBackground": "#E7E0E5",
        "onError": "#680003",
        "onErrorContainer": "#FFDAD4",
        "onPrimary": "#461968",
        "onPrimaryContainer": "#F4DAFF",
        "onSecondary": "#372C3E",
        "onSecondaryContainer": "#EEDDF5",
        "onSurface": "#E7E0E5",
        "onSurfaceVariant": "#CDC4CE",
        "onTertiary": "#4C2529",
        "onTertiaryContainer": "#FFD9DC",
        "outline": "#968E98",
        "primary": "#E3B6FF",
        "primaryContainer": "#5E3280",
        "secondary": "#D2C1D9",
        "secondaryContainer": "#4E4256",
        "shadow": "#000000",
        "surface": "#1D1B1E",
        "surface1": "#272329",
        "surface2": "#2D2730",
        "surface3": "#332C37",
        "surface4": "#352E39",
        "surface5": "#39313D",
        "surfaceVariant": "#4B454D",
        "tertiary": "#F4B7BB",
        "tertiaryContainer": "#663A3E",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        "background": "#201A1B",
        "black": "#000000",
        "error": "#FFB4A9",
        "errorContainer": "#930006",
        "headerActive": "#3F2F33",
        "headerInactive": "#2B2224",
        "onHeaderInactive": "#FFFFFF",
        "inverseOnSurface": "#201A1B",
        "inversePrimary": "#A1385D",
        "inverseSurface": "#EBE0E1",
        "onBackground": "#EBE0E1",
        "onError": "#680003",
        "onErrorContainer": "#FFDAD4",
        "onHeader": "#ffffff",
        "onPrimary": "#640430",
        "onPrimaryContainer": "#FFD9E2",
        "onSecondary": "#432930",
        "onSecondaryContainer": "#FFD9E1",
        "onSurface": "#EBE0E1",
        "onSurfaceVariant": "#D6C1C5",
        "onTertiary": "#472A0B",
        "onTertiaryContainer": "#FFDCBD",
        "outline": "#9E8D90",
        "primary": "#FFB1C7",
        "primaryContainer": "#832046",
        "secondary": "#E3BDC5",
        "secondaryContainer": "#5B3F46",
        "shadow": "#000000",
        "surface": "#201A1B",
        "surface1": "#2B2224",
        "surface2": "#322629",
        "surface3": "#392B2E",
        "surface4": "#392B2E",
        "surface5": "#3F2F33",
        "surfaceVariant": "#514346",
        "tertiary": "#EEBD93",
        "tertiaryContainer": "#61401F",
        "white": "#FFFFFF"
    }
}, {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        "background": "#1B1B1F",
        "black": "#000000",
        "error": "#FFB4A9",
        "errorContainer": "#930006",
        "headerActive": "#2f2f3a",
        "headerInactive": "#222229",
        "inverseOnSurface": "#1B1B1F",
        "inversePrimary": "#4249DF",
        "inverseSurface": "#E4E1E6",
        "onBackground": "#E4E1E6",
        "onError": "#680003",
        "onErrorContainer": "#FFDAD4",
        "onHeader": "#E4E1E6",
        "onHeaderInactive": "#E4E1E6",
        "onPrimary": "#0000AD",
        "onPrimaryContainer": "#E0E0FF",
        "onSecondary": "#2E2F42",
        "onSecondaryContainer": "#E1E0F9",
        "onSurface": "#E4E1E6",
        "onSurfaceVariant": "#C7C5D0",
        "onTertiary": "#46263B",
        "onTertiaryContainer": "#FFD8EF",
        "outline": "#918F99",
        "primary": "#BEC2FF",
        "primaryContainer": "#262AC7",
        "secondary": "#C5C4DD",
        "secondaryContainer": "#444559",
        "shadow": "#000000",
        "surface": "#1B1B1F",
        "surface1": "#222229",
        "surface2": "#27272f",
        "surface3": "#2b2b35",
        "surface4": "#2c2c36",
        "surface5": "#2f2f3a",
        "surfaceVariant": "#46464F",
        "tertiary": "#E8B9D4",
        "tertiaryContainer": "#5E3C52",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        "background": "#1E1A1D",
        "black": "#000000",
        "error": "#FFB4A9",
        "errorContainer": "#930006",
        "headerActive": "#392b37",
        "headerInactive": "#282027",
        "inverseOnSurface": "#1E1A1D",
        "inversePrimary": "#9D2B9C",
        "inverseSurface": "#E9E0E4",
        "onBackground": "#E9E0E4",
        "onError": "#680003",
        "onErrorContainer": "#FFDAD4",
        "onHeader": "#E9E0E4",
        "onHeaderInactive": "#E9E0E4",
        "onPrimary": "#5B005E",
        "onPrimaryContainer": "#FFD6F8",
        "onSecondary": "#3D2A3A",
        "onSecondaryContainer": "#F7DAEF",
        "onSurface": "#E9E0E4",
        "onSurfaceVariant": "#D1C2CB",
        "onTertiary": "#4C261B",
        "onTertiaryContainer": "#FFDACF",
        "outline": "#9A8D95",
        "primary": "#FFA9F8",
        "primaryContainer": "#800282",
        "secondary": "#DABFD3",
        "secondaryContainer": "#554151",
        "shadow": "#000000",
        "surface": "#1E1A1D",
        "surface1": "#282027",
        "surface2": "#2e242d",
        "surface3": "#342832",
        "surface4": "#362934",
        "surface5": "#392b37",
        "surfaceVariant": "#4E444B",
        "tertiary": "#F5B8A8",
        "tertiaryContainer": "#663B2F",
        "white": "#FFFFFF"
    }
}, {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        "background": "#1A1C19",
        "black": "#000000",
        "error": "#FFB4A9",
        "errorContainer": "#930006",
        "headerActive": "#263323",
        "headerInactive": "#1e251d",
        "inverseOnSurface": "#1A1C19",
        "inversePrimary": "#0B6E0D",
        "inverseSurface": "#E2E3DC",
        "onBackground": "#E2E3DC",
        "onError": "#680003",
        "onErrorContainer": "#FFDAD4",
        "onHeader": "#E2E3DC",
        "onHeaderInactive": "#E2E3DC",
        "onPrimary": "#003A00",
        "onPrimaryContainer": "#9BF988",
        "onSecondary": "#263422",
        "onSecondaryContainer": "#D7E8CD",
        "onSurface": "#E2E3DC",
        "onSurfaceVariant": "#C2C8BC",
        "onTertiary": "#00373A",
        "onTertiaryContainer": "#BCEBEF",
        "outline": "#8D9388",
        "primary": "#80DC70",
        "primaryContainer": "#005300",
        "secondary": "#BBCCB2",
        "secondaryContainer": "#3C4B37",
        "shadow": "#000000",
        "surface": "#1A1C19",
        "surface1": "#1e251d",
        "surface2": "#212a1f",
        "surface3": "#242f21",
        "surface4": "#243022",
        "surface5": "#263323",
        "surfaceVariant": "#43493F",
        "tertiary": "#A0CFD2",
        "tertiaryContainer": "#1E4D51",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        "background": "#1E1B16",
        "black": "#000000",
        "error": "#FFB4A9",
        "errorContainer": "#930006",
        "headerActive": "#382f16",
        "headerInactive": "#282216",
        "inverseOnSurface": "#1E1B16",
        "inversePrimary": "#785900",
        "inverseSurface": "#E9E1D8",
        "onBackground": "#E9E1D8",
        "onError": "#680003",
        "onErrorContainer": "#FFDAD4",
        "onHeader": "#E9E1D8",
        "onHeaderInactive": "#E9E1D8",
        "onPrimary": "#3F2E00",
        "onPrimaryContainer": "#FFDF96",
        "onSecondary": "#3A2F16",
        "onSecondaryContainer": "#F4E0BB",
        "onSurface": "#E9E1D8",
        "onSurfaceVariant": "#D0C5B3",
        "onTertiary": "#1C361C",
        "onTertiaryContainer": "#CBEBC5",
        "outline": "#999080",
        "primary": "#F7BE1C",
        "primaryContainer": "#5C4300",
        "secondary": "#D7C4A0",
        "secondaryContainer": "#52452A",
        "shadow": "#000000",
        "surface": "#1E1B16",
        "surface1": "#282216",
        "surface2": "#2e2716",
        "surface3": "#332b16",
        "surface4": "#352c16",
        "surface5": "#382f16",
        "surfaceVariant": "#4D4639",
        "tertiary": "#AFCFAA",
        "tertiaryContainer": "#324D31",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        "background": "#191C1D",
        "black": "#000000",
        "error": "#FFB4A9",
        "errorContainer": "#930006",
        "headerActive": "#1f3236",
        "headerInactive": "#1b2426",
        "inverseOnSurface": "#191C1D",
        "inversePrimary": "#006877",
        "inverseSurface": "#E1E3E3",
        "onBackground": "#E1E3E3",
        "onError": "#680003",
        "onErrorContainer": "#FFDAD4",
        "onHeader": "#E1E3E3",
        "onHeaderInactive": "#E1E3E3",
        "onPrimary": "#00363E",
        "onPrimaryContainer": "#9BEFFF",
        "onSecondary": "#472A00",
        "onSecondaryContainer": "#FFDDB4",
        "onSurface": "#E1E3E3",
        "onSurfaceVariant": "#BFC8CA",
        "onTertiary": "#690007",
        "onTertiaryContainer": "#FFDAD5",
        "outline": "#899294",
        "primary": "#51D7EE",
        "primaryContainer": "#004E59",
        "secondary": "#FFB959",
        "secondaryContainer": "#663E00",
        "shadow": "#000000",
        "surface": "#191C1D",
        "surface1": "#1b2426",
        "surface2": "#1d292c",
        "surface3": "#1e2e31",
        "surface4": "#1e3033",
        "surface5": "#1f3236",
        "surfaceVariant": "#3F484A",
        "tertiary": "#FFB3AA",
        "tertiaryContainer": "#93000E",
        "white": "#FFFFFF"
    }
},
{
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        "background": "#1B1C18",
        "black": "#000000",
        "error": "#FFB4A9",
        "errorContainer": "#930006",
        "headerActive": "#2c3223",
        "headerInactive": "#21241c",
        "inverseOnSurface": "#1B1C18",
        "inversePrimary": "#436813",
        "inverseSurface": "#E3E3DB",
        "onBackground": "#E3E3DB",
        "onError": "#680003",
        "onErrorContainer": "#FFDAD4",
        "onHeader": "#E3E3DB",
        "onHeaderInactive": "#E3E3DB",
        "onPrimary": "#1D3700",
        "onPrimaryContainer": "#C4F18C",
        "onSecondary": "#353100",
        "onSecondaryContainer": "#F2E735",
        "onSurface": "#E3E3DB",
        "onSurfaceVariant": "#C5C8BA",
        "onTertiary": "#003734",
        "onTertiaryContainer": "#BBECE7",
        "outline": "#8E9285",
        "primary": "#A8D473",
        "primaryContainer": "#2D5000",
        "secondary": "#D5CB0D",
        "secondaryContainer": "#4D4800",
        "shadow": "#000000",
        "surface": "#1B1C18",
        "surface1": "#21241c",
        "surface2": "#25291e",
        "surface3": "#282e21",
        "surface4": "#2a2f21",
        "surface5": "#2c3223",
        "surfaceVariant": "#44483D",
        "tertiary": "#A0CFCB",
        "tertiaryContainer": "#1E4E4B",
        "white": "#FFFFFF"
    }
}

];