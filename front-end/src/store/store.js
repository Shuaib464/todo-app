import {configureStore} from '@reduxjs/toolkit'
import todoSlice from './features/todoSlice';

const store = configureStore({
    reducer: {
        todo: todoSlice,
    }
})

console.log(store.getState());


export default store;