const TODOS_URL = 'http://localhost:3005/todos'

export const fetchTasks = () => {
	return (dispatch) => {
		dispatch({ type: 'SET_LOADING', payload: true })

		fetch(TODOS_URL)
			.then((response) => response.json())
			.then((tasks) => {
				dispatch({ type: 'FETCH_TASKS', payload: tasks })
				dispatch({ type: 'SET_LOADING', payload: false })
			})
			.catch((error) => {
				console.error('Error fetching tasks:', error)
				dispatch({ type: 'SET_LOADING', payload: false })
			})
			.finally(() => dispatch({ type: 'SET_LOADING', payload: false }))
	}
}

export const addTask = (task) => {
	return (dispatch) => {
		dispatch({ type: 'SET_LOADING', payload: true })

		fetch(TODOS_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...task, completed: false })
		})
			.then((response) => response.json())
			.then((newTask) => {
				dispatch({ type: 'ADD_TASK', payload: newTask })
				dispatch({ type: 'SET_LOADING', payload: false })
			})
			.catch(() => {
				dispatch({ type: 'SET_LOADING', payload: false })
			})

	}
}
export const deleteTask = (id) => {
	return (dispatch) => {
		dispatch({ type: 'SET_LOADING', payload: true })

		fetch(`${TODOS_URL}/${id}`, {
			method: 'DELETE'
		})
			.then(() => {
				dispatch({ type: 'DELETE_TASK', payload: id })
				dispatch({ type: 'SET_LOADING', payload: false })
			})
			.catch(() => {
				dispatch({ type: 'SET_LOADING', payload: false });
			})
	}
}

export const updateTask = (task) => {
	return (dispatch) => {
		dispatch({ type: 'SET_LOADING', payload: true })

		fetch(`${TODOS_URL}/${task.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
		})
			.then((response) => response.json())
			.then((updateTask) => {
				dispatch({ type: 'UPDATE_TASK', payload: updateTask })
				dispatch({ type: 'SET_LOADING', payload: false });
			})
			.catch(() => {
				dispatch({ type: 'SET_LOADING', payload: false });
			});
	}
}



