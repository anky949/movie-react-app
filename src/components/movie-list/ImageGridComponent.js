import {BASE_SERVICE_URL, IMAGE_URL} from "../../constants/url";
import "../../style/MovieListPageStyle.css"
import {Button, Card} from "react-bootstrap";
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
import {
  genresKeyValues
} from "../../component-utils/dropdown/dropdownKeyValues/genresKeyValues";
import {useEffect, useState} from "react";
import {http} from "../../constants/securityconstants";

export const ImageGridComponent = ({
    movies,searchFilter,onFilterUpdate,totalCount
}) => {
  console.log("ImageGridComponent movies length : " + movies.length);
  console.log("ImageGridComponent totalCount : " + totalCount);
  const updatedFilter = {...searchFilter}
  const [genres,setGenres] = useState([]);

  useEffect(() => {
   http.get(BASE_SERVICE_URL+"genre/movie/list")
    .then(response=>setGenres(response.data.genres));
  }, []);

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
            <Button variant="primary" type="submit" onClick={e=>onSearchButtonClick(e)}>
              Search
            </Button>
          </Form>
        </div>
        <div className="movie-list-container">
        <div className="grid-container">
          {moviesGrid}
        </div>
          <Pagination  className="pagination-bar"

                       totalCount={totalCount}
                       pageSize={20}
                       searchFilter={searchFilter}
          />
        </div>
      </div>
  )

}