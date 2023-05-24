import { useState, useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { TfiMenuAlt } from "react-icons/tfi";
import Sidebar from "./components/Sidebar/Sidebar";
import TodoCreate from "./components/TodoCreate/TodoCreate";
import Button from "./components/Button/Button";
import TodoList from "./components/TodoList/TodoList";
import TodoContext from "./context/todo";
import "./App.css";

function App() {
	const [showSidebar, setShowSidebar] = useState(true);
	const [showCreate, setShowCreate] = useState(false);

	const { fetchTodos } = useContext(TodoContext);

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	const handleClick = () => {
		setShowSidebar(!showSidebar);
	};

	const handleCreateClick = () => {
		setShowCreate(true);
	};

	const handleClose = () => {
		setShowCreate(false);
	};

	return (
		<div className="app">
			<CSSTransition in={showSidebar} timeout={500} classNames="btn-menu">
				<button onClick={handleClick} className="sidebar-toggle">
					<TfiMenuAlt />
				</button>
			</CSSTransition>

			<CSSTransition in={showSidebar} timeout={500} classNames="toggle">
				<Sidebar />
			</CSSTransition>
			<main>
				<Button className="btn" onClick={handleCreateClick}>
					Create new Task
				</Button>
				<TodoList />
			</main>

			<CSSTransition
				in={showCreate}
				timeout={250}
				classNames="modal"
				unmountOnExit
			>
				<TodoCreate onClose={handleClose} />
			</CSSTransition>
		</div>
	);
}

export default App;
