import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:[]
    },
    reducers:{
        setAllAppicants:(state,action)=>{
            state.applicants = action.payload
        }
    }
})

export const {setAllAppicants} = applicationSlice.actions

export default applicationSlice.reducer