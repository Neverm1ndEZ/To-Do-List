import PropTypes from "prop-types";

const TodoList = ({ todos, onUpdateTodo }) => {
	return (
		<ul className="list-group">
			{todos.map((todo) => (
				<li
					key={todo.id}
					className="list-group-item d-flex justify-content-between align-items-center"
				>
					{todo.title}
					<button onClick={() => onUpdateTodo(todo)}>X</button>
				</li>
			))}
		</ul>
	);
};

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			completed: PropTypes.bool.isRequired,
		}),
	).isRequired,
	onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoList;
