import React, { useEffect, useRef, useState } from 'react';
import { Todo } from "../model";
import { MdOutlineDeleteSweep, MdDoneOutline, MdOutlineModeEditOutline } from 'react-icons/md';
import "./styles.css";
import ToDoList from './ToDoList';

type Props = {
	todo: Todo,
	todos: Todo[],
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos}: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);

	const handleDone = (id: number) => {
		setTodos(
			todos.map((todo) =>
			todo.id === id ? {...todo, isDone: !todo.isDone} : todo)
		);
	};
	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const handleEdit = (e: React.FormEvent, id: number) => {
		e.preventDefault();
		setTodos(
			todos.map((todo) => (
			todo.id === id ? {...todo, todo : editTodo} : todo
		)));
		setEdit(false);
	};

		useEffect(() => {
			inputRef.current?.focus();

		}, [edit]);

	const inputRef = useRef<HTMLInputElement>(null);

  return (
	<form className='todos_single' onSubmit={(e) => handleEdit(e, todo.id)}>
		{edit ? (
				<input
					ref={inputRef}
					value={editTodo}
					onChange={(e) => setEditTodo(e.target.value)}
					className='todos_single-text'
				/>
			):	todo.isDone ? (
				<s className='todos_single-text'>{todo.todo}</s>
			) : (
				<span className='todos_single-text' onClick={() => {
					if(!edit && !todo.isDone) {
						setEdit(!edit)
					}
				}}> {todo.todo} </span>
			)}
		<div>
			<span className="icon-edit" onClick={() => {
				if(!edit && !todo.isDone) {
					setEdit(!edit)
				}
			}}>
				<MdOutlineModeEditOutline />
			</span>
			<span className="icon-delete" onClick={() => handleDelete(todo.id)}>
				<MdOutlineDeleteSweep />
			</span>
			<span className="icon-done" onClick={() => handleDone(todo.id)}>
				<MdDoneOutline />
			</span>
		</div>
	</form>
  )
};

export default SingleTodo;
