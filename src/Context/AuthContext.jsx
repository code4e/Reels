import React, {useState, useEffect} from 'react';
import { Auth } from '../Firebase';
export const AuthContext = React.createContext();



export function AuthProvider({children}){
    const [user, setUser] = useState();
    // const [resetPass, setResetPass] = useState(false);
    const [loading, setLoading] = useState(true);

    const SignUp = async (email, password) => await Auth.createUserWithEmailAndPassword(email, password);

    const Login = async (email, password) => await Auth.signInWithEmailAndPassword(email, password);

    const Logout = async() => await Auth.signOut();

    const SendPassResetEmail = async (email) => await Auth.sendPasswordResetEmail(email); 

    useEffect(() => {
        let unsub = Auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })

        return () => {
            unsub();
        }
    }, [])

    const store = {
        user,
        setUser,
        SignUp,
        Login,
        Logout,
        SendPassResetEmail
    }

    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}