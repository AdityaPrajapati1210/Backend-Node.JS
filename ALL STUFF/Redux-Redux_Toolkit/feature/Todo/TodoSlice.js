import { createSlice, nanoid } from "@reduxjs/toolkit";

const initState = {
    todos: [{id:1,text:"first msg"}]
}

export const todoSlice = createSlice({
    name:'todo',
    initialState:initState,
    reducers:{
        addTodo:(state,action)=>{
            console.log(action);
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo);
        },
        removeTodo:(state,action)=>{
            state.todos = state.todos.filter((todo) => todo.id != action.payload);
        },
        updateTodo:(state,action)=>{
            state.todos = state.filter((todo)=> (todo.id == action.payload)? todo.text = action.payload: todo);
        }
    }
})

export default todoSlice.reducer;
export const {addTodo, removeTodo,updateTodo} = todoSlice.actions