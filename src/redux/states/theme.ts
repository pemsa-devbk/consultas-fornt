import { createSlice } from '@reduxjs/toolkit';
import { ThemeInfo } from '../../models';

export const EmptyThemeState: ThemeInfo = {
    primary: '#4587df',
    primary25: '#4587df',
    neutral: '#f6f6f9', // Color de background
    neutral80: '#181a1e', // Color de fuente del texto seleccionado
    isDark: false
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState: localStorage.getItem('theme') ? (localStorage.getItem('theme') === "dark") ? { ...EmptyThemeState, neutral: '#181a1e', neutral80: '#f6f6f9', isDark: true} : {...EmptyThemeState}  : EmptyThemeState,
    reducers: {
        changeDark: (state) => {
            state.neutral = '#181a1e';
            state.neutral80 = '#f6f6f9';
            state.isDark = true;
        },
        changeLight: (state) => {
            state.neutral = '#f6f6f9';
            state.neutral80 = '#181a1e';
            state.isDark = false;

        }
    }
})

export const {changeDark, changeLight } = themeSlice.actions;

export default themeSlice.reducer;