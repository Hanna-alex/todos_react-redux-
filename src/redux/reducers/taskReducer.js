export const initialTask = {
	tasks: [],
}

export const taskReducer = (state = initialTask, action) => {
	switch (action.type) {
		case 'FETCH_TASKS':
			return { ...state, tasks: action.payload }
		case 'ADD_TASK':
			return { ...state, tasks: [...state.tasks, action.payload] }
		case 'DELETE_TASK':
			return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) }
		case 'UPDATE_TASK':
			return {
				...state, tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, title: action.payload.title } : task)
			}

		default:
			return state
	}
}
