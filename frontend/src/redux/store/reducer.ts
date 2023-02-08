import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Article } from "../../types";

const articlesSlice = createSlice({
    name: 'articles',
    initialState:{
        articlesToRead : [] as Article[]
    },
    reducers:{
        getArticles: (state, action) => {
            state.articlesToRead = action.payload;
          },
        addArticle(state, action){
           state.articlesToRead.push(action.payload)
        },
        deleteArticle(state, action){

            state.articlesToRead.splice(state.articlesToRead.findIndex(item=>item.id === action.payload), 1)
          
        }
    }
})

export const { addArticle, deleteArticle, getArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
export const fetchArticles = createAsyncThunk(
    'articles/fetch',
    async (_, {dispatch}) => {
     fetch('/api/articles')
         .then(response => response.json())
         .then(articles => dispatch(getArticles(articles)))
         .catch(error => alert("Something went wrong, try again later"))
    }
 )