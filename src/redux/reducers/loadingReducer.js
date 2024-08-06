const initialLoadingState = {
	isLoading: false,
}

export const loadingReducer = (state = initialLoadingState, action) => {
	switch (action.type) {
		case 'SET_LOADING':
			return { ...state, isLoading: action.payload }
		default:
			return state
	}
}
