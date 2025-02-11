import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:'app',
    initialState:{
        alert:{
            message:''
        },
        theme:'light'
    },
    reducers:{
        setAlert:(state,action)=>{
            state.alert.message = action.payload
        },
        setTheme:(state)=>{
            state.theme = state.theme==='light'?'dark':'light'
        }
    }
})

export const {setAlert,setTheme}  = appSlice.actions

export default appSlice.reducer