// src/hooks/useThemeStore.ts
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setTheme, type AppDispatch, type RootState } from '../store';

export const useThemeStore = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentTheme } = useSelector((state: RootState) => state.theme);

    const onToggleTheme = () => dispatch(toggleTheme());
    const onSetTheme = (theme: 'light' | 'dark') => dispatch(setTheme(theme));

    return {
        //* Properties
        currentTheme,

        //* Methods
        onToggleTheme,
        onSetTheme,
    };
};
