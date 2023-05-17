import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import TodoList from "./components/TodoList";
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
			taskName: newTask,
			completed: false,
		};
		setTodos([...todos, task]);
		setNewTask("");
	};

	const deleteTask = (id) => {
		setTodos(todos.filter((task) => task.id !== id));
	};

	const onUpdateTodo = (todo) => {
		const updatedTodos = todos.map((task) => {
			if (task.id === todo.id) {
				return {
					...task,
					completed: !task.completed,
				};
			}
			return task;
		});
		setTodos(updatedTodos);
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
						{task.taskName}
						<button onClick={() => deleteTask(task.id)}>X</button>
					</li>
				))}
			</ul>
			{todos ? (
				<TodoList todos={todos} onUpdateTodo={onUpdateTodo} />
			) : (
				<Loading />
			)}
		</div>
	);
}

export default App;
