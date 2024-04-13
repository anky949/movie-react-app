import React from 'react';
import '../../style/PaginationStyle.css';
import classnames from "classnames";
import {usePagination} from "./UsePagination";
import {useDispatch} from "react-redux";
import {
  fetchMovies,
  updateFilters
} from "../../components/movie-list/MovieListSlice";
 const Pagination = props => {
  const {
    totalCount,
    siblingCount = 5,
    searchFilter,
    pageSize,
    className
  } = props;

  let currentPage=searchFilter.currentPage;
  const dispatch = useDispatch();
  console.log(searchFilter.currentPage);
  console.log(totalCount);
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  const DOTS = "...";
  // If there are less than 2 times in pagination range we shall not render the component
  if ( searchFilter.currentPage === 0 || paginationRange.length < 2) {
    return "not found";
  }

  const onNext = () => {
    dispatch(updateFilters({...searchFilter,currentPage : currentPage + 1}))
    //dispatch(fetchMovies({...filter,currentPage : currentPage + 1}));
  };

  const onPrevious = () => {
    dispatch(updateFilters({...searchFilter,currentPage : currentPage - 1}))
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
      <ul
          className={classnames('pagination-container', { [className]: className })}
      >
        {/* Left navigation arrow */}
        <li
            className={classnames('pagination-item', {
              disabled: currentPage === 1
            })}
            onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map(pageNumber => {

          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          // Render our Page Pills
          return (
              <li
                  className={classnames('pagination-item', {
                    selected: pageNumber === currentPage
                  })}
                  onClick={() => dispatch(updateFilters({...searchFilter,currentPage : pageNumber}))}
              >
                {pageNumber}
              </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
            className={classnames('pagination-item', {
              disabled: currentPage === lastPage
            })}
            onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
  );
};

export default Pagination;