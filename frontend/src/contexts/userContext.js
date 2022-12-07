import { createContext,useState } from "react";

export const AuthContext = createContext(null)

const Context = ({children}) =>{
    const [userId, setUserId] = useState("")
    
 return(
    <AuthContext.Provider value={{userId,setUserId}}>
        {children}
    </AuthContext.Provider>
 )
}

export default Context

