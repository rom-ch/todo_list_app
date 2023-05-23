import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

const TodoContext = createContext();

function Provider({ children }) {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		setTodos([
			{ id: 1, title: "Task 1" },
			{ id: 2, title: "Task 2" },
			{ id: 3, title: "Task 3" },
			{ id: 4, title: "Task 4" },
		]);
	}, []);

	const createTodo = title => {
		const updatedTodos = [
			...todos,
			{
				id: uuid(),
				title,
			},
		];

		setTodos(updatedTodos);
	};

	const deleteTodoById = id => {
		const updatedTodos = todos.filter(todo => todo.id !== id);

		setTodos(updatedTodos);
	};

	const editTodoById = (id, newTitle) => {
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) {
				return {
					...todo,
					title: newTitle,
				};
			}
			return todo;
		});

		setTodos(updatedTodos);
	};

	const value = {
		createTodo,
		deleteTodoById,
		editTodoById,
		todos,
	};

	return (
		<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
	);
}

Provider.propTypes = {
	children: PropTypes.node,
	todos: PropTypes.object,
};

export { Provider };
export default TodoContext;
