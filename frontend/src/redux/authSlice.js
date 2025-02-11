import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        setLoding:(state,action)=>{
            state.loading = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload
        },
    }
})

export const {setLoding,setUser} = authSlice.actions

export default authSlice.reducer