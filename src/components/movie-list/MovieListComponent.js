import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {fetchMovies} from "./MovieListSlice";
import {ImageGridComponent} from "./ImageGridComponent";
import Pagination from "../../component-utils/pagination/Pagination";

export const MovieListComponent = ()=>{
const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieListReducer.movieList);
  const searchFilter = useSelector((state) => state.movieListReducer.searchFilter);
  const totalCount = useSelector((state) => state.movieListReducer.totalCount);
  const isLoading = useSelector((state) => state.movieListReducer.isLoading);
  const error = useSelector((state) => state.movieListReducer.error);

/*  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);*/

  useEffect(() => {
    console.log("MovieListComponent==========>"+searchFilter.sort_by);
    dispatch(fetchMovies(searchFilter));
  },[searchFilter]);



  if (isLoading) {
    return 'loading...'
  }

  if (error) {
    return error
  }

  return (
      <div>
      <ImageGridComponent movies ={movieList} searchFilter={searchFilter} totalCount={totalCount} />
      </div>
  )
}