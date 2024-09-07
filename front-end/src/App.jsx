import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { setTodo, fetchTodos } from "./store/features/todoSlice";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const todoState = useSelector((state) => state.todo.arrTodo);
  const [todos, setTodos] = useState([]);
  // const fetchTodo = async () => {
  //   try {
  //     const response = await axios.get("/api/v1/getTodos");
  //     console.log("axios res -> ", response.data.data);
  //     dispatch(setTodo(response.data));
  //     // setTodos(response.data.data);
  //   } catch (error) {
  //     console.log("fetchTodo :: axios error ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchTodo();
  //   console.log("todoss -> ", todos);
  // }, []);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [])
  
  useEffect(() => {
    console.log("updated todoState -> ", todoState);
    setTodos(todoState);
    console.log("updated todos -> ", todos);
  }, [todoState, todos]);

  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>

        {/* todo form  */}
        <div className="mb-4">
          <TodoForm />
        </div>

        {/* todos list  */}
        <div className="flex flex-wrap gap-y-3">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo._id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
