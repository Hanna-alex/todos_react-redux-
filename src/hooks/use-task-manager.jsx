import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { validateTask } from '../functions/validateTask';
import {
	fetchTasks,
	addTask,
	updateTask,
	deleteTask,
} from '../redux/actions/taskActions';
import { selectTasks, selectIsLoading } from '../redux/selectors/taskSelectors';

export const useTaskManager = (setIsOpenAddForm) => {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const isLoading = useSelector(selectIsLoading);
	const [newTitle, setNewTitle] = useState('');
	const [isAdding, setAdding] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	const handleAddTask = (e) => {
		e.preventDefault();
		const trimmedTitle = newTitle.trim();
		setNewTitle(trimmedTitle);
		const validationError = validateTask(trimmedTitle, tasks);

		if (validationError) {
			setError(validationError);
			return;
		}

		setAdding(true);
		dispatch(addTask({ title: trimmedTitle, completed: false }));
		setNewTitle('');
		setError('');
		setAdding(false);
		setIsOpenAddForm(false);
	};

	const handleUpdateTask = ({ id, title }) => {
		const validationError = validateTask(title, tasks);

		if (validationError) {
			setError(validationError);
			return;
		}
		dispatch(updateTask({ id, title: title }));
		setError('');
	};
	const handleDeleteTask = (id) => {
		dispatch(deleteTask(id));
	};

	return {
		tasks,
		isLoading,
		error,
		isAdding,
		newTitle,
		setNewTitle,
		handleAddTask,
		handleUpdateTask,
		handleDeleteTask,
	};
};
