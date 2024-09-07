import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
    let response = await axios.get('/api/v1/getTodos');
    console.log("fetch todos ",response.data.data);
    
    return response.data.data;
})

export const createTodo = createAsyncThunk('todo/createTodo', async (todo) => {
    try {
        const url = '/api/v1/createTodo';
        const response = await axios.post(url, todo)
        console.log("createTodo -> ",response.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
                
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async ({todoId, title, completed}) => {
    try {
        const url = `/api/v1/updateTodo/${todoId}`
        console.log("todo Title ", title);
        
        const updatedTodo = {title, completed} 
        const response = await axios.put(url, updatedTodo);
        console.log("New Todo -: ",response.data);
        return response.data;        
    } catch (error) {
        console.error("updateTodo error -> ", error.response?.data || error.message);
        return error.message;
    }
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (todoId) => {
    try {
        console.log('delete todoID -> ', todoId);
        
        const url = `/api/v1/deleteTodo/${todoId}`
        const response = await axios.delete(url);
        console.log('delete todo ->> ', response.data.data);
        return response.data;
    } catch (error) {
        return error.message;
    }
})

// defining initial state
const initialState = {
    loading: false,
    arrTodo: [],
    error: ''
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodo: (state, action) => {
            // const {_id, title, completed} = action.payload;
            state.arrTodo = [...action.payload.data]
            // state.arrTodo.push({id: id, title: title, description: description, completed: completed})
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            // state.arrTodo = action.payload.data.map(({_id, title, description, completed}) => (
            //     {_id, title, description, completed}
            // ) ) ;
            state.arrTodo = action.payload;
            state.error = '';

        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.arrTodo = [];
            state.error = action.payload;
        })

        builder
            .addCase(createTodo.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.loading = false;            
                const {_id, title, completed} = action.payload.data
                state.arrTodo.push({_id: _id, title:title, completed:completed});
                state.error = ''
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload;
            })

        builder
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.arrTodo = state.arrTodo.filter((todo) => todo._id !== action.payload.data._id)
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload;
            })

        builder
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;               
                const todoIndex = state.arrTodo.findIndex((todo) => todo._id === action.payload.data._id)
                console.log("index is - ",todoIndex);
                
                if(todoIndex !== -1) {
                    state.arrTodo[todoIndex] = action.payload.data;
                }
                // state.arrTodo = [...state.arrTodo]
                state.error = ''
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload;
            })

    }
})

export default todoSlice.reducer;
export const {setTodo} = todoSlice.actions;
