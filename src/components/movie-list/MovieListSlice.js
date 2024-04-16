import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ACCOUNT_ID, http} from "../../constants/securityconstants";
import {BASE_SERVICE_URL} from "../../constants/url";




export const fetchMovies = createAsyncThunk("",
    async (filter) => {
      let queryParams = "include_adult="+filter.include_adult+"&include_video="+filter.include_video+"&language="+filter.language+"&page="+filter.currentPage+"&sort_by="+filter.sort_by;
      if(filter.genres.length > 0){
       const pipeSeparatedGenres=filter.genres.join("|");
        queryParams+="&with_genres="+pipeSeparatedGenres;
      }
      if(filter.keyword !== null){
        queryParams+="&with_keywords="+filter.keyword.id;
      }

      if(filter.releaseYear !== null){
        queryParams+="&primary_release_year="+filter.releaseYear;
      }
      console.log("calling API");
      const response = await http.get(BASE_SERVICE_URL+"discover/movie?"+queryParams);
      const apiResponse = await response;

      // Retrieve favorite movies for the user
      const favoriteResponse = await http.get("https://api.themoviedb.org/3/"+"account/"+ACCOUNT_ID+"/favorite/movies");

      // Extract favorite movie IDs
      const favoriteMovieIds = favoriteResponse.data.results.map(movie => movie.id);


      const moviesWithFavoriteStatus = apiResponse.data.results.map(movie => {
        const isFavorite = favoriteMovieIds.includes(movie.id);
        return { ...movie, favorite: isFavorite };
      });
      //      return apiResponse.data    //instead of returning apiResponse.data,
      //      I returned apiResponseData with updated results list (moviesWithFavoriteStatus)
      return {...apiResponse.data,results :moviesWithFavoriteStatus};
    });


export const initialState={
  movieList:[],
  isLoading: false,
  error: null,
  totalCount: null,
  searchFilter:{include_adult:false,include_video:false,currentPage:1,language:"en-US",sort_by:"popularity.desc",genres:[],keyword : null,releaseYear : null},
  favouriteMovieIds:[]
}

export const movieListSlice=createSlice({
  name : "movieListSliceReducer",
  initialState,
  reducers : {
    // In each reducer method, action parameter is used to get data as payload which will be passed while calling the method
    updateFilters:(state,action)=>{
      console.log("reducer updated filter"+action.payload.keyword);
      return {...state,searchFilter: action.payload}
    }
  },
  extraReducers: (builder) => {
    //these are the cases/stages of Async thunks (created above)

    //1.pending ,before calling API,Thunks send pending status and below code executes
    builder.addCase(fetchMovies.pending, (state) => {
      console.log("first case")
      state.isLoading = true
    })

    /*
    2.fulfilled,If API call is success then thunk send fulfilled status and API response as action -:
    {
      meta: {"requestId": "ItsfKe4rmGgbd3KKcwDOE","requestStatus": "fulfilled"},
      type : "/fulfilled",
      payload : Array(20)
     }
    */
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.movieList = action.payload.results;
      state.totalCount=action.payload.total_results;
    })

    /*
    3.rejected,If API call gets fail then thunk send rejected status and Error response as action -:
    {
     error: {name: 'SyntaxError', message: `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`, stack: `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`},
     meta: {arg: undefined, requestId: 'tkLisrsiTIn7r6zkp5NVN', rejectedWithValue: false, requestStatus: 'rejected', aborted: false, …}
     payload: undefined,
     type: "/rejected"
     }
     */
    builder.addCase(fetchMovies.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false
      state.error = action.error.message;
    })
  }
})
export const {updateFilters } = movieListSlice.actions

export default movieListSlice.reducer;