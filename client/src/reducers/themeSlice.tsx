import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
    isDarkMode: boolean;
}

const initialState: ThemeState = {
    isDarkMode: false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.isDarkMode = !state.isDarkMode; // Toggle the theme
        },
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.isDarkMode = action.payload; // Set theme based on provided value
        },
    },
});

// Export actions
export const { toggleTheme, setDarkMode } = themeSlice.actions;

// Export the reducer
export default themeSlice.reducer;