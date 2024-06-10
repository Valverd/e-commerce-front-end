const initialState = {
    currentUser: null,
    isAuthenticated: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_USER':
            return {...initialState, currentUser: action.payload, isAuthenticated: true}
    }
}