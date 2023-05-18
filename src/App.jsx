import { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [todos, setTodos] = useState([]);
	const [newTask, setNewTask] = useState("");

	const handleChange = (event) => {
		setNewTask(event.target.value);
	};

	const addTask = () => {
		const task = {
			id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
			title: newTask,
			completed: false,
		};
		setTodos([task, ...todos]);
		setNewTask("");
	};

	const deleteTask = (id) => {
		setTodos(todos.filter((task) => task.id !== id));
	};

	const handleCheckboxChange = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		);
	};

	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/todos")
			.then((response) => {
				setTodos(response.data);
			})
			.catch((error) => {
				console.log("Error fetching todos:", error);
			});
	}, []);

	return (
		<div className="App">
			<div className="addtask">
				<input type="text" value={newTask} onChange={handleChange} />
				<button onClick={addTask}>Add Task</button>
			</div>
			<ul className="list-group">
				{todos.map((task) => (
					<li
						key={task.id}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						{task.title}
						<input
							type="checkbox"
							checked={task.completed}
							onChange={() => handleCheckboxChange(task.id)}
						/>
						{!task.completed && (
							<button onClick={() => deleteTask(task.id)}>X</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
