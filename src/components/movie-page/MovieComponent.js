import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {http} from "../../constants/securityconstants";
import {BASE_SERVICE_URL, IMAGE_URL} from "../../constants/url";
import {getMintuesToHours} from "../../utils/TimeUtils";
import {formatAmount} from "../../utils/CommonUtil";

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
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };

  const userRating =movie.vote_average / 2;
  let decimalPart=userRating;
  const userRate = [];
  let i=1;
while (i<userRating){
 userRate.push(
     <svg xmlns="http://www.w3.org/2000/svg" class="text-yellow-500 w-5 h-auto fill-current hover:text-yellow-600"
          viewBox="0 0 16 16">
       <path
           d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
     </svg>);
  i++;
  decimalPart--;
  }

  if(decimalPart > 0){
  userRate.push(  <svg xmlns="http://www.w3.org/2000/svg" class="text-yellow-500 w-5 h-auto fill-current hover:text-green-600"
                       viewBox="0 0 16 16">
    <path
        d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
  </svg>);
  }

  while (i<5){
    userRate.push(<svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 w-5 h-auto fill-current hover:text-green-600"
         viewBox="0 0 16 16">
      <path
          d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
    </svg>);
    i++;

  }


  return (
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
              <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img class="w-full h-full object-cover" src={IMAGE_URL + "w300/"+movie.poster_path} alt="Product Image"/>
              </div>
            </div>
            <div class="md:flex-1 px-4">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{movie.original_title + '(' + movie.release_date + ')'}</h2>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {movie.overview}
              </p>
              <div class="flex mb-4">
                <div class="mr-10">
                  <span class="font-bold text-gray-700 dark:text-gray-300">Released Date : </span>
                  <span class="text-gray-600 dark:text-gray-300">{movie.release_date}</span>
                </div>
                <div class="mr-4">
                  <span class="font-bold text-gray-700 dark:text-gray-300"> Duration:</span>
                  <span class="text-gray-600 dark:text-gray-300">{getMintuesToHours(movie.runtime)}</span>
                </div>
              </div>
              <div class=" flex mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Rating:</span>
                <span class="flex">
                  {userRate}
                </span>
              </div>
              <div class="mb-4">
                <span class="font-bold text-gray-700 dark:text-gray-300">Genre :</span>
                <div class="flex items-center mt-2">
                {
                  movie.genres.map(
                      genre =><button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{genre.name}</button>
                  )}
                    </div>
              </div>
              <div className="flex mb-4">
                <div className="mr-10">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Budget : </span>
                  <span className="text-gray-600 dark:text-gray-300">{formatAmount(movie.budget)}</span>
                </div>
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300"> Revenue : </span>
                  <span className="text-gray-600 dark:text-gray-300">{formatAmount(movie.revenue)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )

}