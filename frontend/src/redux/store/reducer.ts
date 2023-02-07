import { createSlice } from "@reduxjs/toolkit";
import { Article } from "../../types";
import _ from 'lodash';

const articlesSlice = createSlice({
    name: 'articles',
    initialState:{
        articlesToRead : [] as Article[]
    },
    reducers:{
       
        addArticle(state, action){
            console.log(12,  action.payload)
            
            // const boolean = action.payload.every((obj:any) => state.articlesToRead.find(aObj => obj.id === aObj.id));
            // console.log(2,state.articlesToRead, boolean)
            // if(_.isEqual(action.payload, state.articlesToRead)){return}
            // else{
           state.articlesToRead.push(action.payload)
            // } 
        },
        deleteArticle(state, action){
            console.log(1212,action.payload)
            console.log(222, state.articlesToRead)
            // state.articlesToRead.splice(state.articlesToRead.findIndex(item=>item.id === action.payload), 1)
            state.articlesToRead.filter(q=>q.id!==action.payload)
        }
    }
})

export const { addArticle, deleteArticle } = articlesSlice.actions;
export default articlesSlice.reducer;