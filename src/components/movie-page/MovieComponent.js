import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {http} from "../../constants/securityconstants";
import {BASE_SERVICE_URL, IMAGE_URL} from "../../constants/url";
import "../../style/MoviePageStyle.css"
import {getMintuesToHours} from "../../utils/TimeUtils";


export const MovieComponent = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    http.get(BASE_SERVICE_URL + 'movie/' + id)
    .then(response => setMovie(response.data))
  }, []);

  if (movie == null) {
    return (<div>loading</div>);
  }

  const backgroundMovieCss = {
    backgroundImage: "url(" + IMAGE_URL + "w500/" + movie.backdrop_path
        + ")",
    backgroundRepeat : "no-repeat",
    backgroundSize: "cover"
  };

  const userRating =movie.vote_average/10*100+"%";

  return (
      <div className="parent-div-container">
        <div className="movie-container">
          <div className="leftThing"><img className="parent-size"
                                          src={IMAGE_URL + "w300/"
                                              + movie.poster_path}/></div>
          <div className="rightThing" style={backgroundMovieCss} >
            <h1>{movie.original_title + '(' + movie.release_date + ')'}</h1>
            <div className="span-container">
               <span className="span-content"> Genre : {
                 movie.genres.map(
                   genre => genre.name).join(",")}</span>
              <span className="span-content">
                Released Date : { movie.release_date}
              </span>
              <span className="span-content">
                Duration : { getMintuesToHours(movie.runtime)}
              </span>
            </div>
            <div className="span-container">
              <span className="span-center">
                User Score
<div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
  <div className="progress-bar" style={{width: userRating}}>{userRating}</div>
</div>                </span>
            </div>
            <div className="span-container">
              <span>
                <p><b>Overview</b></p>  {movie.overview}
               </span>
            </div>
          </div>
        </div>

      </div>
  )

}