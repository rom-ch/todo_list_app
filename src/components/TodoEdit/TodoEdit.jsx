import { useState, useContext } from "react";
import "./TodoEdit.css";
import TodoContext from "../../context/todo";

function TodoEdit({todo, onSubmit}) {
	const [newTitle, setNewTitle] = useState(todo.title);
	const { editTodoById } = useContext(TodoContext);

	const handleChange = e => {
		setNewTitle(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
      onSubmit();
		editTodoById(todo.id, newTitle);
	};

	return (
		<form onSubmit={handleSubmit} className="todo-edit">
			<input
				value={newTitle}
				onChange={handleChange}
				aria-label="Edit title"
				type="text"
			/>
			<button>Confirm</button>
		</form>
	);
}

export default TodoEdit;
