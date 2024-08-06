const initialState = {
    currentUser: null,
    isAuthenticated: false
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return { currentUser: action.payload, isAuthenticated: true }

        case 'LOGOUT_USER':
            return { currentUser: null, isAuthenticated: false }

        case 'UPDATE_USER':
            return {
                currentUser: {
                    ...state.currentUser,
                    ...action.payload
                },
                isAuthenticated: true
            }

        default:
            return state
    }
}

export default userReducer