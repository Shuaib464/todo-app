import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../store/features/todoSlice";
import store from "../store/store";

function TodoForm() {
    
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    // const [desc, setDesc] = useState('')

    // console.log(store.getState())

    const addTodoHandler = (e) => {
        e.preventDefault();
        dispatch(createTodo({title}))
        setTitle('');
    }

    return (
        <form  className="flex gap-1" onSubmit={addTodoHandler}>
            <div className="flex flex-col w-full gap-1">
                <input
                    type="text"
                    placeholder="Write Todo..."
                    className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {/* <input
                    type="text"
                    placeholder="Write Description..."
                    className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                /> */}
            </div>
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

