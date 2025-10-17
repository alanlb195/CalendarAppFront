import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
    currentTheme: 'light' | 'dark';
}

const storedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';

const initialState: ThemeState = {
    currentTheme: storedTheme,
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.currentTheme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
        toggleTheme: (state) => {
            state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.currentTheme);
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
