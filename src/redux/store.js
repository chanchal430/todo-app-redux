import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import themeReducer from '../features/theme/themeSlice'
import { loadState, saveState } from './localStorage'

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        theme: themeReducer
    },
    preloadedState
});

store.subscribe(() => {
    saveState({
        todos: store.getState().todos,
        theme: store.getState().theme
    })
})