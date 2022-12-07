import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../redux-toolkit/user-reducer';




const store = configureStore({
    reducer :{
        user : userReducer
    }
})
export default store;