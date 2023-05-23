import { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import TodoContext from "../../context/todo";
import Button from "../Button/Button";
import "./TodoCreate.css";

function TodoCreate({ onClose }) {
	const [title, setTitle] = useState("");
	const { createTodo } = useContext(TodoContext);

	useEffect(() => {
		document.body.classList.add("overflow-hidden");

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	});

	const handleChange = e => {
		setTitle(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (title === "") {
			onClose();
			return;
		}
		createTodo(title);
		setTitle("");
		onClose();
	};

	return ReactDOM.createPortal(
		<div className="absolute">
			<div onClick={onClose} className="backdrop"></div>
			<div className="modal">
				<form onSubmit={handleSubmit} className="form">
					<div>
						<label className="modal__label" htmlFor="modal__input">
							Add new task
						</label>
						<input
							onChange={handleChange}
							className="modal__input"
							type="text"
							id="modal__input"
						/>
					</div>
					<Button>Add</Button>
				</form>
			</div>
		</div>,
		document.getElementById("modal-root")
	);
}

export default TodoCreate;
