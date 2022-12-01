import { createContext,useState } from "react";

export const AuthContext = createContext(null)

const Context = ({children}) =>{
    const [userName, setUserName] = useState("")
    const [token, setToken] = useState(null)
 return(
    <AuthContext.Provider value={{userName,setUserName,token,setToken}}>
        {children}
    </AuthContext.Provider>
 )
}

export default Context