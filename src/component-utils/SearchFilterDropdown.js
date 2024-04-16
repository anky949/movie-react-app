import {Dropdown, FormControl, FormText} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import {http} from "../constants/securityconstants";
import "../style/SearchFilterDropdown"

import {useEffect, useState} from "react";
import {BASE_SERVICE_URL} from "../constants/url";

export const SearchFilterDropdown = ({label,searchFilter,filterName})=>{
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(searchFilter[filterName]);
  const [customOptions, setCustomOptions] = useState([]);


  const handleSearchChange = (e) => {
      http.get(BASE_SERVICE_URL + "search/keyword?page=1&query="+e.target.value)
      .then(response => setCustomOptions(response.data.results));
    setSearchTerm(e.target.value);
  };

  const handleOnClick=(option)=> {
    setSelectedOption(option);
    searchFilter[filterName]=option;
  }

  return (
      <Dropdown>
        <Dropdown.Toggle style={{color: "grey",backgroundColor : "white"}} aria-placeholder={"search"}>
          {selectedOption == null ? "search keyword" : selectedOption.name }
        </Dropdown.Toggle>
        <Dropdown.Menu container="body" style={{width: "300px"}}>
          <FormControl
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Search"
              onChange={(e)=>handleSearchChange(e)}
              value={searchTerm}
          />
          {customOptions
          .filter(option =>
              option.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((option) => (
              <Dropdown.Item key={option.id} onClick={(e)=>handleOnClick(option)}>{option.name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
  );
};
