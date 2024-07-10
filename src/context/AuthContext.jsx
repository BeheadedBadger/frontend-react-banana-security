import {createContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [authInfo, setAuthInfo] = useState({
        isAuth: false,
        user: null,
    });

    useEffect(() => {
        console.log("Authenticated = " + authInfo.isAuth);
    }, [authInfo]);

    useEffect(() => {
        if (authInfo.user != null)
            console.log("user = " + authInfo.user.data.username);
    }, [authInfo.user]);

    function Toggle(){
        setAuthInfo({
            isAuth: !authInfo.isAuth,
            user: null,
        });
        localStorage.setItem('token', null);
        localStorage.setItem('username', null);
    }

    async function setUser() {
            authInfo.user = null;

            const decodedToken = jwtDecode(localStorage.getItem('token'));
            console.log(decodedToken);
            try {
                authInfo.user = await axios.get(`http://localhost:3000/users/${decodedToken.sub}`, {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                });
            }

            catch(e) {
                console.error(e);
            }

            localStorage.setItem('username', authInfo.user.data.username);
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
        state: authInfo.isAuth,
        Toggle,
        user: authInfo.user,
        setUser,
        getSecret,
    }

    return (<AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>)
}


export default AuthContextProvider;