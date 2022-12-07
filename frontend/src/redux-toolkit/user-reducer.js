import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name : '',
    loading : false,
    error : '',
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state,action) => {
      state.name=action.payload.userName
    },
    
  },
})

export const { updateUser } = userReducer.actions

export default userReducer.reducer