import { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

const TodoContext = createContext();

function Provider({ children }) {
	const [todos, setTodos] = useState([]);

	const fetchTodos = useCallback(async () => {
		try {
			const response = await fetch("http://localhost:3002/todos");
			const data = await response.json();
			setTodos(data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const createTodo = async title => {
		try {
			const response = await fetch("http://localhost:3002/todos", {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ title, id: uuid() }),
			});
			const data = await response.json();
			const updatedTodos = [...todos, data];

			setTodos(updatedTodos);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodoById = async id => {
		try {
			const response = await fetch(`http://localhost:3002/todos/${id}`, {
				method: "DELETE",
				mode: "cors",
			});
		} catch (error) {
			console.log(error);
		}

		const updatedTodos = todos.filter(todo => todo.id !== id);

		setTodos(updatedTodos);
	};

	const editTodoById = async (id, newTitle) => {
		try {
			const response = await fetch(`http://localhost:3002/todos/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title: newTitle }),
			});
		} catch (error) {
			console.log(error);
		}

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
		fetchTodos,
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
