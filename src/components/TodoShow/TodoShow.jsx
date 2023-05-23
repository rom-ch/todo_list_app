import { useContext, useState } from "react";
import TodoContext from "../../context/todo";
import TodoEdit from "../TodoEdit/TodoEdit";
import { GoTrashcan, GoArchive, GoPencil } from "react-icons/go";
import "./TodoShow.css";

function TodoShow({ todo }) {
	const [showEdit, setShowEdit] = useState(false);
	const { deleteTodoById } = useContext(TodoContext);

	const handleDelete = () => {
		deleteTodoById(todo.id);
	};

	const handleEdit = () => {
		setShowEdit(!showEdit);
	};

	const handleSubmit = () => {
		setShowEdit(false);
	};

	let content = <h1>{todo.title}</h1>;
	if (showEdit) {
		content = <TodoEdit todo={todo} onSubmit={handleSubmit} />;
	}

	return (
		<li className="todo-show">
			<div>{content}</div>

			<div className="icon-container">
				<button>
					<GoArchive />
				</button>
				<button onClick={handleEdit}>
					<GoPencil />
				</button>
				<button>
					<GoTrashcan onClick={handleDelete} />
				</button>
			</div>
		</li>
	);
}

export default TodoShow;
