import {useState,useEffect,useContext,createContext} from 'react'
import axios from 'axios'
const AuthContext=createContext()
const AuthProvider=({children})=>{
    const[auth,setAuth]=useState({
        user:null,
        token:""
    })
    axios.defaults.headers.common['Authorization']=auth?.token
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            try {
                const parseData = JSON.parse(data);
                setAuth({
                    ...auth,
                    user: parseData.user,
                    token: parseData.token
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
                // Handle error appropriately, e.g., fallback to default values
            }
        }
        //eslint-disable-next-line
    }, []);
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth=()=>useContext(AuthContext)
export {useAuth,AuthProvider}