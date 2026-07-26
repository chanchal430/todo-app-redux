import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        value: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.value.push(action.payload)
        },
        deleteTodo: (state, action) => {
            state.value = state.value.filter((todo) => todo.id !== action.payload)
        },
        completeTodo: (state, action) => {
            const todo = state.value.find((todo) => todo.id === action.payload)

            if(todo) {
                todo.completed = !todo.completed
            }
        },
        editTodo: (state, action) => {
            const { id, updatedTodo } = action.payload;

            const index = state.value.findIndex((todo) => todo.id === id)

            if(index !== -1) {
                state.value[index] = updatedTodo
            }
        }
    }
})

export const { addTodo, deleteTodo, completeTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer