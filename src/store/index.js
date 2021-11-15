import {createSlice ,configureStore } from '@reduxjs/toolkit'
const initialAuthState={auth:false};
const initialModalState={terms:false,calendar:false,payment:false,theme:true};
const initialEmailState={email:true,time:""};
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
            },
            paymentModalHandler(state){
                state.payment=!state.payment;
            },
            themeHandler(state){
                state.theme=!state.theme;
            }
    }
})
const emailSlice=createSlice({
    name:"emailHandler",
    initialState:initialEmailState,
    reducers:{
            emailHandler(state,action){
                state.email=action.payload;
            },
            reminderTimeHandler(state,action){
                state.time=action.payload;
            }
    }
})

export const authActions=authSlice.actions;
export const modalActions=modalSlice.actions;
export const emailActions=emailSlice.actions;

const store =configureStore({
    reducer:{auth:authSlice.reducer,
        modal:modalSlice.reducer,
        email:emailSlice.reducer
    }
})
export default store ;