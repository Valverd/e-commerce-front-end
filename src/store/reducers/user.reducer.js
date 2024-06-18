const initialState = {
    currentUser: null,
    isAuthenticated: false
}

function userReducer(state = initialState, action){
    switch(action.type) {
        case 'LOGIN_USER':
            return {currentUser: action.payload, isAuthenticated: true}

        case 'LOGOUT_USER':
            return {currentUser: null, isAuthenticated: false}

        case 'ADD_CART':
            return {currentUser: action.payload, isAuthenticated: true}
        
        default:
            return state
    }
}

export default userReducer