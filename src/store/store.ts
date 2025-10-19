import { configureStore } from '@reduxjs/toolkit'
import { uiSlice, calendarSlice, themeSlice, authSlice } from './'

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui      : uiSlice.reducer,
        theme   : themeSlice.reducer,
        auth    : authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch