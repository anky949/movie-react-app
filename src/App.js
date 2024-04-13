import logo from './logo.svg';
import './App.css';
import {Col, Row, Table} from "react-bootstrap";
import {MovieListComponent} from "./components/movie-list/MovieListComponent";
import {BASE_SERVICE_URL, IMAGE_URL} from "./constants/url";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MovieComponent} from "./components/movie-page/MovieComponent";
import {http} from "./constants/securityconstants";

function App() {

  /*
    npm install @reduxjs/toolkit react-redux
    npm install react-router-dom --save
    npm install axios
     npm install react-toastify
     npm install react-bootstrap bootstrap

Please follow steps to use tailwindcss -: https://medium.com/@shivaydv/a-step-by-step-guide-to-installing-tailwind-css-with-react-b06d71a50354
    learn tailwindcss from url -:
    https://tailwindcss.com/docs/installation
     or
   https://tw-elements.com/docs/standard/getting-started/quick-start/
   */
  const [user,setUser] = useState({});

  useEffect(() => {
    http.get(BASE_SERVICE_URL+"account/"+21172441)
    .then(response => {
      console.log(response.data);
      setUser(response.data);

    });

  },[]);

  return (


    <div className="App">
      <div className="div-items">
        <span className="span-cont">TTN-MDB</span>
          <span className="span-content-right">username : {user.username}</span>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieListComponent/>}  />
          <Route path="movie/:id" element={<MovieComponent/>}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
