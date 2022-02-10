import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import InputField from './components/InputField'
import { Todo } from "./model"
import ToDoList from './components/ToDoList'

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
	  e.preventDefault();
	  if(todo){
		  setTodos([...todos, { id: Date.now(), todo, isDone: false}]);
		  setTodo("");
	  }
  };

  return (
    <div className="App">
		<span className='heading'>T o - D o z</span>
		<InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
		<ToDoList todos={todos} setTodos={setTodos}/>
    </div>
  )
}

export default App
