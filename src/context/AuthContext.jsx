import {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuthenticated, toggleIsAuthenticated] = useState(false);

    function Toggle(){
        toggleIsAuthenticated(!isAuthenticated);
        data.user =
        console.log(isAuthenticated);
    }

    function setUser(email) {
        data.user = email;
    }

    const data = {
        state: isAuthenticated,
        stateChangeHandler: Toggle,
        user: "",
    }

    return <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider> }

export default AuthContextProvider;