import {createContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [isAuthenticated, toggleIsAuthenticated] = useState({
        isAuth: false,
        user: null,
    });

    useEffect(() => {
        console.log(isAuthenticated.isAuth);
    }, [isAuthenticated]);

    function Toggle(){
        toggleIsAuthenticated({
            isAuth: !isAuthenticated.isAuth
        });
    }

    async function setUser() {
            const decodedToken = jwtDecode(localStorage.getItem('token'));
            console.log(decodedToken);
            try {
                const user = await axios.get(`http://localhost:3000/users/${decodedToken.sub}`, {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                });
                isAuthenticated.user = user;
                console.log(isAuthenticated.user);
            }

            catch(e) {
                console.error(e);
            }
    }

    async function getSecret(){
        try {
            const secret = await axios.get(`http://localhost:3000/private-content`, {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            });
            console.log(secret)
        }

        catch(e) {
            console.error(e);
        }
    }

    const data = {
        state: isAuthenticated.isAuth,
        Toggle,
        user: {id: "", email : "", username : ""},
        setUser,
        getSecret,
    }

    return (<AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>)
}


export default AuthContextProvider;