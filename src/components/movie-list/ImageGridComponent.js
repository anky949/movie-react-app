import {BASE_SERVICE_URL, IMAGE_URL} from "../../constants/url";
import "../../style/MovieListPageStyle.css"
import {
  Button,
  Card, Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row
} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {CustomDropDown} from "../../component-utils/dropdown/singledropdown/CustomDropdown";
import {
  sortByKeyValues
} from "../../component-utils/dropdown/dropdownKeyValues/sortByKeyValues";
import Form from "react-bootstrap/Form";
import Pagination from "../../component-utils/pagination/Pagination";
import {useDispatch} from "react-redux";
import {fetchMovies, updateFilters} from "./MovieListSlice";
import {
  CustomMultiCheckBox,
  multiCheckBox
} from "../../component-utils/multicheckbox/CustomMultiCheckBox";

import {useEffect, useState} from "react";
import {ACCOUNT_ID, http} from "../../constants/securityconstants";
import {SearchFilterDropdown} from "../../component-utils/SearchFilterDropdown";
import {getLast50Years} from "../../utils/CommonUtil";


export const ImageGridComponent = ({
    movies,searchFilter,totalCount
}) => {
  console.log("ImageGridComponent movies length : " + movies.length);
  console.log("ImageGridComponent totalCount : " + totalCount);
  const updatedFilter = {...searchFilter}
  const [genres,setGenres] = useState([]);

  useEffect(() => {
   http.get(BASE_SERVICE_URL+"genre/movie/list")
    .then(response=>setGenres(response.data.genres));
  }, []);
  totalCount=totalCount > 10000 ? 10000 : totalCount; //i did hardcoded because API giving error -: page is allowed from 1 to 500 (means max 10000 records)

  const sleep = ms => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };


  const addFavoriteMovie=(movieId,isFavourite)=>{
    console.log("addFavoriteMovie =>"+ !isFavourite);
    const response = http.post(BASE_SERVICE_URL+"account/"+ACCOUNT_ID+"/favorite", {
      media_type: 'movie',
      media_id: movieId,
      favorite: !isFavourite
    });

    //added 100 millisecond sleep ,
    // because Due to TMDB BE issue, get favorite movies API in movie slice was not returning the above updated favorite movie quickly
    //so I added sleep for 100 millisecond,and it is returning correctly
    sleep(100).then(() => {
      dispatch(updateFilters(updatedFilter));
    });

  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let index = 0;
  const moviesGrid = movies.map(movie => {
    return (
        <Card key={movie.id} style={{backgroundColor: "burlywood"}}>
          <Card.Img variant="top" className="img"
                    src={IMAGE_URL + "w200/" + movie.poster_path}/>
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.release_date}</Card.Text>
            <Button style={{backgroundColor : "#eb4034"}} onClick={(e) => navigate("/movie/" + movie.id)}
                    variant="primary">See details</Button>
            <div className="p-0 absolute top-0 right-0 mt-2 mr-2">
                <button className="text-red-500 hover:text-red-600 p-0" onClick={(e)=> addFavoriteMovie(movie.id,movie.favorite)}>
                  <svg className="w-6 h-6" fill={movie.favorite? "red" : "white"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
            </div>
          </Card.Body>
        </Card>
    )
  });

  const onSearchButtonClick=(e)=> {
    e.preventDefault();
    console.log("onSearchButtonClick updateFilter"+updatedFilter.sort_by);
    updatedFilter.currentPage=1;
    dispatch(updateFilters(updatedFilter));
  }

  return (
      <div className="parent-container">
        <div className="filter-container">
          <Form sm={3} className="form-border">
            <p><b>Filters</b></p>

            <CustomDropDown filterName={"sort_by"} label={"Sort By"}
                            dropDownKeyValues={sortByKeyValues} searchFilter={updatedFilter}
                            />
            <CustomMultiCheckBox filterName={"genres"} label={"Genres"}
                                 checkboxKeyValues={genres} searchFilter={updatedFilter}/>
            <FormLabel></FormLabel>
            <FormGroup as={Row} controlId="formPlaintextEmail">
            <FormLabel column sm="6">Search By keyword</FormLabel>
            <Col sm="6" >
              <SearchFilterDropdown label={"search keyword"} filterName={"keyword"} searchFilter={updatedFilter}/>
            </Col>
          </FormGroup>
            <FormLabel></FormLabel>
            {/*<FormGroup as={Row}  controlId="formPlaintextEmail">
              <FormLabel column sm="5">Release Year</FormLabel>
              <Col sm="6">
              <FormControl type={"text"} className="mb-sm-5" key={"releaseYear"} onChange={(e)=>setReleaseYear(e.target.value)} value={releaseYear}/>
              </Col>
            </FormGroup>*/}
            <CustomDropDown filterName={"releaseYear"} label={"Release Year"}
                            dropDownKeyValues={getLast50Years()} searchFilter={updatedFilter}
            />
            <Button variant="primary" type="submit" onClick={e=>onSearchButtonClick(e)}>
              Search
            </Button>
          </Form>
        </div>
        <div className="movie-list-container">
        <div className="grid-container">
          {moviesGrid}
        </div>
    <div className="pagination-bar">
  <Pagination
      totalCount={totalCount}
      pageSize={20}
      searchFilter={searchFilter}
  />
</div>

        </div>
      </div>
  )

}