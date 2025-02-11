import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:'job',
    initialState:{
        singleJob:null,
        searchedQuery:'',
        allJobs:[],
        allRecruiterJobs:[],
        appliedJobs:[],
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload
        },
        setAllRecruiterJobs:(state,action)=>{
            state.allRecruiterJobs = action.payload
        },
        setAppliedJobs:(state,action)=>{
            state.appliedJobs = action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery = action.payload
        },
    }
})

export const {setAllJobs,setSingleJob,setAllRecruiterJobs,setAppliedJobs,setSearchedQuery} = jobSlice.actions

export default jobSlice.reducer