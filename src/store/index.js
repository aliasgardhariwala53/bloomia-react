import {createSlice ,configureStore } from '@reduxjs/toolkit'
const initialAuthState={auth:false};
const initialModalState={terms:false,calendar:false};
const authSlice=createSlice({
    name:"authentication",
    initialState:initialAuthState,
    reducers:{
            login(state){
                state.auth=true;
            },
            logout(state){
                state.auth=false;
            }
    }
})
const modalSlice=createSlice({
    name:"modalHandler",
    initialState:initialModalState,
    reducers:{
            termHandler(state){
                state.terms=!state.terms;
            },
            calendarHandler(state){
                state.calendar=!state.calendar;
            }
    }
})
export const authActions=authSlice.actions;
export const modalActions=modalSlice.actions;

const store =configureStore({
    reducer:{auth:authSlice.reducer,
        modal:modalSlice.reducer
    }
})
export default store ;