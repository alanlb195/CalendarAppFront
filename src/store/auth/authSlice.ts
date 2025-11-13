import { createSlice } from '@reduxjs/toolkit'
import type { User } from '../../shared/interfaces'

type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking' | 'offline'

export interface authState {
    status: AuthStatus
    user: User | undefined
    errorMessage: string | undefined
}

const initialState: authState = {
    status: 'checking',
    user: undefined,
    errorMessage: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = undefined;
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'unauthenticated';
            state.user = undefined;
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        onOffline: (state, { payload }) => {
            state.status = 'offline';
            state.user = payload;
            state.errorMessage = undefined;
        },
    },
})

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage, onOffline } = authSlice.actions

export default authSlice.reducer
