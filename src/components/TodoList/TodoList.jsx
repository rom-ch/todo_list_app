import { useContext } from "react";
import TodoContext from "../../context/todo";
import TodoShow from "../TodoShow/TodoShow";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./TodoList.css";

function TodoList() {
	const { todos } = useContext(TodoContext);

	const renderedTodos = (
		<TransitionGroup component={null}>
			{todos.map((todo) => {
				return (
					<CSSTransition
						key={todo.id}
						component={null}
						timeout={300}
						classNames="list-item"
						unmountOnExit
					>
						<TodoShow
							key={todo.id}
							todo={todo}
						/>
					</CSSTransition>
				);
			})}
		</TransitionGroup>
	);

	return <ul className="todo-list">{renderedTodos}</ul>;
}

export default TodoList;
