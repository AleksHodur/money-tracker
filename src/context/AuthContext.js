import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type){

        case 'LOGIN':
            return {...state, user: action.payload};

        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
    console.log('Auth Context state: ', state);
    console.log('this is dispatch ', dispatch);


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}